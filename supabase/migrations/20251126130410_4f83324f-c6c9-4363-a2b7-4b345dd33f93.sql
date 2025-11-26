-- Remove dangerous development policy from spaces table
DROP POLICY IF EXISTS "Allow all operations for development" ON public.spaces;

-- Add proper admin-only management policy for spaces
CREATE POLICY "Admins can manage spaces" ON public.spaces
FOR ALL
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- Create public view for spaces that hides sensitive contact information
CREATE OR REPLACE VIEW public.public_spaces AS
SELECT 
  id,
  name,
  description,
  type,
  city,
  address,
  coordinates,
  capacity,
  price_per_hour,
  equipment,
  availability,
  images,
  rating,
  created_at,
  updated_at
FROM public.spaces;

-- Grant public access to the view
GRANT SELECT ON public.public_spaces TO anon, authenticated;

-- Create similar view for tools without owner contact
CREATE OR REPLACE VIEW public.public_tools AS
SELECT 
  id,
  name,
  description,
  category,
  condition,
  rental_price_per_day,
  purchase_price,
  availability_status,
  specifications,
  images,
  location,
  created_at,
  updated_at
FROM public.tools;

-- Grant public access to the tools view
GRANT SELECT ON public.public_tools TO anon, authenticated;