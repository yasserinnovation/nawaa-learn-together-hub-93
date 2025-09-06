-- Create spaces table
CREATE TABLE public.spaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('library', 'classroom', 'makerspace', 'coworking', 'hall')),
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  owner TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  equipment TEXT[] DEFAULT '{}',
  capacity INTEGER NOT NULL CHECK (capacity > 0),
  price_per_hour DECIMAL(10,2) NOT NULL CHECK (price_per_hour >= 0),
  rating DECIMAL(3,2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  coordinates JSONB NOT NULL DEFAULT '{"lat": 0, "lng": 0}',
  availability JSONB NOT NULL DEFAULT '{"days": [], "hours": ""}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.spaces ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (spaces are public information)
CREATE POLICY "Spaces are viewable by everyone" 
ON public.spaces 
FOR SELECT 
USING (true);

-- Create policy for admin operations (insert, update, delete)
-- For now, allow all operations - you can restrict this later with proper admin authentication
CREATE POLICY "Allow all operations for development" 
ON public.spaces 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_spaces_updated_at
  BEFORE UPDATE ON public.spaces
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample data
INSERT INTO public.spaces (name, type, address, city, owner, description, images, equipment, capacity, price_per_hour, rating, coordinates, availability) VALUES 
('Central Library Study Room', 'library', '123 Main St', 'Downtown', 'City Library', 'Quiet study space with modern amenities', '{"https://example.com/image1.jpg"}', '{"WiFi", "Projector", "Whiteboard"}', 20, 15.00, 4.5, '{"lat": 40.7128, "lng": -74.0060}', '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "hours": "9AM-8PM"}'),
('Innovation Makerspace', 'makerspace', '456 Tech Ave', 'Innovation District', 'TechHub Inc', 'Fully equipped makerspace for prototyping', '{"https://example.com/image2.jpg"}', '{"3D Printer", "Laser Cutter", "Arduino Kits", "Soldering Station"}', 15, 25.00, 4.8, '{"lat": 40.7589, "lng": -73.9851}', '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], "hours": "10AM-10PM"}'),
('Creative Classroom', 'classroom', '789 Education Blvd', 'University District', 'EduSpace LLC', 'Modern classroom for workshops and training', '{"https://example.com/image3.jpg"}', '{"Smart Board", "Sound System", "Video Conference Setup"}', 30, 20.00, 4.2, '{"lat": 40.7831, "lng": -73.9712}', '{"days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "hours": "8AM-6PM"}');