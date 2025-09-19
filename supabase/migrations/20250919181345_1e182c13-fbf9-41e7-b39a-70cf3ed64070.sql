-- Add sample learning spaces data for Egypt
INSERT INTO spaces (
  name, type, address, city, owner, description, 
  capacity, price_per_hour, equipment, coordinates, availability
) VALUES 
(
  'أكاديمية الهرم للروبوتات', 
  'academy', 
  'شارع الهرم الرئيسي، الجيزة', 
  'الجيزة', 
  'محمد أحمد',
  'مساحة تعليمية متطورة مخصصة لتعليم الروبوتات والذكاء الاصطناعي للأطفال والشباب',
  25,
  150.00,
  ARRAY['Arduino', 'Raspberry Pi', '3D Printer', 'Laptops', 'Projector', 'Whiteboard'],
  '{"lat": 30.0131, "lng": 31.2089}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "hours": "9:00 AM - 6:00 PM"}'::jsonb
),
(
  'مكتبة مصر العامة - فرع النزهة',
  'library',
  'شارع النزهة، مدينة نصر، القاهرة',
  'القاهرة',
  'مكتبة مصر العامة',
  'قاعات دراسية مجهزة بأحدث التقنيات لورش العلوم والتكنولوجيا والهندسة والرياضيات',
  40,
  0.00,
  ARRAY['Projectors', 'Interactive Whiteboard', 'Laptops', 'Science Kits', 'Books'],
  '{"lat": 30.0626, "lng": 31.3219}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], "hours": "8:00 AM - 8:00 PM"}'::jsonb
),
(
  'FabLab Cairo',
  'makerspace',
  'AUC New Cairo Campus, Cairo',
  'New Cairo',
  'American University in Cairo',
  'A state-of-the-art fabrication laboratory with 3D printers, laser cutters, and electronics workstations for prototyping and innovation',
  15,
  200.00,
  ARRAY['3D Printers', 'Laser Cutter', 'CNC Machine', 'Arduino', 'Soldering Station', 'Oscilloscope'],
  '{"lat": 30.0131, "lng": 31.5030}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "hours": "10:00 AM - 8:00 PM"}'::jsonb
),
(
  'مساحة العمل المشتركة - الزمالك',
  'coworking',
  'شارع 26 يوليو، الزمالك، القاهرة',
  'القاهرة',
  'شركة الإبداع التقني',
  'مساحة عمل مشتركة مع قاعات تدريب مجهزة لورش البرمجة وتطوير التطبيقات',
  30,
  100.00,
  ARRAY['High-speed Internet', 'Laptops', 'Projector', 'Meeting Rooms', 'Coffee Station'],
  '{"lat": 30.0626, "lng": 31.2239}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "hours": "9:00 AM - 10:00 PM"}'::jsonb
),
(
  'مدرسة STEM الدولية - الشيخ زايد',
  'classroom',
  'مدينة الشيخ زايد، الجيزة',
  'الجيزة',
  'وزارة التربية والتعليم',
  'فصول دراسية متطورة مخصصة لتعليم العلوم والتكنولوجيا والهندسة والرياضيات',
  35,
  80.00,
  ARRAY['Smart Board', 'Tablets', 'Laboratory Equipment', 'Robotics Kits', 'Microscopes'],
  '{"lat": 30.0982, "lng": 30.9742}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "hours": "8:00 AM - 3:00 PM"}'::jsonb
),
(
  'مركز الإسكندرية للعلوم',
  'hall',
  'كورنيش الإسكندرية، الإسكندرية',
  'الإسكندرية',
  'مكتبة الإسكندرية',
  'قاعة محاضرات كبيرة مجهزة لعقد المؤتمرات والورش العلمية الكبيرة',
  100,
  300.00,
  ARRAY['Professional Sound System', 'Large Projector', 'Stage', 'Microphones', 'Live Streaming'],
  '{"lat": 31.2001, "lng": 29.9187}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"], "hours": "9:00 AM - 9:00 PM"}'::jsonb
)