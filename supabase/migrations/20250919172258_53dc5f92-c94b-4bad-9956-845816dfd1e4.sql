-- Create comprehensive authentication data model
-- Note: We'll extend Supabase Auth with additional user profile and session tracking

-- Create auth provider enum
CREATE TYPE public.auth_provider_type AS ENUM ('password', 'google', 'linked');

-- Create users table (app profile, separate from auth.users)
CREATE TABLE public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT UNIQUE NOT NULL,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    name TEXT NOT NULL,
    avatar_url TEXT,
    auth_provider public.auth_provider_type NOT NULL DEFAULT 'password',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create user_sessions table for session tracking
CREATE TABLE public.user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '30 days'),
    revoked BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create audit_log table for comprehensive logging
CREATE TABLE public.audit_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
ON public.users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON public.users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all users"
ON public.users
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- RLS Policies for user_sessions table
CREATE POLICY "Users can view own sessions"
ON public.user_sessions
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "System can manage sessions"
ON public.user_sessions
FOR ALL
TO authenticated
USING (user_id = auth.uid() OR public.is_admin(auth.uid()))
WITH CHECK (user_id = auth.uid() OR public.is_admin(auth.uid()));

-- RLS Policies for audit_log table
CREATE POLICY "Admins can view all audit logs"
ON public.audit_log
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert audit logs"
ON public.audit_log
FOR INSERT
TO authenticated
WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

-- Create function to automatically create user profile on auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    user_email TEXT;
    user_name TEXT;
    provider_type public.auth_provider_type;
BEGIN
    -- Extract email and name from the new user
    user_email := LOWER(NEW.email);
    user_name := COALESCE(NEW.raw_user_meta_data->>'name', NEW.raw_user_meta_data->>'full_name', split_part(user_email, '@', 1));
    
    -- Determine provider type based on the auth provider
    IF NEW.app_metadata->>'provider' = 'google' THEN
        provider_type := 'google';
    ELSE
        provider_type := 'password';
    END IF;

    -- Check if user already exists (for account linking)
    IF EXISTS (SELECT 1 FROM public.users WHERE email = user_email) THEN
        -- Update existing user to linked provider
        UPDATE public.users 
        SET 
            auth_provider = 'linked',
            email_verified_at = CASE 
                WHEN provider_type = 'google' THEN NOW() 
                ELSE email_verified_at 
            END,
            updated_at = NOW()
        WHERE email = user_email;
        
        -- Log account linking
        INSERT INTO public.audit_log (user_id, action, metadata, ip_address)
        VALUES (
            (SELECT id FROM public.users WHERE email = user_email),
            'account_linked',
            jsonb_build_object('provider', NEW.app_metadata->>'provider', 'linked_at', NOW()),
            NULL
        );
    ELSE
        -- Create new user profile
        INSERT INTO public.users (
            id, 
            email, 
            email_verified_at,
            name, 
            avatar_url, 
            auth_provider
        ) VALUES (
            NEW.id,
            user_email,
            CASE WHEN provider_type = 'google' THEN NOW() ELSE NULL END,
            user_name,
            NEW.raw_user_meta_data->>'avatar_url',
            provider_type
        );
        
        -- Log user signup
        INSERT INTO public.audit_log (user_id, action, metadata, ip_address)
        VALUES (
            NEW.id,
            'signup',
            jsonb_build_object('provider', NEW.app_metadata->>'provider', 'email_verified', provider_type = 'google'),
            NULL
        );
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to handle email verification
CREATE OR REPLACE FUNCTION public.handle_email_verified()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    -- Update email_verified_at when email is confirmed
    IF OLD.email_confirmed_at IS NULL AND NEW.email_confirmed_at IS NOT NULL THEN
        UPDATE public.users 
        SET 
            email_verified_at = NEW.email_confirmed_at,
            updated_at = NOW()
        WHERE id = NEW.id;
        
        -- Log email verification
        INSERT INTO public.audit_log (user_id, action, metadata)
        VALUES (
            NEW.id,
            'email_verified',
            jsonb_build_object('verified_at', NEW.email_confirmed_at)
        );
    END IF;

    RETURN NEW;
END;
$$;

-- Create trigger for email verification
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
CREATE TRIGGER on_auth_user_updated
    AFTER UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_email_verified();

-- Create function to log user actions
CREATE OR REPLACE FUNCTION public.log_user_action(
    _action TEXT,
    _metadata JSONB DEFAULT '{}',
    _ip_address INET DEFAULT NULL,
    _user_agent TEXT DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.audit_log (user_id, action, metadata, ip_address, user_agent)
    VALUES (auth.uid(), _action, _metadata, _ip_address, _user_agent);
END;
$$;

-- Create function to create user session
CREATE OR REPLACE FUNCTION public.create_user_session(
    _ip_address INET DEFAULT NULL,
    _user_agent TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    session_id UUID;
BEGIN
    -- Revoke any existing active sessions for this user (optional - for single session)
    -- UPDATE public.user_sessions SET revoked = TRUE WHERE user_id = auth.uid() AND NOT revoked;
    
    -- Create new session
    INSERT INTO public.user_sessions (user_id, ip_address, user_agent)
    VALUES (auth.uid(), _ip_address, _user_agent)
    RETURNING id INTO session_id;
    
    -- Log session creation
    PERFORM public.log_user_action('signin', jsonb_build_object('session_id', session_id), _ip_address, _user_agent);
    
    RETURN session_id;
END;
$$;

-- Create function to revoke user session
CREATE OR REPLACE FUNCTION public.revoke_user_session(_session_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    UPDATE public.user_sessions 
    SET revoked = TRUE 
    WHERE id = _session_id AND user_id = auth.uid();
    
    -- Log session revocation
    PERFORM public.log_user_action('signout', jsonb_build_object('session_id', _session_id));
END;
$$;

-- Create function to get user profile with session info
CREATE OR REPLACE FUNCTION public.get_user_profile()
RETURNS TABLE (
    id UUID,
    email TEXT,
    email_verified_at TIMESTAMP WITH TIME ZONE,
    name TEXT,
    avatar_url TEXT,
    auth_provider public.auth_provider_type,
    created_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE,
    active_sessions BIGINT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        u.id,
        u.email,
        u.email_verified_at,
        u.name,
        u.avatar_url,
        u.auth_provider,
        u.created_at,
        u.updated_at,
        COUNT(s.id) FILTER (WHERE NOT s.revoked AND s.expires_at > NOW()) as active_sessions
    FROM public.users u
    LEFT JOIN public.user_sessions s ON u.id = s.user_id
    WHERE u.id = auth.uid()
    GROUP BY u.id, u.email, u.email_verified_at, u.name, u.avatar_url, u.auth_provider, u.created_at, u.updated_at;
END;
$$;

-- Create indexes for better performance
CREATE INDEX idx_users_email ON public.users(email);
CREATE INDEX idx_users_email_verified ON public.users(email_verified_at);
CREATE INDEX idx_user_sessions_user_id ON public.user_sessions(user_id);
CREATE INDEX idx_user_sessions_expires_at ON public.user_sessions(expires_at);
CREATE INDEX idx_user_sessions_revoked ON public.user_sessions(revoked);
CREATE INDEX idx_audit_log_user_id ON public.audit_log(user_id);
CREATE INDEX idx_audit_log_action ON public.audit_log(action);
CREATE INDEX idx_audit_log_created_at ON public.audit_log(created_at DESC);

-- Create updated_at trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Add constraint to ensure email is lowercase
ALTER TABLE public.users ADD CONSTRAINT users_email_lowercase CHECK (email = LOWER(email));