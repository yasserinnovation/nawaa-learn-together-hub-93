
import { GraduationCap, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const TrainersHero = () => {
  return (
    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Find Expert Tech Trainers
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8">
            Connect with verified trainers specializing in robotics, coding, 3D design, and more.
            Find the perfect match for your learning journey.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <GraduationCap className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Expert Educators</h3>
              <p className="text-gray-600">
                All trainers are verified experts with specialized technical knowledge and teaching experience.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <Users className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Age-Appropriate Teaching</h3>
              <p className="text-gray-600">
                Find trainers who specialize in teaching specific age groups with appropriate methods.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-3">
                <Award className="h-10 w-10 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Rated & Reviewed</h3>
              <p className="text-gray-600">
                Make confident choices based on reviews from parents and learners who've worked with each trainer.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Button className="bg-yellow-500 hover:bg-yellow-600">
              Explore All Trainers
            </Button>
            <Button variant="outline">
              Get AI Recommendations
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainersHero;
