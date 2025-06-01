
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Brain } from "lucide-react";
import AssessmentStep1 from "@/components/assessment/AssessmentStep1";
import AssessmentStep2 from "@/components/assessment/AssessmentStep2";
import AssessmentStep3 from "@/components/assessment/AssessmentStep3";
import AssessmentResults from "@/components/assessment/AssessmentResults";
import { AssessmentAnswers } from "@/types/assessment";
import { calculateAssessmentResult } from "@/lib/assessment-logic";

const SmartAssessment = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    multipleIntelligence: {},
    personality: {},
    technical: {}
  });
  const [result, setResult] = useState(null);

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  const handleMultipleIntelligenceAnswer = (questionId: number, value: number) => {
    setAnswers(prev => ({
      ...prev,
      multipleIntelligence: {
        ...prev.multipleIntelligence,
        [questionId]: value
      }
    }));
  };

  const handlePersonalityAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      personality: {
        ...prev.personality,
        [questionId]: value
      }
    }));
  };

  const handleTechnicalAnswer = (questionId: number, value: string) => {
    setAnswers(prev => ({
      ...prev,
      technical: {
        ...prev.technical,
        [questionId]: value
      }
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return Object.keys(answers.multipleIntelligence).length === 15;
      case 2:
        return Object.keys(answers.personality).length === 8;
      case 3:
        return Object.keys(answers.technical).length >= 5;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate and show results
      const assessmentResult = calculateAssessmentResult(answers);
      setResult(assessmentResult);
      setCurrentStep(4);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <AssessmentStep1
            answers={answers.multipleIntelligence}
            onAnswerChange={handleMultipleIntelligenceAnswer}
          />
        );
      case 2:
        return (
          <AssessmentStep2
            answers={answers.personality}
            onAnswerChange={handlePersonalityAnswer}
          />
        );
      case 3:
        return (
          <AssessmentStep3
            answers={answers.technical}
            onAnswerChange={handleTechnicalAnswer}
          />
        );
      case 4:
        return result ? <AssessmentResults result={result} /> : null;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Brain className="h-10 w-10 text-blue-500" />
                <h1 className="text-4xl font-bold">Smart Child Assessment</h1>
              </div>
              <p className="text-xl text-gray-600">
                Discover the perfect tech course for your child based on their unique strengths and interests
              </p>
            </div>

            {/* Progress Bar */}
            {currentStep <= totalSteps && (
              <div className="mb-8">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep} of {totalSteps}</span>
                  <span>{Math.round(progress)}% Complete</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Content */}
            <div className="mb-8">
              {renderStep()}
            </div>

            {/* Navigation */}
            {currentStep <= totalSteps && (
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                
                <Button
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {currentStep === totalSteps ? 'Get Results' : 'Next'}
                  {currentStep < totalSteps && <ChevronRight className="h-4 w-4 ml-2" />}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SmartAssessment;
