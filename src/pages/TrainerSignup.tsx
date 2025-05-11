
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { X, Plus, Upload, User, MapPin, Languages, Users, Calendar, Award, Check } from "lucide-react";

const TrainerSignup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    imageUrl: "",
    bio: "",
    languages: [] as string[],
    expertise: [] as string[],
    ageGroups: [] as string[],
    availability: [] as string[],
    gender: "",
    teachingStyle: "",
    agreeToTerms: false
  });
  
  const availableLanguages = ["Arabic", "English", "French", "Spanish", "Chinese"];
  const availableExpertise = [
    "Robotics", "3D Printing", "Coding for Kids", "AI for Kids", 
    "Electronics", "Arduino", "LEGO Robotics", "Game Development",
    "Digital Art", "Web Design", "Mobile App Development"
  ];
  const availableAgeGroups = ["4-6", "7-9", "10-12", "13-16", "17+"];
  const availableDays = ["Weekdays", "Weekends", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const availableTimes = ["Morning", "Afternoon", "Evening", "Flexible"];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleArrayItemToggle = (array: string, item: string) => {
    setFormData(prev => {
      const currentArray = [...(prev[array as keyof typeof prev] as string[])];
      
      if (currentArray.includes(item)) {
        return { ...prev, [array]: currentArray.filter(i => i !== item) };
      } else {
        return { ...prev, [array]: [...currentArray, item] };
      }
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.location) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      // This would be an API call in a real app
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Trainer profile created successfully!");
      navigate("/trainer-dashboard");
    } catch (error) {
      console.error("Error creating trainer profile:", error);
      toast.error("Failed to create trainer profile");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const isNextDisabled = () => {
    if (currentStep === "personal") {
      return !formData.name || !formData.email || !formData.phone || !formData.location || !formData.gender;
    } else if (currentStep === "expertise") {
      return formData.languages.length === 0 || formData.expertise.length === 0 || formData.ageGroups.length === 0;
    }
    return false;
  };
  
  return (
    <Layout>
      <div className="container max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">Become a Nawaa Trainer</h1>
          <p className="mt-2 text-gray-600">Share your knowledge and inspire the next generation of makers and innovators</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create Your Trainer Profile</CardTitle>
            <CardDescription>
              Fill out the form below to create your professional teaching profile
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Tabs value={currentStep} onValueChange={setCurrentStep}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="personal">
                  <span className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">Personal Information</span>
                    <span className="sm:hidden">Personal</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="expertise">
                  <span className="flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    <span className="hidden sm:inline">Expertise & Languages</span>
                    <span className="sm:hidden">Expertise</span>
                  </span>
                </TabsTrigger>
                <TabsTrigger value="availability">
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="hidden sm:inline">Bio & Availability</span>
                    <span className="sm:hidden">Availability</span>
                  </span>
                </TabsTrigger>
              </TabsList>
              
              <form onSubmit={handleSubmit}>
                <TabsContent value="personal" className="space-y-4">
                  <div className="mb-6">
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300">
                          {formData.imageUrl ? (
                            <img 
                              src={formData.imageUrl}
                              alt="Profile preview" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-16 w-16 text-gray-400" />
                          )}
                        </div>
                        <Button 
                          type="button" 
                          size="sm" 
                          className="absolute bottom-0 right-0 rounded-full"
                          onClick={() => {
                            // In a real app, this would open a file picker
                            const url = prompt("Enter image URL (in a real app, this would be a file upload):");
                            if (url) setFormData(prev => ({ ...prev, imageUrl: url }));
                          }}
                        >
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-center text-sm text-gray-500 mt-2">Upload a professional profile photo</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Sara Al-Dosari"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gender">Gender <span className="text-red-500">*</span></Label>
                      <Select 
                        value={formData.gender} 
                        onValueChange={(value) => handleSelectChange("gender", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Female">Female</SelectItem>
                          <SelectItem value="Male">Male</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        placeholder="sara@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Mobile Number <span className="text-red-500">*</span></Label>
                      <Input 
                        id="phone"
                        name="phone"
                        placeholder="+966 55 123 4567"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Location <span className="text-red-500">*</span></Label>
                    <Select 
                      value={formData.location} 
                      onValueChange={(value) => handleSelectChange("location", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Riyadh">Riyadh</SelectItem>
                        <SelectItem value="Jeddah">Jeddah</SelectItem>
                        <SelectItem value="Dammam">Dammam</SelectItem>
                        <SelectItem value="Mecca">Mecca</SelectItem>
                        <SelectItem value="Medina">Medina</SelectItem>
                        <SelectItem value="Khobar">Khobar</SelectItem>
                        <SelectItem value="Abha">Abha</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-end mt-6">
                    <Button 
                      type="button" 
                      onClick={() => setCurrentStep("expertise")} 
                      disabled={isNextDisabled()}
                    >
                      Next Step
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="expertise" className="space-y-6">
                  <div>
                    <div className="flex items-center mb-3">
                      <Languages className="h-5 w-5 text-yellow-500 mr-2" />
                      <Label className="text-lg">Languages You Speak</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableLanguages.map(language => (
                        <Badge 
                          key={language}
                          variant={formData.languages.includes(language) ? "default" : "outline"} 
                          className={`cursor-pointer ${formData.languages.includes(language) ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                          onClick={() => handleArrayItemToggle("languages", language)}
                        >
                          {language}
                          {formData.languages.includes(language) && (
                            <Check className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Award className="h-5 w-5 text-yellow-500 mr-2" />
                      <Label className="text-lg">Areas of Expertise</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableExpertise.map(skill => (
                        <Badge 
                          key={skill}
                          variant={formData.expertise.includes(skill) ? "default" : "outline"}
                          className={`cursor-pointer ${formData.expertise.includes(skill) ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                          onClick={() => handleArrayItemToggle("expertise", skill)}
                        >
                          {skill}
                          {formData.expertise.includes(skill) && (
                            <Check className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Users className="h-5 w-5 text-yellow-500 mr-2" />
                      <Label className="text-lg">Age Groups You Teach</Label>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {availableAgeGroups.map(age => (
                        <Badge 
                          key={age}
                          variant={formData.ageGroups.includes(age) ? "default" : "outline"}
                          className={`cursor-pointer ${formData.ageGroups.includes(age) ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                          onClick={() => handleArrayItemToggle("ageGroups", age)}
                        >
                          {age} years
                          {formData.ageGroups.includes(age) && (
                            <Check className="ml-1 h-3 w-3" />
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentStep("personal")} 
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      onClick={() => setCurrentStep("availability")} 
                      disabled={isNextDisabled()}
                    >
                      Next Step
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="availability" className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio & Teaching Style</Label>
                    <Textarea 
                      id="bio"
                      name="bio"
                      placeholder="Tell us about yourself and your teaching approach..."
                      value={formData.bio}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-3">
                      <Calendar className="h-5 w-5 text-yellow-500 mr-2" />
                      <Label className="text-lg">Availability</Label>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm text-gray-500 mb-2 block">Days</Label>
                        <div className="flex flex-wrap gap-2">
                          {availableDays.map(day => (
                            <Badge 
                              key={day}
                              variant={formData.availability.includes(day) ? "default" : "outline"}
                              className={`cursor-pointer ${formData.availability.includes(day) ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                              onClick={() => handleArrayItemToggle("availability", day)}
                            >
                              {day}
                              {formData.availability.includes(day) && (
                                <Check className="ml-1 h-3 w-3" />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm text-gray-500 mb-2 block">Times</Label>
                        <div className="flex flex-wrap gap-2">
                          {availableTimes.map(time => (
                            <Badge 
                              key={time}
                              variant={formData.availability.includes(time) ? "default" : "outline"}
                              className={`cursor-pointer ${formData.availability.includes(time) ? 'bg-yellow-500 hover:bg-yellow-600' : ''}`}
                              onClick={() => handleArrayItemToggle("availability", time)}
                            >
                              {time}
                              {formData.availability.includes(time) && (
                                <Check className="ml-1 h-3 w-3" />
                              )}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox 
                      id="terms" 
                      checked={formData.agreeToTerms}
                      onCheckedChange={(checked) => setFormData(prev => ({ 
                        ...prev, 
                        agreeToTerms: checked === true 
                      }))}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the Nawaa Terms and Conditions for Trainers
                    </Label>
                  </div>
                  
                  <div className="flex justify-between mt-6">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setCurrentStep("expertise")} 
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting || !formData.agreeToTerms}
                    >
                      {isSubmitting ? "Submitting..." : "Create Profile"}
                    </Button>
                  </div>
                </TabsContent>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default TrainerSignup;
