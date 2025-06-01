
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { multipleIntelligenceQuestions } from "@/lib/assessment-data";

interface AssessmentStep1Props {
  answers: Record<number, number>;
  onAnswerChange: (questionId: number, value: number) => void;
}

const AssessmentStep1 = ({ answers, onAnswerChange }: AssessmentStep1Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Multiple Intelligences</h2>
        <p className="text-gray-600">Rate each statement from 1 (strongly disagree) to 5 (strongly agree)</p>
      </div>

      {multipleIntelligenceQuestions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-lg">{question.id}. {question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[question.id]?.toString() || ""}
              onValueChange={(value) => onAnswerChange(question.id, parseInt(value))}
            >
              <div className="flex space-x-8">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <div key={rating} className="flex items-center space-x-2">
                    <RadioGroupItem value={rating.toString()} id={`q${question.id}-${rating}`} />
                    <Label htmlFor={`q${question.id}-${rating}`} className="text-sm">
                      {rating}
                    </Label>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Strongly Disagree</span>
                <span>Strongly Agree</span>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentStep1;
