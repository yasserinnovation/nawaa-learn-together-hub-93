
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object - you can expand this with more translations
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.courses': 'Courses',
    'nav.findTrainers': 'Find Trainers',
    'nav.discoverSpaces': 'Discover Spaces',
    'nav.accessTools': 'Access Tools',
    'nav.buildBundle': 'Build Bundle',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign in',
    'nav.signUp': 'Sign up',
    
    // Hero section
    'hero.title': 'Empower children with technology through hands-on learning',
    'hero.subtitle': 'Mix and match your perfect learning bundle with trainers, spaces, tools, and courses tailored to your child\'s interests.',
    'hero.startBuilding': 'Start Building Your Bundle',
    'hero.exploreSpaces': 'Explore Spaces',
    'hero.shareSpace': 'Share your own space',
    'hero.spacesAvailable': '200+ Spaces Available',
    
    // Features
    'features.title': 'Mix & Match Your Learning Experience',
    'features.subtitle': 'Nawaa brings together all the elements you need for an effective learning journey.',
    'features.findTrainers': 'Find Trainers',
    'features.findTrainersDesc': 'Connect with expert trainers based on expertise, ratings, and teaching style.',
    'features.discoverSpaces': 'Discover Spaces',
    'features.discoverSpacesDesc': 'Explore community-shared spaces like libraries, schools, and makerspaces.',
    'features.accessTools': 'Access Tools',
    'features.accessToolsDesc': 'Rent or buy the right tools from our shared marketplace for your courses.',
    'features.customCourses': 'Custom Courses',
    'features.customCoursesDesc': 'Choose from our catalog or let trainers create custom learning experiences.',
    
    // Courses
    'courses.title': 'Our Course Catalog',
    'courses.allCourses': 'All Courses',
    'courses.technology': 'Technology',
    'courses.science': 'Science',
    'courses.mathematics': 'Mathematics',
    'courses.viewDetails': 'View Details',
    'courses.ages': 'Ages',
    'courses.stemFocus': 'STEM Focus',
    'courses.lifeSkills': 'Life Skills',
    'courses.resourcesTitle': 'Resources Included',
    'courses.teacherGuides': 'Teacher guides with step-by-step instructions',
    'courses.studentJournals': 'Student reflection journals',
    'courses.worksheets': 'Worksheets and activity templates',
    'courses.assessmentRubrics': 'Assessment rubrics (creativity, collaboration, technical execution)',
    'courses.onlinePlatform': 'Optional: Online platform for project sharing',
    'courses.findSpace': 'Find a Space for Your Course',

    // Course Details
    'courseDetail.courseNotFound': 'Course not found',
    'courseDetail.backToCourses': 'Back to Courses',
    'courseDetail.courseOverview': 'Course Overview',
    'courseDetail.learningOutcomes': 'Learning Outcomes',
    'courseDetail.maxStudents': 'Max',
    'courseDetail.students': 'students',
    'courseDetail.readyToEnroll': 'Ready to Enroll?',
    'courseDetail.enrollmentDesc': 'Reserve a spot for your child in this exciting learning adventure.',
    'courseDetail.startEnrollment': 'Start Enrollment',
    'courseDetail.requestInfo': 'Request Information',
    'courseDetail.keyTechnologies': 'Key Technologies Used',
    'courseDetail.electronics': 'Electronics',
    'courseDetail.renewableEnergy': 'Renewable Energy',
    'courseDetail.robotics': 'Robotics',
    'courseDetail.curriculumOutline': 'Curriculum Outline',
    'courseDetail.day': 'Day',
    'courseDetail.moduleTitle': 'Module Title',
    'courseDetail.hours': 'Hours',
    'courseDetail.activities': 'Activities',
    'courseDetail.keySkills': 'Key Skills',
    'courseDetail.buildBundle': 'Build a Course Bundle',

    // Course Titles
    'course.1.title': 'Inventor\'s Playground – Building a Smart Mini Theme Park',
    'course.12.title': 'Robo-Innovators – From Idea to Prototype',
    'course.13.title': 'FutureTech Founders – Smart Solutions for Real-World Challenges',
    'course.14.title': 'Techpreneurs Lab – From Prototype to Product',
    'course.15.title': 'Tech Ambassadors – Leading & Teaching Innovation',
    'course.16.title': 'Meet Mr. AI! – Discover the Smart Side of Tech',
    'course.17.title': 'Train Your AI Pet! – Make Smart Projects That Learn',
    'course.18.title': 'AI in the Wild! – Bring Smart Ideas to Life',
    'course.19.title': 'Fly It Yourself! – First Steps with Drones',
    'course.20.title': 'Drone Challenge! – Code, Race & Rescue',
    'course.21.title': 'Eyes in the Sky! – Explore, Map & Measure with Drones',
    'course.22.title': 'Create with AI! – Your First Steps into Generative Magic',
    'course.23.title': 'Prompt Masters! – Shape AI into Your Creative Tool',
    'course.24.title': 'AI Story Studio! – Build a World with Text, Art & Sound',
    'course.25.title': 'AI Art Lab! – Draw, Paint & Design with Smart Tools',
    'course.26.title': 'Talk to a Robot! – Create Stories, Jokes & Games with AI',
    'course.27.title': 'Hack Your Home! – Intro to Smart Devices & IoT',

    // Course Projects
    'course.1.project': 'Design and build a mini amusement park powered by technology and imagination',
    'course.12.project': 'Develop and prototype technological solutions to real-world problems using robotics',
    'course.13.project': 'Design and deploy smart, tech-based solutions for real-world challenges',
    'course.14.project': 'Refine an existing tech prototype or develop a new solution for market readiness',
    'course.15.project': 'Design and lead tech workshops for younger students',
    'course.16.project': 'Train AI models and build an interactive AI project using tools like Teachable Machine and Scratch',
    'course.17.project': 'Train a digital AI pet that responds to voice, poses, or objects using machine learning models',
    'course.18.project': 'Connect AI models with real-world outputs using hardware like micro:bit or Arduino',
    'course.19.project': 'Learn basic drone operations and complete a flight mission using simple coding',
    'course.20.project': 'Design and fly complex drone missions using block-based programming',
    'course.21.project': 'Use drones for aerial photography, mapping, and environmental monitoring',
    'course.22.project': 'Create images, stories, music, and presentations using AI tools',
    'course.23.project': 'Create multimedia stories and digital posters with better AI prompts',
    'course.24.project': 'Create a multimedia story using AI-generated text, images, and audio',
    'course.25.project': 'Create digital art using AI tools and design a mini-gallery of work',
    'course.26.project': 'Create interactive stories, jokes, riddles, and choose-your-own-adventure games using AI',
    'course.27.project': 'Build a mini smart room with automated features using simple electronics',

    // Course STEM Focus
    'course.1.stemFocus': 'Electronics, robotics, renewable energy, circuitry',
    'course.12.stemFocus': 'Robotics, electronics, programming, sensor integration',
    'course.13.stemFocus': 'Microcontrollers, IoT, mobile app integration, sensor technology',
    'course.14.stemFocus': 'Digital fabrication, PCB design, 3D printing, product development',
    'course.15.stemFocus': 'STEM pedagogy, educational design, leadership development',
    'course.16.stemFocus': 'Artificial intelligence, machine learning, computer science, programming',
    'course.17.stemFocus': 'Machine learning, conditional logic, interactive design, computational thinking',
    'course.18.stemFocus': 'AI integration, electronics, physical computing, interactive design',
    'course.19.stemFocus': 'Aerodynamics, robotics, coding, spatial orientation',
    'course.20.stemFocus': 'Advanced coding, spatial navigation, mission planning, aerodynamics',
    'course.21.stemFocus': 'Aerial imaging, data collection, GPS navigation, spatial analysis',
    'course.22.stemFocus': 'Artificial intelligence, digital creativity, computational thinking, multimedia production',
    'course.23.stemFocus': 'Artificial intelligence, prompt engineering, digital storytelling, multimedia creation',
    'course.24.stemFocus': 'AI integration, digital storytelling, media production, creative technology',
    'course.25.stemFocus': 'Artificial intelligence, digital art, visual design, computational creativity',
    'course.26.stemFocus': 'Artificial intelligence, computational thinking, language processing, creative writing',
    'course.27.stemFocus': 'Internet of Things (IoT), electronics, sensor technology, basic programming',

    // Course Life Skills
    'course.1.lifeSkills': 'Creative problem-solving, teamwork, presentation skills, leadership',
    'course.12.lifeSkills': 'Design thinking, problem-solving, presentation skills, teamwork',
    'course.13.lifeSkills': 'Entrepreneurship, project management, presentation skills, innovation thinking',
    'course.14.lifeSkills': 'Entrepreneurship, business modeling, market analysis, investor relations',
    'course.15.lifeSkills': 'Teaching, facilitation, mentoring, public speaking, ethical leadership',
    'course.16.lifeSkills': 'Digital creativity, critical thinking, problem-solving, presentation skills',
    'course.17.lifeSkills': 'Design thinking, problem-solving, creativity, ethical awareness',
    'course.18.lifeSkills': 'Problem-solving, engineering design, troubleshooting, presentation skills',
    'course.19.lifeSkills': 'Safety awareness, teamwork, problem-solving, hand-eye coordination',
    'course.20.lifeSkills': 'Team collaboration, problem-solving under pressure, creative thinking, planning',
    'course.21.lifeSkills': 'Environmental awareness, data interpretation, problem-solving, spatial reasoning',
    'course.22.lifeSkills': 'Creative expression, critical thinking, digital literacy, responsible technology use',
    'course.23.lifeSkills': 'Creative thinking, digital literacy, critical evaluation, ethical awareness',
    'course.24.lifeSkills': 'Project management, creative direction, narrative design, presentation skills',
    'course.25.lifeSkills': 'Creative expression, digital literacy, design thinking, presentation skills',
    'course.26.lifeSkills': 'Communication, creativity, storytelling, presentation skills',
    'course.27.lifeSkills': 'Problem-solving, creative thinking, technical communication, presentation skills',
    
    // Common
    'common.getStarted': 'Get Started',
    'common.learnMore': 'Learn More',
    'common.becomeTrainer': 'Become a Trainer',
    'common.viewDetails': 'View Details',
    'common.searchSpaces': 'Search Spaces',
    'common.searchPlaceholder': 'Search by city, neighborhood, or space name',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات',
    'nav.findTrainers': 'البحث عن مدربين',
    'nav.discoverSpaces': 'اكتشاف الأماكن',
    'nav.accessTools': 'الأدوات',
    'nav.buildBundle': 'بناء الحزمة',
    'nav.contact': 'اتصل بنا',
    'nav.signIn': 'تسجيل الدخول',
    'nav.signUp': 'إنشاء حساب',
    
    // Hero section
    'hero.title': 'تمكين الأطفال من التكنولوجيا من خلال التعلم العملي',
    'hero.subtitle': 'اختر واجمع الحزمة التعليمية المثالية مع المدربين والأماكن والأدوات والدورات المصممة خصيصاً لاهتمامات طفلك.',
    'hero.startBuilding': 'ابدأ بناء حزمتك',
    'hero.exploreSpaces': 'استكشف الأماكن',
    'hero.shareSpace': 'شارك مكانك الخاص',
    'hero.spacesAvailable': 'أكثر من 200 مكان متاح',
    
    // Features
    'features.title': 'اختر واجمع تجربتك التعليمية',
    'features.subtitle': 'نواة تجمع كل العناصر التي تحتاجها لرحلة تعليمية فعالة.',
    'features.findTrainers': 'البحث عن مدربين',
    'features.findTrainersDesc': 'تواصل مع مدربين خبراء بناءً على الخبرة والتقييمات وأسلوب التدريس.',
    'features.discoverSpaces': 'اكتشاف الأماكن',
    'features.discoverSpacesDesc': 'استكشف الأماكن المشتركة مثل المكتبات والمدارس ومساحات الصنع.',
    'features.accessTools': 'الوصول للأدوات',
    'features.accessToolsDesc': 'استأجر أو اشتر الأدوات المناسبة من السوق المشترك للدورات.',
    'features.customCourses': 'دورات مخصصة',
    'features.customCoursesDesc': 'اختر من كتالوجنا أو دع المدربين ينشئون تجارب تعليمية مخصصة.',
    
    // Courses
    'courses.title': 'كتالوج دوراتنا',
    'courses.allCourses': 'جميع الدورات',
    'courses.technology': 'التكنولوجيا',
    'courses.science': 'العلوم',
    'courses.mathematics': 'الرياضيات',
    'courses.viewDetails': 'عرض التفاصيل',
    'courses.ages': 'الأعمار',
    'courses.stemFocus': 'التركيز على العلوم والتكنولوجيا',
    'courses.lifeSkills': 'المهارات الحياتية',
    'courses.resourcesTitle': 'الموارد المشمولة',
    'courses.teacherGuides': 'أدلة المعلم مع تعليمات خطوة بخطوة',
    'courses.studentJournals': 'مجلات تأمل الطلاب',
    'courses.worksheets': 'أوراق العمل وقوالب الأنشطة',
    'courses.assessmentRubrics': 'نماذج التقييم (الإبداع، التعاون، التنفيذ التقني)',
    'courses.onlinePlatform': 'اختياري: منصة إلكترونية لمشاركة المشاريع',
    'courses.findSpace': 'ابحث عن مكان لدورتك',

    // Course Details
    'courseDetail.courseNotFound': 'الدورة غير موجودة',
    'courseDetail.backToCourses': 'العودة للدورات',
    'courseDetail.courseOverview': 'نظرة عامة على الدورة',
    'courseDetail.learningOutcomes': 'نتائج التعلم',
    'courseDetail.maxStudents': 'الحد الأقصى',
    'courseDetail.students': 'طلاب',
    'courseDetail.readyToEnroll': 'مستعد للتسجيل؟',
    'courseDetail.enrollmentDesc': 'احجز مكاناً لطفلك في هذه المغامرة التعليمية المثيرة.',
    'courseDetail.startEnrollment': 'بدء التسجيل',
    'courseDetail.requestInfo': 'طلب معلومات',
    'courseDetail.keyTechnologies': 'التقنيات الرئيسية المستخدمة',
    'courseDetail.electronics': 'الإلكترونيات',
    'courseDetail.renewableEnergy': 'الطاقة المتجددة',
    'courseDetail.robotics': 'الروبوتات',
    'courseDetail.curriculumOutline': 'الخطة الدراسية',
    'courseDetail.day': 'اليوم',
    'courseDetail.moduleTitle': 'عنوان الوحدة',
    'courseDetail.hours': 'الساعات',
    'courseDetail.activities': 'الأنشطة',
    'courseDetail.keySkills': 'المهارات الأساسية',
    'courseDetail.buildBundle': 'بناء حزمة دورة',

    // Course Titles
    'course.1.title': 'ملعب المخترع – بناء حديقة ألعاب صغيرة ذكية',
    'course.12.title': 'مبتكرو الروبوت – من الفكرة إلى النموذج الأولي',
    'course.13.title': 'مؤسسو التكنولوجيا المستقبلية – حلول ذكية للتحديات الواقعية',
    'course.14.title': 'مختبر رواد التكنولوجيا – من النموذج الأولي إلى المنتج',
    'course.15.title': 'سفراء التكنولوجيا – قيادة وتدريس الابتكار',
    'course.16.title': 'تعرف على السيد الذكاء الاصطناعي! – اكتشف الجانب الذكي للتكنولوجيا',
    'course.17.title': 'درب حيوانك الأليف الذكي! – اصنع مشاريع ذكية تتعلم',
    'course.18.title': 'الذكاء الاصطناعي في البرية! – أحي الأفكار الذكية',
    'course.19.title': 'طر بنفسك! – الخطوات الأولى مع الطائرات بدون طيار',
    'course.20.title': 'تحدي الطائرات بدون طيار! – كود وسباق وإنقاذ',
    'course.21.title': 'عيون في السماء! – استكشف وخطط وقس بالطائرات بدون طيار',
    'course.22.title': 'إبداع بالذكاء الاصطناعي! – خطواتك الأولى في السحر التوليدي',
    'course.23.title': 'أساتذة التوجيهات! – شكل الذكاء الاصطناعي كأداة إبداعية',
    'course.24.title': 'استوديو قصص الذكاء الاصطناعي! – ابن عالماً بالنص والفن والصوت',
    'course.25.title': 'مختبر فن الذكاء الاصطناعي! – ارسم والون وصمم بأدوات ذكية',
    'course.26.title': 'تحدث مع الروبوت! – اصنع قصص ونكت وألعاب بالذكاء الاصطناعي',
    'course.27.title': 'اخترق منزلك! – مقدمة للأجهزة الذكية وإنترنت الأشياء',

    // Course Projects
    'course.1.project': 'تصميم وبناء حديقة ألعاب صغيرة مدعومة بالتكنولوجيا والخيال',
    'course.12.project': 'تطوير نماذج أولية للحلول التكنولوجية لمشاكل العالم الحقيقي باستخدام الروبوتات',
    'course.13.project': 'تصميم ونشر حلول ذكية قائمة على التكنولوجيا للتحديات الواقعية',
    'course.14.project': 'تحسين نموذج أولي تقني موجود أو تطوير حل جديد للجاهزية للسوق',
    'course.15.project': 'تصميم وقيادة ورش عمل تقنية للطلاب الأصغر سناً',
    'course.16.project': 'تدريب نماذج الذكاء الاصطناعي وبناء مشروع ذكاء اصطناعي تفاعلي باستخدام أدوات مثل Teachable Machine و Scratch',
    'course.17.project': 'تدريب حيوان أليف رقمي ذكي يستجيب للصوت والحركات والأشياء باستخدام نماذج التعلم الآلي',
    'course.18.project': 'ربط نماذج الذكاء الاصطناعي بالمخرجات الواقعية باستخدام الأجهزة مثل micro:bit أو Arduino',
    'course.19.project': 'تعلم العمليات الأساسية للطائرات بدون طيار وإكمال مهمة طيران باستخدام البرمجة البسيطة',
    'course.20.project': 'تصميم وطيران مهام طائرات بدون طيار معقدة باستخدام البرمجة القائمة على الكتل',
    'course.21.project': 'استخدام الطائرات بدون طيار للتصوير الجوي والخرائط والمراقبة البيئية',
    'course.22.project': 'إنشاء صور وقصص وموسيقى وعروض تقديمية باستخدام أدوات الذكاء الاصطناعي',
    'course.23.project': 'إنشاء قصص متعددة الوسائط وملصقات رقمية بتوجيهات ذكاء اصطناعي أفضل',
    'course.24.project': 'إنشاء قصة متعددة الوسائط باستخدام النصوص والصور والصوت المولد بالذكاء الاصطناعي',
    'course.25.project': 'إنشاء فن رقمي باستخدام أدوات الذكاء الاصطناعي وتصميم معرض صغير للأعمال',
    'course.26.project': 'إنشاء قصص تفاعلية ونكت وألغاز وألعاب اختر مغامرتك باستخدام الذكاء الاصطناعي',
    'course.27.project': 'بناء غرفة ذكية صغيرة بميزات آلية باستخدام الإلكترونيات البسيطة',

    // Course STEM Focus
    'course.1.stemFocus': 'الإلكترونيات، الروبوتات، الطاقة المتجددة، الدوائر',
    'course.12.stemFocus': 'الروبوتات، الإلكترونيات، البرمجة، تكامل أجهزة الاستشعار',
    'course.13.stemFocus': 'المتحكمات الدقيقة، إنترنت الأشياء، تكامل تطبيقات الجوال، تقنية أجهزة الاستشعار',
    'course.14.stemFocus': 'التصنيع الرقمي، تصميم دوائر مطبوعة، الطباعة ثلاثية الأبعاد، تطوير المنتجات',
    'course.15.stemFocus': 'تعليم العلوم والتكنولوجيا، التصميم التعليمي، تطوير القيادة',
    'course.16.stemFocus': 'الذكاء الاصطناعي، التعلم الآلي، علوم الحاسوب، البرمجة',
    'course.17.stemFocus': 'التعلم الآلي، المنطق الشرطي، التصميم التفاعلي، التفكير الحاسوبي',
    'course.18.stemFocus': 'تكامل الذكاء الاصطناعي، الإلكترونيات، الحوسبة المادية، التصميم التفاعلي',
    'course.19.stemFocus': 'الديناميكا الهوائية، الروبوتات، البرمجة، التوجه المكاني',
    'course.20.stemFocus': 'البرمجة المتقدمة، الملاحة المكانية، تخطيط المهام، الديناميكا الهوائية',
    'course.21.stemFocus': 'التصوير الجوي، جمع البيانات، الملاحة بنظام تحديد المواقع، التحليل المكاني',
    'course.22.stemFocus': 'الذكاء الاصطناعي، الإبداع الرقمي، التفكير الحاسوبي، إنتاج الوسائط المتعددة',
    'course.23.stemFocus': 'الذكاء الاصطناعي، هندسة التوجيهات، السرد الرقمي، إنشاء الوسائط المتعددة',
    'course.24.stemFocus': 'تكامل الذكاء الاصطناعي، السرد الرقمي، إنتاج الوسائط، التكنولوجيا الإبداعية',
    'course.25.stemFocus': 'الذكاء الاصطناعي، الفن الرقمي، التصميم المرئي، الإبداع الحاسوبي',
    'course.26.stemFocus': 'الذكاء الاصطناعي، التفكير الحاسوبي، معالجة اللغة، الكتابة الإبداعية',
    'course.27.stemFocus': 'إنترنت الأشياء، الإلكترونيات، تقنية أجهزة الاستشعار، البرمجة الأساسية',

    // Course Life Skills
    'course.1.lifeSkills': 'حل المشاكل الإبداعي، العمل الجماعي، مهارات العرض، القيادة',
    'course.12.lifeSkills': 'التفكير التصميمي، حل المشاكل، مهارات العرض، العمل الجماعي',
    'course.13.lifeSkills': 'ريادة الأعمال، إدارة المشاريع، مهارات العرض، التفكير الابتكاري',
    'course.14.lifeSkills': 'ريادة الأعمال، نمذجة الأعمال، تحليل السوق، علاقات المستثمرين',
    'course.15.lifeSkills': 'التدريس، التيسير، الإرشاد، التحدث أمام الجمهور، القيادة الأخلاقية',
    'course.16.lifeSkills': 'الإبداع الرقمي، التفكير النقدي، حل المشاكل، مهارات العرض',
    'course.17.lifeSkills': 'التفكير التصميمي، حل المشاكل، الإبداع، الوعي الأخلاقي',
    'course.18.lifeSkills': 'حل المشاكل، التصميم الهندسي، استكشاف الأخطاء وإصلاحها، مهارات العرض',
    'course.19.lifeSkills': 'الوعي بالسلامة، العمل الجماعي، حل المشاكل، التنسيق بين اليد والعين',
    'course.20.lifeSkills': 'التعاون الجماعي، حل المشاكل تحت الضغط، التفكير الإبداعي، التخطيط',
    'course.21.lifeSkills': 'الوعي البيئي، تفسير البيانات، حل المشاكل، التفكير المكاني',
    'course.22.lifeSkills': 'التعبير الإبداعي، التفكير النقدي، الثقافة الرقمية، الاستخدام المسؤول للتكنولوجيا',
    'course.23.lifeSkills': 'التفكير الإبداعي، الثقافة الرقمية، التقييم النقدي، الوعي الأخلاقي',
    'course.24.lifeSkills': 'إدارة المشاريع، الإخراج الإبداعي، تصميم السرد، مهارات العرض',
    'course.25.lifeSkills': 'التعبير الإبداعي، الثقافة الرقمية، التفكير التصميمي، مهارات العرض',
    'course.26.lifeSkills': 'التواصل، الإبداع، السرد، مهارات العرض',
    'course.27.lifeSkills': 'حل المشاكل، التفكير الإبداعي، التواصل التقني، مهارات العرض',
    
    // Common
    'common.getStarted': 'ابدأ الآن',
    'common.learnMore': 'تعلم المزيد',
    'common.becomeTrainer': 'كن مدرباً',
    'common.viewDetails': 'عرض التفاصيل',
    'common.searchSpaces': 'البحث في الأماكن',
    'common.searchPlaceholder': 'ابحث بالمدينة أو الحي أو اسم المكان',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('language', language);
    // Set document direction
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
