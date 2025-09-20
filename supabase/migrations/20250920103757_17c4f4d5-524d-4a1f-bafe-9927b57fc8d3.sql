-- Fix security vulnerability: Remove public access to sensitive profile data
-- Drop the overly permissive policy that allows everyone to view all profiles
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view their own profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Keep the admin policy for administrative access
-- (The "Admins can manage all profiles" policy already exists and is secure)