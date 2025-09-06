
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 text-gray-600 hover:text-yellow-600 hover:bg-yellow-50 transition-all duration-200 rounded-lg px-3 py-2 font-medium"
      aria-label={`Switch to ${language === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm">
        {language === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
