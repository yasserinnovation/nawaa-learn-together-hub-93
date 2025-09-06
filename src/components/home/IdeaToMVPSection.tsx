
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Lightbulb, Users, Wrench, Rocket, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const IdeaToMVPSection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('ideaToMvp.title')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('ideaToMvp.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="relative mb-6">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Lightbulb className="h-10 w-10 text-yellow-500" />
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('ideaToMvp.submitIdea')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('ideaToMvp.submitIdeaDesc')}</p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Users className="h-10 w-10 text-blue-500" />
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('ideaToMvp.getMatched')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('ideaToMvp.getMatchedDesc')}</p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Wrench className="h-10 w-10 text-green-500" />
                </div>
                <div className="hidden lg:block absolute top-10 left-full w-full">
                  <ArrowRight className="h-6 w-6 text-gray-300 mx-auto" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('ideaToMvp.buildLearn')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('ideaToMvp.buildLearnDesc')}</p>
            </div>

            <div className="text-center">
              <div className="relative mb-6">
                <div className="bg-gray-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                  <Rocket className="h-10 w-10 text-purple-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-3">{t('ideaToMvp.launchMvp')}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{t('ideaToMvp.launchMvpDesc')}</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">{t('ideaToMvp.readyToTurn')}</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {t('ideaToMvp.readyToTurnDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600" asChild>
              <Link to="/smart-assessment" className="flex items-center gap-2">
                {t('ideaToMvp.takeAssessment') || 'Take Assessment'}
                <Rocket className="h-5 w-5" />
              </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/discover-spaces">
                  {t('ideaToMvp.exploreEcosystem')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IdeaToMVPSection;
