-- Fix the handle_new_user trigger function to work with correct auth.users structure
-- The issue is that we're trying to access app_metadata which may not exist or be structured differently

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
    user_name := COALESCE(
        NEW.raw_user_meta_data->>'name', 
        NEW.raw_user_meta_data->>'full_name', 
        NEW.raw_user_meta_data->>'display_name',
        split_part(user_email, '@', 1)
    );
    
    -- Determine provider type based on available data
    -- Check if this is a Google OAuth signup by looking at raw_user_meta_data
    IF NEW.raw_user_meta_data->>'provider' = 'google' 
       OR NEW.raw_user_meta_data->>'iss' LIKE '%google%'
       OR NEW.raw_user_meta_data->>'email_verified' = 'true' THEN
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
            jsonb_build_object(
                'provider', COALESCE(NEW.raw_user_meta_data->>'provider', 'unknown'), 
                'linked_at', NOW()
            ),
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
            jsonb_build_object(
                'provider', COALESCE(NEW.raw_user_meta_data->>'provider', 'email'),
                'email_verified', provider_type = 'google'
            ),
            NULL
        );
    END IF;

    RETURN NEW;
END;
$$;