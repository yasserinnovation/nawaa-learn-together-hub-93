-- Drop the overly permissive policy that allows any authenticated user to view all profiles
DROP POLICY IF EXISTS "Require authentication for profiles" ON public.profiles;

-- Add a restrictive policy that ensures users can only access their own profile data
-- This is ANDed with existing permissive policies, providing defense in depth
-- Admins can still access all profiles through the admin policy
CREATE POLICY "Users can only access own profile data"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO public
USING (
  auth.uid() = user_id 
  OR public.is_admin(auth.uid())
);