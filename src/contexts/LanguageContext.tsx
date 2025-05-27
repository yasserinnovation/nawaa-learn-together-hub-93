
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
