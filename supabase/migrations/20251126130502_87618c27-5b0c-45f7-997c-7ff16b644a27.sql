-- Fix security definer issue for public_spaces view
CREATE OR REPLACE VIEW public.public_spaces 
WITH (security_invoker = true)
AS
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

-- Fix security definer issue for public_tools view
CREATE OR REPLACE VIEW public.public_tools
WITH (security_invoker = true)
AS
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