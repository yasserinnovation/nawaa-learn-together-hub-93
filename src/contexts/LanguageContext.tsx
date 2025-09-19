
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
    'nav.competitionsGuide': 'Competitions Guide',
    'nav.smartAssessment': 'Smart Assessment',
    'nav.contact': 'Contact',
    'nav.signIn': 'Sign in',
    'nav.signUp': 'Sign up',
    
    // Hero section
    'hero.title': 'Empowering Institutions and Trainers to Deliver Global Educational Value',
    'hero.subtitle': 'Connect with expert trainers, get the latest tools, and use real workspaces to build your prototype. From idea to launch in one comprehensive platform.',
    'hero.badge': 'Transform Your Ideas',
    'hero.startBuilding': 'Start Your MVP Journey',
    'hero.smartAssessment': 'Take Smart Assessment',
    'hero.startAssessment': 'Take Smart Assessment',
    'hero.exploreSpaces': 'Explore Spaces',
    'hero.browseCourses': 'Browse Courses',
    'hero.shareSpace': 'Share Your Space',
    'hero.spacesAvailable': '150+',
    
    // Features
    'features.title': 'Everything You Need to Build Your MVP',
    'features.subtitle': 'Our comprehensive ecosystem provides all the resources, guidance, and support needed to transform your innovative ideas into real working prototypes.',
    'features.expertTrainers': 'Expert Trainers',
    'features.expertTrainersDesc': 'Connect with experienced mentors and industry professionals who guide you through every step of your innovation journey.',
    'features.realMakerspaces': 'Real Makerspaces',
    'features.realMakerspacesDesc': 'Access fully equipped workshops and collaborative spaces with 3D printers, electronics, and prototyping tools.',
    'features.professionalTools': 'Professional Tools',
    'features.professionalToolsDesc': 'Rent or access cutting-edge equipment, software, and materials needed to build professional-grade prototypes.',
    'features.guidedLearning': 'Guided Learning',
    'features.guidedLearningDesc': 'Follow structured courses and tutorials tailored to your project needs and skill level for effective learning.',
    
    // How It Works
    'howItWorks.title': 'How Nawaa Works',
    'howItWorks.subtitle': 'From idea to MVP in three simple steps. Our platform guides you through the entire innovation journey.',
    'howItWorks.step1': 'Submit Your Idea',
    'howItWorks.step1Desc': 'Share your innovative concept or choose from our curated templates across Green Tech, Smart Toys, and Assistive Devices.',
    'howItWorks.step2': 'Get Matched & Build',
    'howItWorks.step2Desc': 'Our smart engine connects you with expert trainers, nearby spaces, and required tools. Follow guided timelines to learn and build.',
    'howItWorks.step3': 'Launch Your MVP',
    'howItWorks.step3Desc': 'Complete your prototype, create a pitch deck, and showcase in our Innovation Gallery for feedback and opportunities.',
    'howItWorks.startJourney': 'Start Your MVP Journey',
    
    // Idea to MVP Section
    'ideaToMvp.title': 'From Idea to MVP in One Platform',
    'ideaToMvp.subtitle': 'Transform your innovative ideas into real prototypes with our comprehensive ecosystem. Get matched with expert trainers, access tools and spaces, and launch your MVP with confidence.',
    'ideaToMvp.submitIdea': 'Submit Your Idea',
    'ideaToMvp.submitIdeaDesc': 'Share your innovative idea or choose from our curated templates across themes like Green Tech, Smart Toys, and Assistive Devices.',
    'ideaToMvp.getMatched': 'Get Matched with Experts',
    'ideaToMvp.getMatchedDesc': 'Our smart matching engine connects you with the right trainers, tools, and spaces based on your location and project needs.',
    'ideaToMvp.buildLearn': 'Build & Learn',
    'ideaToMvp.buildLearnDesc': 'Follow a guided project timeline, learn required skills, and access real tools and workspace to bring your idea to life.',
    'ideaToMvp.launchMvp': 'Launch Your MVP',
    'ideaToMvp.launchMvpDesc': 'Upload your prototype, create a pitch deck, and showcase your innovation in our public Innovation Gallery.',
    'ideaToMvp.readyToTurn': 'Ready to Turn Your Idea into Reality?',
    'ideaToMvp.readyToTurnDesc': 'Join our platform and get access to expert guidance, cutting-edge tools, and collaborative spaces designed to help you build and launch your MVP successfully.',
    'ideaToMvp.startJourney': 'Start Your MVP Journey',
    'ideaToMvp.exploreEcosystem': 'Explore Our Ecosystem',
    
    // Assessment Section
    'assessment.title': 'Smart Child Assessment',
    'assessment.subtitle': 'Not sure which course is perfect for your child? Our AI-powered assessment analyzes their strengths, interests, and learning style to recommend the ideal tech course.',
    'assessment.multipleIntelligences': 'Multiple Intelligences',
    'assessment.multipleIntelligencesDesc': 'Discover your child\'s unique learning strengths and cognitive preferences',
    'assessment.personalityAnalysis': 'Personality Analysis',
    'assessment.personalityAnalysisDesc': 'Understand their behavior patterns and social learning preferences',
    'assessment.courseMatching': 'Course Matching',
    'assessment.courseMatchingDesc': 'Get personalized recommendations for the perfect learning path',
    'assessment.startAssessment': 'Start Smart Assessment',
    'assessment.duration': 'Takes only 5-10 minutes • 100% Free',
    
    // Logo Showcase Section
    'logoShowcase.title': 'Empowering the Next Generation of Innovators',
    'logoShowcase.description': 'At Nawaa, we bring children together with technology, fostering creativity, innovation, and hands-on learning experiences through our unique spiral approach to education.',
    
    // Testimonials
    'testimonials.title': 'What Our Community Says',
    'testimonials.subtitle': 'Join the growing community of innovators, trainers, and space providers.',
    'testimonials.quote1': 'Nawaa has transformed how my child learns about robotics. The ability to find great trainers and appropriate spaces near us is invaluable.',
    'testimonials.author1': 'Amira Hassan',
    'testimonials.role1': 'Parent',
    'testimonials.quote2': 'As a trainer, I can focus on teaching while Nawaa helps me find the right spaces and tools. It\'s revolutionized my educational approach.',
    'testimonials.author2': 'Omar Al-Rashid',
    'testimonials.role2': 'Technology Trainer',
    'testimonials.quote3': 'Our library has welcomed so many new young learners since we listed our space on Nawaa. It\'s wonderful to see our resources being utilized.',
    'testimonials.author3': 'Fatma El-Sayed',
    'testimonials.role3': 'Community Space Provider',
    
    // CTA Section
    'cta.title': 'Ready to Transform Your Ideas into Reality?',
    'cta.subtitle': 'Join thousands of innovators who have built successful prototypes. Start your journey today.',
    'cta.takeAssessment': 'Take Smart Assessment',
    'cta.contactUs': 'Contact Us',
    
    // Courses
    'courses.title': 'Our Learning Programs',
    'courses.allCourses': 'All Courses',
    'courses.technology': 'Technology',
    'courses.science': 'Science',
    'courses.mathematics': 'Mathematics',
    'courses.ages': 'Ages',
    'courses.stemFocus': 'STEM Focus',
    'courses.lifeSkills': 'Life Skills',
    'courses.viewDetails': 'View Details',
    'courses.resourcesTitle': 'Everything You Need to Succeed',
    'courses.teacherGuides': 'Complete teacher guides with step-by-step instructions',
    'courses.studentJournals': 'Interactive student journals for reflection and documentation',
    'courses.worksheets': 'Printable worksheets and activity templates',
    'courses.assessmentRubrics': 'Assessment rubrics and progress tracking tools',
    'courses.onlinePlatform': 'Online platform access with video tutorials',
    'courses.findSpace': 'Find a Space to Learn',

    // Common
    'common.getStarted': 'Get Started',
    'common.learnMore': 'Learn More',
    'common.becomeTrainer': 'Become a Trainer',
    'common.viewDetails': 'View Details',
    'common.searchSpaces': 'Search Spaces',
    'common.searchPlaceholder': 'Search by city, neighborhood, or space name',

    // Stats Section
    'stats.title': 'Empowering Innovation Across Egypt',
    'stats.subtitle': 'Join thousands of innovators who are transforming their ideas into reality',
    'stats.activeUsers': 'Active Users',
    'stats.activeUsersDesc': 'Students and trainers actively using the platform',
    'stats.spaces': 'Learning Spaces',
    'stats.spacesDesc': 'Makerspaces and workshops across Egypt',
    'stats.courses': 'STEM Courses', 
    'stats.coursesDesc': 'Hands-on courses for all skill levels',
    'stats.satisfaction': 'Satisfaction Rate',
    'stats.satisfactionDesc': 'Students rate their experience as excellent',

    // Interactive Demo
    'demo.title': 'Explore Our Platform',
    'demo.subtitle': 'See how our platform can help you turn your ideas into reality',
    'demo.spaces': 'Discover Spaces',
    'demo.spacesDesc': 'Find makerspaces and workshops near you',
    'demo.courses': 'STEM Courses',
    'demo.coursesDesc': 'Hands-on learning experiences for all ages',
    'demo.tools': 'Access Tools',
    'demo.toolsDesc': 'Rent professional equipment and tools',
    'demo.trainers': 'Expert Trainers',
    'demo.trainersDesc': 'Connect with skilled mentors and coaches',
    'demo.explore': 'Explore Now',

    // Newsletter
    'newsletter.title': 'Get the Latest Updates',
    'newsletter.subtitle': 'Subscribe to our newsletter and be the first to know about new courses, spaces, and innovation opportunities.',
    'newsletter.badge': 'Stay Updated',
    'newsletter.emailPlaceholder': 'Enter your email address',
    'newsletter.subscribe': 'Subscribe',
    'newsletter.subscribing': 'Subscribing...',
    'newsletter.privacy': 'We respect your privacy. Unsubscribe at any time.',
    'newsletter.benefit1': 'Weekly updates',
    'newsletter.benefit2': 'Exclusive content',
    'newsletter.benefit3': 'Early access',
    'newsletter.success': 'Successfully subscribed to newsletter!',
    'newsletter.invalidEmail': 'Please enter a valid email address',
    'newsletter.thankYou': 'Thank You!',
    'newsletter.confirmationMessage': 'You\'ve been successfully subscribed to our newsletter. Check your email for confirmation.',

    // Tools section
    'tools.title': 'Access Learning Tools',
    'tools.subtitle': 'Find, rent, or purchase quality educational tools and equipment. Connect with our community to access everything you need for hands-on learning.',
    'tools.qualityTools': 'Quality Tools',
    'tools.qualityToolsDesc': 'Verified educational equipment from trusted sources',
    'tools.findWhatYouNeed': 'Find What You Need',
    'tools.findWhatYouNeedDesc': 'Advanced search and filtering to match your course requirements',
    'tools.affordableOptions': 'Affordable Options',
    'tools.affordableOptionsDesc': 'Rent, buy, or access free tools within your budget',
    'tools.exploreAll': 'Explore All Tools',
    'tools.addYourTool': 'Add Your Tool',

    // Spaces section
    'spaces.title': 'Discover Learning Spaces',
    'spaces.subtitle': 'Find makerspaces, libraries, and collaborative environments perfect for hands-on tech training across Egypt.',
    'spaces.searchSpaces': 'Search Spaces',
    'spaces.searchPlaceholder': 'Search by city, neighborhood, or space name',

    // Authentication
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.createAccount': 'Create Account',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.backToLogin': 'Back to Login',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.courses': 'الدورات التدريبية',
    'nav.findTrainers': 'البحث عن مدربين',
    'nav.discoverSpaces': 'اكتشاف الأماكن',
    'nav.accessTools': 'الأدوات والمعدات',
    'nav.competitionsGuide': 'دليل المسابقات',
    'nav.smartAssessment': 'تقييم ذكي',
    'nav.contact': 'تواصل معنا',
    'nav.signIn': 'تسجيل الدخول',
    'nav.signUp': 'إنشاء حساب جديد',
    
    // Hero section
    'hero.title': 'تمكين المؤسسات والمدربين من تقديم قيمة تعليمية ذات طابع عالمي',
    'hero.subtitle': 'تواصل مع مدربين خبراء، واحصل على أحدث الأدوات، واستخدم مساحات العمل الحقيقية لبناء نموذجك الأولي. من الفكرة إلى الإطلاق في منصة واحدة شاملة.',
    'hero.badge': 'حول أفكارك إلى واقع',
    'hero.startBuilding': 'ابدأ رحلة بناء نموذجك الأولي',
    'hero.smartAssessment': 'خذ التقييم الذكي',
    'hero.startAssessment': 'خذ التقييم الذكي',
    'hero.exploreSpaces': 'استكشف المساحات',
    'hero.browseCourses': 'تصفح الدورات',
    'hero.shareSpace': 'شارك مساحتك',
    'hero.spacesAvailable': '150+',
    
    // Features
    'features.expertTrainers': 'مدربون خبراء',
    'features.expertTrainersDesc': 'تواصل مع موجهين ذوي خبرة ومتخصصين في الصناعة يرشدونك خلال كل خطوة في رحلة الابتكار.',
    'features.realMakerspaces': 'مساحات عمل حقيقية',
    'features.realMakerspacesDesc': 'احصل على ورش عمل مجهزة بالكامل ومساحات تعاونية مع طابعات ثلاثية الأبعاد وإلكترونيات وأدوات النماذج الأولية.',
    'features.professionalTools': 'أدوات احترافية',
    'features.professionalToolsDesc': 'استأجر أو احصل على معدات وبرامج ومواد متطورة مطلوبة لبناء نماذج أولية بمستوى احترافي.',
    'features.guidedLearning': 'تعلم موجه',
    'features.guidedLearningDesc': 'اتبع دورات ودروس منظمة مصممة خصيصاً لاحتياجات مشروعك ومستوى مهارتك للتعلم الفعال.',
    
    // How It Works
    'howItWorks.title': 'كيف تعمل نواة',
    'howItWorks.subtitle': 'من الفكرة إلى النموذج الأولي في ثلاث خطوات بسيطة. منصتنا ترشدك خلال رحلة الابتكار بأكملها.',
    'howItWorks.step1': 'اقترح فكرتك',
    'howItWorks.step1Desc': 'شارك مفهومك المبتكر أو اختر من قوالبنا المنسقة عبر التكنولوجيا الخضراء والألعاب الذكية والأجهزة المساعدة.',
    'howItWorks.step2': 'احصل على المطابقة والبناء',
    'howItWorks.step2Desc': 'محركنا الذكي يربطك بمدربين خبراء ومساحات قريبة والأدوات المطلوبة. اتبع الجداول الزمنية الموجهة للتعلم والبناء.',
    'howItWorks.step3': 'أطلق نموذجك الأولي',
    'howItWorks.step3Desc': 'أكمل نموذجك الأولي، وأنشئ عرض تقديمي، واعرضه في معرض الابتكار للحصول على تعليقات وفرص.',
    'howItWorks.startJourney': 'ابدأ رحلة نموذجك الأولي',
    
    // Idea to MVP Section
    'ideaToMvp.title': 'من الفكرة إلى النموذج الأولي في منصة واحدة',
    'ideaToMvp.subtitle': 'حوّل أفكارك المبتكرة إلى نماذج أولية حقيقية مع نظامنا البيئي الشامل. احصل على مطابقة مع مدربين خبراء، واحصل على الأدوات والمساحات، وأطلق نموذجك الأولي بثقة.',
    'ideaToMvp.submitIdea': 'اقترح فكرتك',
    'ideaToMvp.submitIdeaDesc': 'شارك فكرتك المبتكرة أو اختر من قوالبنا المنسقة عبر مواضيع مثل التكنولوجيا الخضراء والألعاب الذكية والأجهزة المساعدة.',
    'ideaToMvp.getMatched': 'احصل على مطابقة مع الخبراء',
    'ideaToMvp.getMatchedDesc': 'محرك المطابقة الذكي لدينا يربطك بالمدربين والأدوات والمساحات المناسبة بناءً على موقعك واحتياجات مشروعك.',
    'ideaToMvp.buildLearn': 'ابن وتعلم',
    'ideaToMvp.buildLearnDesc': 'اتبع جدولاً زمنياً موجهاً للمشروع، وتعلم المهارات المطلوبة، واحصل على أدوات حقيقية ومساحة عمل لإحياء فكرتك.',
    'ideaToMvp.launchMvp': 'أطلق نموذجك الأولي',
    'ideaToMvp.launchMvpDesc': 'ارفع نموذجك الأولي، وأنشئ عرضاً تقديمياً، واعرض ابتكارك في معرض الابتكار العام لدينا.',
    'ideaToMvp.readyToTurn': 'مستعد لتحويل فكرتك إلى حقيقة؟',
    'ideaToMvp.readyToTurnDesc': 'انضم إلى منصتنا واحصل على إرشادات الخبراء والأدوات المتطورة والمساحات التعاونية المصممة لمساعدتك في بناء وإطلاق نموذجك الأولي بنجاح.',
    'ideaToMvp.startJourney': 'ابدأ رحلة نموذجك الأولي',
    'ideaToMvp.exploreEcosystem': 'استكشف نظامنا البيئي',
    
    // Assessment Section
    'assessment.title': 'التقييم الذكي للطفل',
    'assessment.subtitle': 'غير متأكد من الدورة المثالية لطفلك؟ تقييمنا المدعوم بالذكاء الاصطناعي يحلل نقاط قوته واهتماماته وأسلوب تعلمه لتوصية الدورة التقنية المثالية.',
    'assessment.multipleIntelligences': 'الذكاءات المتعددة',
    'assessment.multipleIntelligencesDesc': 'اكتشف نقاط القوة التعليمية الفريدة لطفلك وتفضيلاته المعرفية',
    'assessment.personalityAnalysis': 'تحليل الشخصية',
    'assessment.personalityAnalysisDesc': 'فهم أنماط سلوكه وتفضيلاته في التعلم الاجتماعي',
    'assessment.courseMatching': 'مطابقة الدورات',
    'assessment.courseMatchingDesc': 'احصل على توصيات شخصية لمسار التعلم المثالي',
    'assessment.startAssessment': 'ابدأ التقييم الذكي',
    'assessment.duration': 'يستغرق فقط 5-10 دقائق • مجاني 100%',
    
    // Logo Showcase Section
    'logoShowcase.title': 'تمكين الجيل القادم من المبدعين',
    'logoShowcase.description': 'في نواة، نجمع الأطفال مع التكنولوجيا، ونعزز الإبداع والابتكار وتجارب التعلم العملية من خلال نهجنا الحلزوني الفريد في التعليم.',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول مجتمعنا',
    'testimonials.subtitle': 'انضم إلى المجتمع المتنامي من المبتكرين والمدربين ومقدمي المساحات.',
    'testimonials.quote1': 'لقد غيّرت نواة طريقة تعلم طفلي للروبوتات. القدرة على العثور على مدربين رائعين ومساحات مناسبة بالقرب منا لا تقدر بثمن.',
    'testimonials.author1': 'أميرة حسن',
    'testimonials.role1': 'والد',
    'testimonials.quote2': 'كمدرب، يمكنني التركيز على التدريس بينما تساعدني نواة في العثور على المساحات والأدوات المناسبة. لقد أحدثت ثورة في نهجي التعليمي.',
    'testimonials.author2': 'عمر الراشد',
    'testimonials.role2': 'مدرب تكنولوجيا',
    'testimonials.quote3': 'رحبت مكتبتنا بالعديد من المتعلمين الشباب الجدد منذ أن أدرجنا مساحتنا في نواة. من الرائع رؤية مواردنا يتم استغلالها.',
    'testimonials.author3': 'فاطمة السيد',
    'testimonials.role3': 'مقدم مساحة مجتمعية',
    
    // CTA Section
    'cta.title': 'مستعد لتحويل أفكارك إلى حقيقة؟',
    'cta.subtitle': 'انضم إلى آلاف المبتكرين الذين بنوا نماذج أولية ناجحة. ابدأ رحلتك اليوم.',
    'cta.takeAssessment': 'خذ التقييم الذكي',
    'cta.contactUs': 'تواصل معنا',
    
    // Courses
    'courses.title': 'برامجنا التعليمية',
    'courses.allCourses': 'جميع الدورات',
    'courses.technology': 'التكنولوجيا',
    'courses.science': 'العلوم',
    'courses.mathematics': 'الرياضيات',
    'courses.ages': 'الأعمار',
    'courses.stemFocus': 'تركيز العلوم والتكنولوجيا',
    'courses.lifeSkills': 'مهارات الحياة',
    'courses.viewDetails': 'عرض التفاصيل',
    'courses.resourcesTitle': 'كل ما تحتاجه للنجاح',
    'courses.teacherGuides': 'أدلة المعلمين الكاملة مع تعليمات خطوة بخطوة',
    'courses.studentJournals': 'مجلات الطلاب التفاعلية للتأمل والتوثيق',
    'courses.worksheets': 'أوراق العمل القابلة للطباعة وقوالب الأنشطة',
    'courses.assessmentRubrics': 'معايير التقييم وأدوات تتبع التقدم',
    'courses.onlinePlatform': 'الوصول إلى المنصة الإلكترونية مع دروس الفيديو',
    'courses.findSpace': 'ابحث عن مكان للتعلم',

    // Common
    'common.getStarted': 'ابدأ الآن',
    'common.learnMore': 'تعلم المزيد',
    'common.becomeTrainer': 'كن مدرباً',
    'common.viewDetails': 'عرض التفاصيل',
    'common.searchSpaces': 'البحث في المساحات',
    'common.searchPlaceholder': 'ابحث بالمدينة أو الحي أو اسم المساحة',

    // Stats Section
    'stats.title': 'تمكين الابتكار في جميع أنحاء مصر',
    'stats.subtitle': 'انضم إلى آلاف المبتكرين الذين يحولون أفكارهم إلى حقيقة',
    'stats.activeUsers': 'المستخدمون النشطون',
    'stats.activeUsersDesc': 'الطلاب والمدربون الذين يستخدمون المنصة بنشاط',
    'stats.spaces': 'مساحات التعلم',
    'stats.spacesDesc': 'مساحات العمل وورش العمل في جميع أنحاء مصر',
    'stats.courses': 'دورات STEM',
    'stats.coursesDesc': 'دورات عملية لجميع المستويات',
    'stats.satisfaction': 'معدل الرضا',
    'stats.satisfactionDesc': 'الطلاب يقيمون تجربتهم كممتازة',

    // Interactive Demo
    'demo.title': 'استكشف منصتنا',
    'demo.subtitle': 'اكتشف كيف يمكن لمنصتنا أن تساعدك في تحويل أفكارك إلى واقع',
    'demo.spaces': 'اكتشاف الأماكن',
    'demo.spacesDesc': 'ابحث عن مساحات العمل وورش العمل بالقرب منك',
    'demo.courses': 'دورات STEM',
    'demo.coursesDesc': 'تجارب تعلم عملية لجميع الأعمار',
    'demo.tools': 'الوصول للأدوات',
    'demo.toolsDesc': 'استأجر المعدات والأدوات المهنية',
    'demo.trainers': 'المدربون الخبراء',
    'demo.trainersDesc': 'تواصل مع الموجهين والمدربين المهرة',
    'demo.explore': 'استكشف الآن',

    // Newsletter
    'newsletter.title': 'احصل على آخر التحديثات',
    'newsletter.subtitle': 'اشترك في نشرتنا الإخبارية وكن أول من يعرف عن الدورات والمساحات والفرص الجديدة للابتكار.',
    'newsletter.badge': 'ابق على اطلاع',
    'newsletter.emailPlaceholder': 'أدخل عنوان بريدك الإلكتروني',
    'newsletter.subscribe': 'اشتراك',
    'newsletter.subscribing': 'جاري الاشتراك...',
    'newsletter.privacy': 'نحن نحترم خصوصيتك. يمكنك إلغاء الاشتراك في أي وقت.',
    'newsletter.benefit1': 'تحديثات أسبوعية',
    'newsletter.benefit2': 'محتوى حصري',
    'newsletter.benefit3': 'وصول مبكر',
    'newsletter.success': 'تم الاشتراك بنجاح في النشرة الإخبارية!',
    'newsletter.invalidEmail': 'يرجى إدخال عنوان بريد إلكتروني صحيح',
    'newsletter.thankYou': 'شكراً لك!',
    'newsletter.confirmationMessage': 'تم اشتراكك بنجاح في نشرتنا الإخبارية. تحقق من بريدك الإلكتروني للتأكيد.',

    // Tools section
    'tools.title': 'الوصول لأدوات التعلم',
    'tools.subtitle': 'ابحث واستأجر أو اشتري أدوات ومعدات تعليمية عالية الجودة. تواصل مع مجتمعنا للوصول إلى كل ما تحتاجه للتعلم العملي.',
    'tools.qualityTools': 'أدوات عالية الجودة',
    'tools.qualityToolsDesc': 'معدات تعليمية معتمدة من مصادر موثوقة',
    'tools.findWhatYouNeed': 'اعثر على ما تحتاجه',
    'tools.findWhatYouNeedDesc': 'بحث وتصفية متقدمة لتلبية متطلبات دورتك',
    'tools.affordableOptions': 'خيارات ميسورة التكلفة',
    'tools.affordableOptionsDesc': 'استأجر أو اشتري أو احصل على أدوات مجانية ضمن ميزانيتك',
    'tools.exploreAll': 'استكشف جميع الأدوات',
    'tools.addYourTool': 'أضف أداتك',

    // Spaces section
    'spaces.title': 'اكتشف مساحات التعلم',
    'spaces.subtitle': 'ابحث عن مساحات العمل والمكتبات والبيئات التعاونية المثالية للتدريب التقني العملي في جميع أنحاء مصر.',
    'spaces.searchSpaces': 'البحث في المساحات',
    'spaces.searchPlaceholder': 'ابحث بالمدينة أو الحي أو اسم المساحة',

    // Authentication  
    'auth.signIn': 'تسجيل الدخول',
    'auth.signUp': 'إنشاء حساب',
    'auth.createAccount': 'إنشاء حساب جديد',
    'auth.forgotPassword': 'نسيت كلمة المرور؟',
    'auth.backToLogin': 'العودة للدخول',
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
    // Set document direction to ltr for both languages
    document.dir = 'ltr';
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
