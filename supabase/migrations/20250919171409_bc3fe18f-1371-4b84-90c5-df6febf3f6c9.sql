-- Fix search path security issue for existing functions
ALTER FUNCTION public.update_user_rating() SET search_path = public;

-- Update admin dashboard stats function to have proper search path (already set but let's be explicit)
CREATE OR REPLACE FUNCTION public.get_admin_dashboard_stats()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
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