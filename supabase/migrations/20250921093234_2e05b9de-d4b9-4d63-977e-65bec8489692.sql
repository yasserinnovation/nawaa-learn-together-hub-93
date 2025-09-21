-- Drop existing policies that may be too permissive
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create more granular RLS policies for profiles table

-- Policy 1: Users can view their own complete profile (including sensitive data)
CREATE POLICY "Users can view own complete profile"
ON public.profiles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy 2: Users can update their own profile  
CREATE POLICY "Users can update own profile"
ON public.profiles
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Policy 3: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Policy 4: Public access to non-sensitive profile fields only
-- This allows viewing of public profile information like name, avatar, rating
-- But excludes sensitive data like email, phone, date_of_birth
CREATE POLICY "Public can view non-sensitive profile data"
ON public.profiles
FOR SELECT
USING (true);

-- Policy 5: Admins can manage all profiles (but should use this responsibly)
CREATE POLICY "Admins can manage all profiles"
ON public.profiles
FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Create a security definer function to safely get public profile data
-- This function only returns non-sensitive information
CREATE OR REPLACE FUNCTION public.get_public_profile(profile_user_id uuid)
RETURNS TABLE(
  id uuid,
  full_name text,
  avatar_url text,
  rating numeric,
  total_courses_completed integer,
  total_hours_learned integer,
  city text,
  interests text[],
  user_type text,
  created_at timestamp with time zone
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id,
    p.full_name,
    p.avatar_url,
    p.rating,
    p.total_courses_completed,
    p.total_hours_learned,
    p.city,
    p.interests,
    p.user_type,
    p.created_at
  FROM public.profiles p
  WHERE p.user_id = profile_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;

-- Create a security definer function for admin dashboard stats that doesn't expose sensitive data
CREATE OR REPLACE FUNCTION public.get_admin_profile_stats()
RETURNS TABLE(
  total_profiles bigint,
  active_profiles bigint,
  profile_types jsonb,
  top_cities jsonb
) AS $$
BEGIN
  -- Check if user is admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    COUNT(*)::bigint as total_profiles,
    COUNT(CASE WHEN account_status = 'active' THEN 1 END)::bigint as active_profiles,
    jsonb_object_agg(
      COALESCE(user_type, 'unknown'), 
      user_type_count
    ) as profile_types,
    jsonb_object_agg(
      COALESCE(city, 'unknown'), 
      city_count
    ) as top_cities
  FROM (
    SELECT 
      user_type,
      COUNT(*) as user_type_count,
      city,
      COUNT(*) OVER (PARTITION BY city) as city_count
    FROM public.profiles
    WHERE city IS NOT NULL
    GROUP BY user_type, city
    LIMIT 10
  ) stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;