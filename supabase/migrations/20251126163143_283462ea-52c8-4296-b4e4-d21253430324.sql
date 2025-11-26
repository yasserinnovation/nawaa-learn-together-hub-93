-- Create a secure function to get the current user's role
-- This function uses SECURITY DEFINER to bypass RLS and prevent circular dependencies
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- Get the user's active role
  SELECT role::TEXT INTO user_role
  FROM public.user_roles
  WHERE user_id = auth.uid()
    AND is_active = TRUE
    AND (expires_at IS NULL OR expires_at > NOW())
  LIMIT 1;
  
  -- Return 'user' as default if no role found
  RETURN COALESCE(user_role, 'user');
END;
$$;