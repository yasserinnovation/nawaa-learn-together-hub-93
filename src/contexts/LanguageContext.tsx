
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
    'hero.title': 'Transform Ideas into Real Prototypes',
    'hero.subtitle': 'Connect with expert trainers, access cutting-edge tools, and use real makerspaces to build your MVP. From idea to launch in one comprehensive platform.',
    'hero.startBuilding': 'Start Your MVP Journey',
    'hero.smartAssessment': 'Take Smart Assessment',
    'hero.exploreSpaces': 'Explore 150+ Spaces',
    'hero.shareSpace': 'Share Your Space',
    'hero.spacesAvailable': '150+ Spaces Available',
    
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
    
    // Testimonials
    'testimonials.title': 'What Our Community Says',
    'testimonials.subtitle': 'Join the growing community of innovators, trainers, and space providers.',
    
    // CTA Section
    'cta.title': 'Ready to Build Your MVP?',
    'cta.subtitle': 'Join thousands of innovators who have transformed their ideas into real prototypes. Start your journey today.',
    'cta.startBuilding': 'Start Building Now',
    'cta.contactUs': 'Contact Us',
    
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
    'nav.courses': 'الدورات التدريبية',
    'nav.findTrainers': 'البحث عن مدربين',
    'nav.discoverSpaces': 'اكتشاف الأماكن',
    'nav.accessTools': 'الأدوات والمعدات',
    'nav.buildBundle': 'بناء الحزمة',
    'nav.contact': 'تواصل معنا',
    'nav.signIn': 'تسجيل الدخول',
    'nav.signUp': 'إنشاء حساب جديد',
    
    // Hero section
    'hero.title': 'حوّل أفكارك إلى نماذج أولية حقيقية',
    'hero.subtitle': 'تواصل مع مدربين خبراء، واحصل على أحدث الأدوات، واستخدم مساحات العمل الحقيقية لبناء نموذجك الأولي. من الفكرة إلى الإطلاق في منصة واحدة شاملة.',
    'hero.startBuilding': 'ابدأ رحلة بناء نموذجك الأولي',
    'hero.smartAssessment': 'خذ التقييم الذكي',
    'hero.exploreSpaces': 'استكشف أكثر من 150 مساحة',
    'hero.shareSpace': 'شارك مساحتك',
    'hero.spacesAvailable': 'أكثر من 150 مساحة متاحة',
    
    // Features
    'features.title': 'كل ما تحتاجه لبناء نموذجك الأولي',
    'features.subtitle': 'نظامنا البيئي الشامل يوفر جميع الموارد والإرشادات والدعم اللازم لتحويل أفكارك المبتكرة إلى نماذج أولية حقيقية وعملية.',
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
    
    // Bundle Section
    'bundle.title': 'ابن حزمة التعلم الخاصة بك',
    'bundle.subtitle': 'امزج واختر المزيج المثالي من المدرب والأدوات والمساحة والمحتوى — كل ذلك مصمم خصيصاً لأهدافك.',
    'bundle.chooseTrainer': 'اختر المدرب',
    'bundle.chooseTrainerDesc': 'ابحث عن مدربين خبراء متخصصين في الروبوتات والبرمجة والتصميم ثلاثي الأبعاد والمزيد.',
    'bundle.chooseTrainerAction': 'ابدأ من هنا →',
    'bundle.pickSpace': 'اختر المساحة',
    'bundle.pickSpaceDesc': 'اختر من المكتبات ومساحات العمل المشتركة ومساحات الصناع المثالية للتعلم.',
    'bundle.pickSpaceAction': 'استكشف المساحات →',
    'bundle.selectTools': 'اختر الأدوات',
    'bundle.selectToolsDesc': 'اختر من مجموعات الأردوينو والأقلام ثلاثية الأبعاد والروبوتات والمزيد لجلستك.',
    'bundle.selectToolsAction': 'تصفح الأدوات →',
    'bundle.pickCourse': 'اختر الدورة',
    'bundle.pickCourseDesc': 'اختر من الدورات المنسقة أو دع مدربك يحدد دورة مخصصة.',
    'bundle.pickCourseAction': 'شاهد الدورات →',
    'bundle.setPreferences': 'اضبط التفضيلات',
    'bundle.setPreferencesDesc': 'خصص لجمهورك مع خيارات اللغة والفئة العمرية والجدولة.',
    'bundle.setPreferencesAction': 'اضبط →',
    'bundle.reviewBundle': 'راجع الحزمة',
    'bundle.reviewBundleDesc': 'اعرض حزمة التعلم الكاملة قبل التأكيد والحجز.',
    'bundle.reviewBundleAction': 'اكمل →',
    'bundle.startBuilding': 'ابدأ ببناء حزمتك',
    
    // Testimonials
    'testimonials.title': 'ماذا يقول مجتمعنا',
    'testimonials.subtitle': 'انضم إلى المجتمع المتنامي من المبتكرين والمدربين ومقدمي المساحات.',
    
    // CTA Section
    'cta.title': 'مستعد لبناء نموذجك الأولي؟',
    'cta.subtitle': 'انضم إلى آلاف المبتكرين الذين حولوا أفكارهم إلى نماذج أولية حقيقية. ابدأ رحلتك اليوم.',
    'cta.startBuilding': 'ابدأ البناء الآن',
    'cta.contactUs': 'تواصل معنا',
    
    // Common
    'common.getStarted': 'ابدأ الآن',
    'common.learnMore': 'تعلم المزيد',
    'common.becomeTrainer': 'كن مدرباً',
    'common.viewDetails': 'عرض التفاصيل',
    'common.searchSpaces': 'البحث في المساحات',
    'common.searchPlaceholder': 'ابحث بالمدينة أو الحي أو اسم المساحة',
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
