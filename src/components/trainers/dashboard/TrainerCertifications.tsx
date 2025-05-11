
import { Trainer } from "@/types/trainer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Upload, Plus, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrainerCertificationsProps {
  trainer: Trainer;
}

const TrainerCertifications = ({ trainer }: TrainerCertificationsProps) => {
  const certifications = trainer.certifications || [];
  const isNawaaCertified = trainer.isNawaaCertified;
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Certifications</h2>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Certification
        </Button>
      </div>
      
      <Card className={`border-2 ${isNawaaCertified ? 'border-blue-500' : 'border-gray-200'}`}>
        <CardHeader className={`${isNawaaCertified ? 'bg-blue-50' : 'bg-gray-50'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className={`rounded-full p-2 ${isNawaaCertified ? 'bg-blue-100' : 'bg-gray-200'} mr-3`}>
                <Award className={`h-6 w-6 ${isNawaaCertified ? 'text-blue-600' : 'text-gray-400'}`} />
              </div>
              <div>
                <CardTitle>Nawaa Certified Trainer</CardTitle>
                <CardDescription>Complete all required modules to earn your certification</CardDescription>
              </div>
            </div>
            {isNawaaCertified && (
              <Badge className="bg-blue-500">Certified</Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="py-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
                <div className="bg-green-100 rounded-full p-1 mr-3">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Child Development Basics</h3>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              
              <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
                <div className="bg-green-100 rounded-full p-1 mr-3">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Classroom Management</h3>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              
              <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
                <div className="bg-green-100 rounded-full p-1 mr-3">
                  <Award className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium">Ethical Teaching Practices</h3>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
              
              <div className="flex items-center bg-gray-50 border border-gray-200 rounded-md p-3">
                <div className="bg-gray-200 rounded-full p-1 mr-3">
                  <Award className="h-4 w-4 text-gray-500" />
                </div>
                <div>
                  <h3 className="font-medium">Project-Based Teaching Methods</h3>
                  <p className="text-xs text-gray-500">Not started</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button className="w-full sm:w-auto">
                {isNawaaCertified ? "View Certificate" : "Start Next Module"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h3 className="text-xl font-medium mt-8 mb-4">External Certifications</h3>
      
      {certifications.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {certifications.map((cert, index) => (
            <Card key={index}>
              <CardContent className="p-4 flex items-start gap-3">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Award className="h-5 w-5 text-yellow-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{cert}</h3>
                  <div className="flex justify-between mt-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
                      <ExternalLink className="h-3 w-3" />
                      View Certificate
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8 text-center">
            <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-medium text-lg">No external certifications added</h3>
            <p className="text-gray-500 mt-2 mb-4">
              Add your professional certifications to showcase your qualifications.
            </p>
            <Button className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Certification
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TrainerCertifications;
