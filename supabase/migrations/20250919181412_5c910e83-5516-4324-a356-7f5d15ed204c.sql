-- Add sample learning spaces with correct types
INSERT INTO spaces (
  name, type, address, city, owner, description, 
  capacity, price_per_hour, equipment, coordinates, availability
) VALUES 
(
  'أكاديمية الهرم للروبوتات', 
  'makerspace', 
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
  'A state-of-the-art fabrication laboratory with 3D printers, laser cutters, and electronics workstations',
  15,
  200.00,
  ARRAY['3D Printers', 'Laser Cutter', 'CNC Machine', 'Arduino', 'Soldering Station'],
  '{"lat": 30.0131, "lng": 31.5030}'::jsonb,
  '{"days": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], "hours": "10:00 AM - 8:00 PM"}'::jsonb
)