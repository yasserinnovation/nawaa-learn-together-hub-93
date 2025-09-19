-- Insert sample courses into the database
INSERT INTO public.courses (
  title, 
  category, 
  age_group, 
  duration_weeks, 
  level, 
  price, 
  description,
  requirements,
  learning_outcomes,
  image_url
) VALUES 
(
  'Inventor''s Playground – Building a Smart Mini Theme Park',
  'technology',
  '10–13',
  1,
  'beginner',
  299,
  'This beginner-friendly, project-based course introduces young learners to key concepts in electronics, robotics, renewable energy, and creative problem-solving. Students collaboratively design and build a mini amusement park powered by technology and their imagination.',
  ARRAY['Basic understanding of electronics', 'Interest in building and creating', 'Team collaboration skills'],
  ARRAY['Understand basic electronic components', 'Apply principles of circuitry: parallel and series connections', 'Program simple robotic functions using LEGO EV3', 'Harness renewable energy sources', 'Develop creative problem-solving and teamwork skills'],
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'
),
(
  'Robo-Innovators – From Idea to Prototype',
  'technology', 
  '12–15',
  1,
  'intermediate',
  399,
  'This intermediate course focuses on innovation through robotics. Learners develop and prototype technological solutions to real-world problems using robotics kits, sensors, and programmable logic. Emphasis is placed on ideation, prototyping, and testing using a design-thinking approach.',
  ARRAY['Basic programming knowledge', 'Understanding of circuits', 'Problem-solving mindset'],
  ARRAY['Understand and apply the design thinking cycle', 'Build functional prototypes using EV3 or Arduino', 'Learn advanced programming logic', 'Use diagnostic tools like multimeters', 'Present and justify inventions as social impact solutions'],
  'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500'
),
(
  'FutureTech Founders – Smart Solutions for Real-World Challenges', 
  'technology',
  '14–17',
  2,
  'advanced',
  599,
  'This advanced-level program guides teens through designing and deploying smart, tech-based solutions for environmental, accessibility, or everyday life challenges. They will explore microcontrollers (Arduino), advanced sensors, mobile app integration, and IoT basics.',
  ARRAY['Intermediate programming skills', 'Electronics knowledge', 'Project management basics'],
  ARRAY['Design and assemble complete smart systems', 'Use microcontrollers and multiple sensors', 'Learn basic IoT and app control', 'Build, test, and iterate tech prototypes', 'Deliver investor-style pitch presentations'],
  'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=500'
),
(
  'Meet Mr. AI! – Discover the Smart Side of Tech',
  'technology',
  '10–13', 
  1,
  'beginner',
  249,
  'A hands-on, story-driven intro to Artificial Intelligence where kids learn how AI sees, hears, and learns — and then train their own smart assistant. Each child creates a playful AI project using tools like Teachable Machine and Scratch.',
  ARRAY['Basic computer skills', 'Curiosity about technology', 'Creative thinking'],
  ARRAY['Grasp AI basics through storytelling and games', 'Explore real-world AI applications', 'Train basic machine learning models', 'Build AI-enhanced projects in Scratch', 'Present ideas confidently'],
  'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500'
),
(
  'Young Scientists Laboratory – Exploring the Natural World',
  'science',
  '8–12',
  2,
  'beginner', 
  199,
  'A hands-on introduction to scientific method and natural phenomena. Students conduct exciting experiments, observe patterns in nature, and develop critical thinking skills through guided discovery.',
  ARRAY['Curiosity about nature', 'Basic reading skills', 'Safety awareness'],
  ARRAY['Understand the scientific method', 'Conduct safe laboratory experiments', 'Make observations and predictions', 'Develop hypothesis-testing skills', 'Present scientific findings'],
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500'
);