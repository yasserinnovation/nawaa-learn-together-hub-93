-- Create profiles table for user management
CREATE TABLE public.profiles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID UNIQUE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  avatar_url TEXT,
  phone TEXT,
  date_of_birth DATE,
  gender TEXT,
  city TEXT,
  interests TEXT[],
  rating NUMERIC DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_courses_completed INTEGER DEFAULT 0,
  total_hours_learned INTEGER DEFAULT 0,
  account_status TEXT DEFAULT 'active' CHECK (account_status IN ('active', 'inactive', 'suspended')),
  user_type TEXT DEFAULT 'student' CHECK (user_type IN ('student', 'trainer', 'admin', 'parent')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_reviews table to track ratings given by users
CREATE TABLE public.user_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewed_user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  course_id UUID,
  space_id UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Profiles are viewable by everyone" 
ON public.profiles 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all operations for admin on profiles" 
ON public.profiles 
FOR ALL 
USING (true);

-- Create policies for user reviews
CREATE POLICY "Reviews are viewable by everyone" 
ON public.user_reviews 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all operations for admin on reviews" 
ON public.user_reviews 
FOR ALL 
USING (true);

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to update user rating based on reviews
CREATE OR REPLACE FUNCTION public.update_user_rating()
RETURNS TRIGGER AS $$
BEGIN
  -- Recalculate average rating for the reviewed user
  UPDATE public.profiles 
  SET rating = (
    SELECT COALESCE(AVG(rating::numeric), 0)
    FROM public.user_reviews 
    WHERE reviewed_user_id = COALESCE(NEW.reviewed_user_id, OLD.reviewed_user_id)
  )
  WHERE id = COALESCE(NEW.reviewed_user_id, OLD.reviewed_user_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- Create trigger to update ratings automatically
CREATE TRIGGER update_user_rating_trigger
AFTER INSERT OR UPDATE OR DELETE ON public.user_reviews
FOR EACH ROW
EXECUTE FUNCTION public.update_user_rating();

-- Insert sample users for demonstration
INSERT INTO public.profiles (email, full_name, city, interests, total_courses_completed, total_hours_learned, user_type, rating) VALUES
('ahmad.hassan@email.com', 'أحمد حسن', 'Cairo', ARRAY['Robotics', 'Programming'], 3, 45, 'student', 4.2),
('fatima.ali@email.com', 'فاطمة علي', 'Alexandria', ARRAY['Science', 'Mathematics'], 5, 75, 'student', 4.8),
('omar.mahmoud@email.com', 'عمر محمود', 'Giza', ARRAY['Engineering', 'Electronics'], 2, 30, 'student', 3.9),
('sara.ahmed@email.com', 'سارة أحمد', 'Mansoura', ARRAY['Programming', 'Web Design'], 4, 60, 'student', 4.5),
('youssef.salem@email.com', 'يوسف سالم', 'Tanta', ARRAY['Robotics', 'AI'], 6, 90, 'trainer', 4.7),
('layla.farouk@email.com', 'ليلى فاروق', 'Aswan', ARRAY['Science', 'Biology'], 1, 15, 'student', 4.1),
('mohamed.nasser@email.com', 'محمد ناصر', 'Luxor', ARRAY['Mathematics', 'Physics'], 3, 40, 'trainer', 4.6),
('nour.ibrahim@email.com', 'نور إبراهيم', 'Ismailia', ARRAY['Art', 'Design'], 2, 25, 'student', 4.3);