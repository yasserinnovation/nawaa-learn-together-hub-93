-- Create user roles system
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    assigned_by UUID REFERENCES auth.users(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT TRUE,
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
      AND is_active = TRUE
      AND (expires_at IS NULL OR expires_at > NOW())
  )
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin'::app_role)
$$;

-- Create admin activity log table
CREATE TABLE public.admin_activity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id UUID REFERENCES auth.users(id) NOT NULL,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_activity_log
ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_roles
CREATE POLICY "Admins can manage all user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- RLS Policies for admin_activity_log
CREATE POLICY "Admins can view all activity logs"
ON public.admin_activity_log
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "System can insert activity logs"
ON public.admin_activity_log
FOR INSERT
TO authenticated
WITH CHECK (admin_id = auth.uid());

-- Update existing table policies to use role-based access
DROP POLICY IF EXISTS "Allow all operations for admin on competitions" ON public.competitions;
CREATE POLICY "Admins can manage competitions"
ON public.competitions
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow all operations for admin" ON public.courses;
CREATE POLICY "Admins can manage courses"
ON public.courses
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow all operations for admin on tools" ON public.tools;
CREATE POLICY "Admins can manage tools"
ON public.tools
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow all operations for admin on profiles" ON public.profiles;
CREATE POLICY "Admins can manage all profiles"
ON public.profiles
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Allow all operations for admin on reviews" ON public.user_reviews;
CREATE POLICY "Admins can manage all reviews"
ON public.user_reviews
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

-- Function to log admin activity
CREATE OR REPLACE FUNCTION public.log_admin_activity(
    _action TEXT,
    _resource_type TEXT,
    _resource_id UUID DEFAULT NULL,
    _details JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.admin_activity_log (
        admin_id,
        action,
        resource_type,
        resource_id,
        details
    ) VALUES (
        auth.uid(),
        _action,
        _resource_type,
        _resource_id,
        _details
    );
END;
$$;

-- Create admin dashboard statistics function
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    stats JSONB;
BEGIN
    -- Check if user is admin
    IF NOT public.is_admin(auth.uid()) THEN
        RAISE EXCEPTION 'Access denied. Admin role required.';
    END IF;

    SELECT jsonb_build_object(
        'total_users', (SELECT COUNT(*) FROM public.profiles),
        'total_spaces', (SELECT COUNT(*) FROM public.spaces),
        'total_courses', (SELECT COUNT(*) FROM public.courses),
        'total_tools', (SELECT COUNT(*) FROM public.tools),
        'total_competitions', (SELECT COUNT(*) FROM public.competitions),
        'avg_user_rating', (
            SELECT COALESCE(AVG(rating), 0)
            FROM public.profiles
            WHERE rating > 0
        ),
        'avg_space_rating', (
            SELECT COALESCE(AVG(rating), 0)
            FROM public.spaces
            WHERE rating > 0
        ),
        'total_reviews', (SELECT COUNT(*) FROM public.user_reviews),
        'active_users_last_30_days', (
            SELECT COUNT(*)
            FROM public.profiles
            WHERE updated_at > NOW() - INTERVAL '30 days'
        ),
        'estimated_revenue', (
            SELECT COALESCE(
                (SELECT SUM(price * 4) FROM public.courses) + -- Monthly course revenue estimate
                (SELECT SUM(rental_price_per_day * 15) FROM public.tools) + -- Monthly tool revenue estimate
                (SELECT SUM(entry_fee * COALESCE(max_participants, 50)) FROM public.competitions), -- Competition revenue estimate
                0
            )
        )
    ) INTO stats;

    RETURN stats;
END;
$$;

-- Create indexes for better performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);
CREATE INDEX idx_user_roles_active ON public.user_roles(is_active);
CREATE INDEX idx_admin_activity_log_admin_id ON public.admin_activity_log(admin_id);
CREATE INDEX idx_admin_activity_log_created_at ON public.admin_activity_log(created_at DESC);
CREATE INDEX idx_admin_activity_log_action ON public.admin_activity_log(action);

-- Insert default admin user (you'll need to update this with actual user ID after signup)
-- This is commented out - admins should be created through the application
-- INSERT INTO public.user_roles (user_id, role, assigned_by, assigned_at)
-- VALUES ('YOUR_USER_ID_HERE', 'admin', 'YOUR_USER_ID_HERE', NOW());