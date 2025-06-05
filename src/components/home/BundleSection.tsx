
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, MapPin, Hammer, Book, SlidersHorizontal, ClipboardCheck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const BundleSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-yellow-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('bundle.title')}
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            {t('bundle.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. {t('bundle.chooseTrainer')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.chooseTrainerDesc')}
            </p>
            <Link to="/build-bundle?step=trainer">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.chooseTrainerAction')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <MapPin size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. {t('bundle.pickSpace')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.pickSpaceDesc')}
            </p>
            <Link to="/build-bundle?step=space">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.pickSpaceAction')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Hammer size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. {t('bundle.selectTools')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.selectToolsDesc')}
            </p>
            <Link to="/build-bundle?step=tools">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.selectToolsAction')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <Book size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">4. {t('bundle.pickCourse')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.pickCourseDesc')}
            </p>
            <Link to="/build-bundle?step=course">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.pickCourseAction')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <SlidersHorizontal size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">5. {t('bundle.setPreferences')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.setPreferencesDesc')}
            </p>
            <Link to="/build-bundle?step=audience">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.setPreferencesAction')}
              </Button>
            </Link>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 text-yellow-600 mb-4">
              <ClipboardCheck size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">6. {t('bundle.reviewBundle')}</h3>
            <p className="text-gray-600 mb-4">
              {t('bundle.reviewBundleDesc')}
            </p>
            <Link to="/build-bundle?step=preview">
              <Button variant="link" className="p-0 text-yellow-600 hover:text-yellow-700">
                {t('bundle.reviewBundleAction')}
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="text-center">
          <Link to="/build-bundle">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-lg px-8 py-6 h-auto">
              {t('bundle.startBuilding')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BundleSection;
