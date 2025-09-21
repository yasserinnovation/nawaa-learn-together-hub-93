-- First, drop all existing policies on profiles table
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Now create secure, granular RLS policies for profiles table

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

-- Policy 4: Admins can manage all profiles (but should use secure functions when possible)
CREATE POLICY "Admins can manage all profiles"
ON public.profiles
FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Create a security definer function to safely get public profile data
-- This function only returns non-sensitive information for public display
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

-- Create a security definer function for admin dashboard that doesn't expose sensitive data
CREATE OR REPLACE FUNCTION public.get_admin_profile_stats()
RETURNS jsonb AS $$
DECLARE
    stats jsonb;
BEGIN
  -- Check if user is admin
  IF NOT public.is_admin(auth.uid()) THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  SELECT jsonb_build_object(
    'total_profiles', (SELECT COUNT(*) FROM public.profiles),
    'active_profiles', (SELECT COUNT(*) FROM public.profiles WHERE account_status = 'active'),
    'profile_types', (
      SELECT jsonb_object_agg(
        COALESCE(user_type, 'unknown'), 
        count
      )
      FROM (
        SELECT user_type, COUNT(*) as count
        FROM public.profiles 
        GROUP BY user_type
      ) t
    ),
    'top_cities', (
      SELECT jsonb_object_agg(city, count)
      FROM (
        SELECT city, COUNT(*) as count
        FROM public.profiles 
        WHERE city IS NOT NULL
        GROUP BY city
        ORDER BY count DESC
        LIMIT 10
      ) t
    )
  ) INTO stats;

  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE SET search_path = public;