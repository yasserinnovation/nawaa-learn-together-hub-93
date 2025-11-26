-- Optimize the get_current_user_role function for better performance
-- Use simple SQL instead of PL/pgSQL for faster execution
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE(
    (
      SELECT role::TEXT
      FROM public.user_roles
      WHERE user_id = auth.uid()
        AND is_active = TRUE
        AND (expires_at IS NULL OR expires_at > NOW())
      LIMIT 1
    ),
    'user'
  );
$$;