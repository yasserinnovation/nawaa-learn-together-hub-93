
import { Trainer, TrainerTraining } from "@/types/trainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GraduationCap, Book, Clock, CheckCircle, PlayCircle, FileText, Award } from "lucide-react";

interface TrainerTrainingProps {
  trainer: Trainer;
}

const TrainerTraining = ({ trainer }: TrainerTrainingProps) => {
  const completedTrainings = trainer.completedTrainings || [];
  
  // Calculate progression
  const totalModules = 5; // Total number of Nawaa modules
  const completedModules = completedTrainings.length;
  const progressPercentage = (completedModules / totalModules) * 100;
  
  const getTrainingCategoryIcon = (category: string) => {
    switch (category) {
      case 'child-development':
        return <Users className="h-5 w-5 text-blue-500" />;
      case 'classroom-management':
        return <Users className="h-5 w-5 text-green-500" />;
      case 'communication':
        return <MessageCircle className="h-5 w-5 text-purple-500" />;
      case 'ethics':
        return <Shield className="h-5 w-5 text-red-500" />;
      case 'teaching-methods':
        return <BookOpen className="h-5 w-5 text-yellow-500" />;
      default:
        return <Book className="h-5 w-5 text-gray-500" />;
    }
  };
  
  const upcomingModules = [
    {
      id: 'tm1',
      title: 'Communication & Empathy',
      description: 'Learn effective communication techniques for young learners',
      category: 'communication',
      duration: '2 hours'
    },
    {
      id: 'tm2',
      title: 'Project-Based Teaching Methods',
      description: 'Design engaging tech projects for different age groups',
      category: 'teaching-methods',
      duration: '3 hours'
    }
  ];
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Training & Development</h2>
      
      <Card>
        <CardHeader>
          <CardTitle>Nawaa Certification Progress</CardTitle>
          <CardDescription>Complete all modules to become a Nawaa Certified Trainer</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-2 flex justify-between text-sm">
            <span>{completedModules} of {totalModules} modules completed</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-3" />
          
          <div className="mt-6 grid grid-cols-5 gap-2">
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${completedTrainings.some(t => t.category === 'child-development') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${completedTrainings.some(t => t.category === 'classroom-management') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${completedTrainings.some(t => t.category === 'communication') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${completedTrainings.some(t => t.category === 'ethics') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
            <div className={`rounded-full h-10 w-10 flex items-center justify-center ${completedTrainings.some(t => t.category === 'teaching-methods') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
              <CheckCircle className="h-5 w-5" />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Modules</CardTitle>
            <CardDescription>Complete these to earn your certification</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingModules.map(module => (
              <div key={module.id} className="mb-4 last:mb-0">
                <div className="border rounded-md p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-blue-50 rounded-md">
                      <PlayCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{module.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">{module.description}</p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        <span>{module.duration}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Button size="sm" className="w-full">Start Module</Button>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Completed Trainings</CardTitle>
            <CardDescription>Modules you have successfully completed</CardDescription>
          </CardHeader>
          <CardContent>
            {completedTrainings.length > 0 ? (
              <div className="space-y-4">
                {completedTrainings.map(training => (
                  <div key={training.id} className="border rounded-md p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-50 rounded-md">
                        <Award className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="font-medium">{training.title}</h3>
                          <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">Completed</Badge>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{training.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <Calendar className="h-3 w-3 mr-1" />
                          <span>Completed on {new Date(training.completedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <Button variant="outline" size="sm" className="text-sm flex items-center">
                        <FileText className="h-3 w-3 mr-1" />
                        View Certificate
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <GraduationCap className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="font-medium">No completed trainings yet</h3>
                <p className="text-gray-500 mt-2">
                  Start with the upcoming modules to build your expertise.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Import missing icons
import { Users, MessageCircle, Shield, BookOpen, Calendar } from "lucide-react";

export default TrainerTraining;
