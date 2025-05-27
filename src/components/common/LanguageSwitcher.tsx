
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
      className="flex items-center gap-2"
    >
      <Globe className="h-4 w-4" />
      <span>{language === 'en' ? 'العربية' : 'English'}</span>
    </Button>
  );
};

export default LanguageSwitcher;
