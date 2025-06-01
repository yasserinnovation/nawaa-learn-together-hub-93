
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { technicalQuestions } from "@/lib/assessment-data";

interface AssessmentStep3Props {
  answers: Record<number, string>;
  onAnswerChange: (questionId: number, value: string) => void;
}

const AssessmentStep3 = ({ answers, onAnswerChange }: AssessmentStep3Props) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Technical Inclinations and Project Preferences</h2>
        <p className="text-gray-600">Please provide detailed answers to help us understand your interests</p>
      </div>

      {technicalQuestions.map((question) => (
        <Card key={question.id}>
          <CardHeader>
            <CardTitle className="text-lg">{question.id}. {question.text}</CardTitle>
          </CardHeader>
          <CardContent>
            {question.type === 'textarea' ? (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) => onAnswerChange(question.id, e.target.value)}
                placeholder="Type your answer here..."
                className="min-h-[100px]"
              />
            ) : (
              <Select
                value={answers[question.id] || ""}
                onValueChange={(value) => onAnswerChange(question.id, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {question.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AssessmentStep3;
