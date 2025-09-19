-- Create courses table
CREATE TABLE public.courses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  age_group TEXT NOT NULL,
  duration_weeks INTEGER NOT NULL DEFAULT 1,
  price NUMERIC NOT NULL DEFAULT 0,
  level TEXT NOT NULL DEFAULT 'beginner',
  image_url TEXT,
  syllabus JSONB DEFAULT '[]'::jsonb,
  requirements TEXT[],
  learning_outcomes TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create tools table
CREATE TABLE public.tools (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  rental_price_per_day NUMERIC NOT NULL DEFAULT 0,
  purchase_price NUMERIC,
  availability_status TEXT NOT NULL DEFAULT 'available',
  condition TEXT NOT NULL DEFAULT 'good',
  specifications JSONB DEFAULT '{}'::jsonb,
  images TEXT[] DEFAULT '{}'::text[],
  location TEXT,
  owner_contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create competitions table
CREATE TABLE public.competitions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  age_group TEXT NOT NULL,
  registration_start_date TIMESTAMP WITH TIME ZONE NOT NULL,
  registration_end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  competition_date TIMESTAMP WITH TIME ZONE NOT NULL,
  max_participants INTEGER,
  entry_fee NUMERIC DEFAULT 0,
  prizes JSONB DEFAULT '[]'::jsonb,
  rules TEXT,
  requirements TEXT[],
  status TEXT NOT NULL DEFAULT 'upcoming',
  image_url TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (admin can manage all)
CREATE POLICY "Courses are viewable by everyone" 
ON public.courses 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all operations for admin" 
ON public.courses 
FOR ALL 
USING (true);

CREATE POLICY "Tools are viewable by everyone" 
ON public.tools 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all operations for admin on tools" 
ON public.tools 
FOR ALL 
USING (true);

CREATE POLICY "Competitions are viewable by everyone" 
ON public.competitions 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all operations for admin on competitions" 
ON public.competitions 
FOR ALL 
USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_courses_updated_at
BEFORE UPDATE ON public.courses
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_tools_updated_at
BEFORE UPDATE ON public.tools
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_competitions_updated_at
BEFORE UPDATE ON public.competitions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();