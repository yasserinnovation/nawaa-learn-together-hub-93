-- Temporarily remove the admin policy that causes infinite recursion
DROP POLICY IF EXISTS "Admins can manage all user roles" ON public.user_roles;

-- Keep only the simple user policy (no recursion)
-- This allows users to read their own roles
-- The "Users can view their own roles" policy already exists and is sufficient

-- For admin operations on user_roles, we'll handle that separately through service role
-- or create a non-recursive admin check later