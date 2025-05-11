
import { useState } from "react";
import { Trainer } from "@/types/trainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MapPin, Languages, Users, Calendar, Award, User, Briefcase, Check } from "lucide-react";

interface TrainerProfileProps {
  trainer: Trainer;
}

const TrainerProfile = ({ trainer }: TrainerProfileProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    bio: trainer.bio || "",
    teachingStyle: trainer.teachingStyle || "",
    location: trainer.location,
    email: trainer.email || "",
    phone: trainer.phone || ""
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = () => {
    // In a real app, this would send an API request to update the profile
    toast.success("Profile updated successfully");
    setIsEditing(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Profile</h2>
        <Button 
          variant={isEditing ? "outline" : "default"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Your basic information visible to students</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="h-5 w-5 text-gray-500 mr-2" />
                <span>{trainer.location}</span>
              </div>
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-500 mr-2" />
                <span>{trainer.email}</span>
              </div>
              <div className="flex items-center">
                <Briefcase className="h-5 w-5 text-gray-500 mr-2" />
                <span>{trainer.experience} years teaching experience</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>About Me</CardTitle>
          <CardDescription>Tell students about yourself and your teaching approach</CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea 
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="teachingStyle">Teaching Style</Label>
                <Textarea 
                  id="teachingStyle"
                  name="teachingStyle"
                  value={formData.teachingStyle}
                  onChange={handleInputChange}
                  rows={3}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-gray-700">{trainer.bio}</p>
              </div>
              {trainer.teachingStyle && (
                <div>
                  <h3 className="font-medium mb-2">Teaching Style</h3>
                  <p className="text-gray-700">{trainer.teachingStyle}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Teaching Details</CardTitle>
          <CardDescription>Your expertise and teaching information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Award className="h-5 w-5 text-yellow-500 mr-2" />
                Areas of Expertise
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainer.expertise.map((skill) => (
                  <Badge key={skill} className="bg-yellow-100 text-yellow-800">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Languages className="h-5 w-5 text-yellow-500 mr-2" />
                Languages
              </h3>
              <div className="flex gap-2">
                {trainer.languages.map((language) => (
                  <Badge key={language} variant="outline">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Users className="h-5 w-5 text-yellow-500 mr-2" />
                Age Groups
              </h3>
              <div className="flex gap-2">
                {trainer.ageGroups.map((age) => (
                  <Badge key={age} variant="outline">
                    {age} years
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-3 flex items-center">
                <Calendar className="h-5 w-5 text-yellow-500 mr-2" />
                Availability
              </h3>
              <div className="flex flex-wrap gap-2">
                {trainer.availability.map((time) => (
                  <Badge key={time} variant="outline">
                    {time}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrainerProfile;
