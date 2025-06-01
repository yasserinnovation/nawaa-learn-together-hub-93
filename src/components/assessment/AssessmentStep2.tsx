
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { personalityQuestions } from "@/lib/assessment-data";

interface AssessmentStep2Props {
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, value: string) => void;
}

const AssessmentStep2 = ({ answers, onAnswerChange }: AssessmentStep2Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Personality and Behavior</h2>
        <p className="text-gray-600">Choose the option that best describes the child</p>
      </div>

      {personalityQuestions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-lg">{question.id}. {question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id] || ""}
              onValueChange={(value) => onAnswerChange(question.id, value)}
            >
              {question.options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`q${question.id}-${option.value}`} 
                  />
                  <Label htmlFor={`q${question.id}-${option.value}`}>
                    ({option.value}) {option.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentStep2;
