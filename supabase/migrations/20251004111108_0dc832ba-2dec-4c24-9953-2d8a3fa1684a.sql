-- Add restrictive policy to explicitly require authentication for profiles table
-- This ensures anonymous users cannot access profiles under any circumstances
-- Restrictive policies are ANDed with permissive policies for defense in depth

CREATE POLICY "Require authentication for profiles"
ON public.profiles
AS RESTRICTIVE
FOR ALL
TO public
USING (auth.uid() IS NOT NULL);