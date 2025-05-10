
import { useParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { 
  User, 
  MapPin, 
  Star, 
  Calendar, 
  Award, 
  Languages, 
  Users, 
  Clock,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trainer } from "@/types/trainer";

// Mock data for trainers (same as in TrainersList.tsx)
const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Fatima Al-Zahrani",
    location: "Riyadh",
    languages: ["Arabic", "English"],
    expertise: ["Robotics", "Electronics"],
    gender: "Female",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1622157927377-33109340d2a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 5,
    specialties: ["Teaching girls aged 8-12", "Robotics competitions"],
    availability: ["Weekends", "Evenings"],
    bio: "Specialized in teaching STEM to young girls, with a focus on making robotics accessible and engaging. Holds a Master's in Computer Engineering and has led teams to regional championships.",
    ageGroups: ["7-9", "10-12"],
    reviewCount: 87,
    hasCertifications: true
  },
  {
    id: "2",
    name: "Ahmed Al-Dosari",
    location: "Jeddah",
    languages: ["Arabic", "English"],
    expertise: ["3D Printing", "Coding for Kids"],
    gender: "Male",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1612883600377-617235130904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 4,
    specialties: ["Game development", "Creative coding"],
    availability: ["Weekdays", "Mornings"],
    bio: "Former software developer who now dedicates his time to teaching children coding through game development. Created several educational coding platforms used in schools across Saudi Arabia.",
    ageGroups: ["10-12", "13-16"],
    reviewCount: 62,
    hasCertifications: true
  },
  {
    id: "3",
    name: "Norah Al-Qahtani",
    location: "Dammam",
    languages: ["Arabic", "English", "French"],
    expertise: ["AI for Kids", "Electronics"],
    gender: "Female",
    rating: 4.9,
    imageUrl: "https://images.unsplash.com/photo-1632333650977-4045fb3bee33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 7,
    specialties: ["AI ethics for children", "Interactive learning"],
    availability: ["Flexible", "Online sessions"],
    bio: "PhD in Computer Science with specialization in AI. Passionate about teaching children the fundamentals of AI and ethics in technology. Has developed curriculum for several international schools.",
    ageGroups: ["10-12", "13-16", "17+"],
    reviewCount: 119,
    hasCertifications: true
  },
  {
    id: "4",
    name: "Mohammad Al-Harbi",
    location: "Riyadh",
    languages: ["Arabic", "English"],
    expertise: ["Robotics", "Coding for Kids"],
    gender: "Male",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1567608198472-6796a293aead?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
    experience: 3,
    specialties: ["Arduino projects", "Beginner programming"],
    availability: ["Weekdays", "Afternoons"],
    bio: "Electrical engineering graduate with a passion for teaching robotics to beginners. Specializes in making complex concepts accessible to young learners through hands-on projects.",
    ageGroups: ["7-9", "10-12"],
    reviewCount: 45,
    hasCertifications: false
  }
];

// Mock reviews
const mockReviews = [
  {
    id: 1,
    trainerId: "1",
    name: "Sara K.",
    rating: 5,
    date: "2023-08-15",
    comment: "My daughter loved learning robotics with Fatima. She made complex concepts easy to understand and fun to learn.",
    course: "Introduction to Robotics"
  },
  {
    id: 2,
    trainerId: "1",
    name: "Mohammed A.",
    rating: 4,
    date: "2023-07-22",
    comment: "Great teaching style, very patient with the children. Would definitely recommend for beginners.",
    course: "Electronics for Kids"
  },
  {
    id: 3,
    trainerId: "1",
    name: "Layla M.",
    rating: 5,
    date: "2023-06-10",
    comment: "Fatima is an exceptional teacher. My 10-year-old daughter was initially intimidated by robotics, but Fatima's approach made it accessible and enjoyable.",
    course: "Robotics Competition Prep"
  }
];

const TrainerProfile = () => {
  const { id } = useParams<{ id: string }>();
  const trainer = mockTrainers.find(t => t.id === id);
  const trainerReviews = mockReviews.filter(review => review.trainerId === id);
  
  if (!trainer) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl font-bold">Trainer not found</h2>
          <p className="mt-4">The trainer you are looking for does not exist.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trainer Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-24">
              <div className="relative">
                <img 
                  src={trainer.imageUrl} 
                  alt={trainer.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                  <Star className="h-4 w-4 mr-1" /> {trainer.rating.toFixed(1)} ({trainer.reviewCount} reviews)
                </div>
              </div>
              
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-2">{trainer.name}</h1>
                
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{trainer.location}</span>
                  <span className="mx-2">•</span>
                  <span>{trainer.experience} years experience</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Expertise</h3>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {trainer.expertise.map(skill => (
                          <Badge key={skill} variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Age Groups</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {trainer.ageGroups.join(", ")} years
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Languages className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Languages</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {trainer.languages.join(", ")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Availability</h3>
                      <p className="text-gray-600 text-sm mt-1">
                        {trainer.availability.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                    Add to Bundle
                  </Button>
                  <Button variant="outline" className="w-full">
                    Contact Trainer
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="calendar">Calendar</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <Card>
                  <CardHeader>
                    <CardTitle>About {trainer.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Bio</h3>
                        <p className="text-gray-700">{trainer.bio}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Specialties</h3>
                        <ul className="list-disc pl-5 space-y-1 text-gray-700">
                          {trainer.specialties.map((specialty, index) => (
                            <li key={index}>{specialty}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Certifications</h3>
                        {trainer.hasCertifications ? (
                          <div className="flex flex-wrap gap-3">
                            <div className="border rounded-md p-3 flex items-center gap-2 bg-blue-50">
                              <Award className="h-5 w-5 text-blue-500" />
                              <span>STEM.org Certified Educator</span>
                            </div>
                            <div className="border rounded-md p-3 flex items-center gap-2 bg-blue-50">
                              <Award className="h-5 w-5 text-blue-500" />
                              <span>T4EDU Trainer</span>
                            </div>
                          </div>
                        ) : (
                          <p className="text-gray-500">No certifications listed</p>
                        )}
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Teaching Approach</h3>
                        <p className="text-gray-700">
                          {trainer.name} specializes in hands-on, project-based learning that emphasizes 
                          practical application and creative problem-solving. {trainer.gender === "Female" ? "She" : "He"} 
                          creates an inclusive learning environment where students feel comfortable asking questions
                          and exploring new concepts at their own pace.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {trainerReviews.length > 0 ? (
                        trainerReviews.map(review => (
                          <div key={review.id} className="border-b pb-6 last:border-b-0">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-medium">{review.name}</h3>
                                <p className="text-sm text-gray-500">{review.date}</p>
                                <p className="text-sm text-gray-500">Course: {review.course}</p>
                              </div>
                              <div className="flex items-center bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                                <Star className="h-4 w-4 mr-1 fill-yellow-500 text-yellow-500" />
                                <span>{review.rating}/5</span>
                              </div>
                            </div>
                            <p className="mt-2 text-gray-700">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No reviews available yet.</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Courses</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                          <h3 className="font-semibold text-lg">Introduction to Robotics</h3>
                          <Badge>Popular</Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">Ages: 8-12 • 6 sessions • Arabic/English</p>
                        <p className="mt-2">A beginner-friendly introduction to robotics using LEGO EV3 kits. Students will learn basic programming concepts and build their first working robot.</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-medium">SAR 850</span>
                          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">Add to Bundle</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg">Electronics for Beginners</h3>
                        <p className="text-sm text-gray-600 mt-1">Ages: 10-14 • 4 sessions • Arabic</p>
                        <p className="mt-2">Learn the fundamentals of electronic circuits with hands-on projects including LED lights, buzzers, and sensors.</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-medium">SAR 650</span>
                          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">Add to Bundle</Button>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold text-lg">Robotics Competition Prep</h3>
                        <p className="text-sm text-gray-600 mt-1">Ages: 12-16 • 8 sessions • Arabic/English</p>
                        <p className="mt-2">Prepare for regional robotics competitions with advanced techniques, strategy development, and team collaboration.</p>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="font-medium">SAR 1200</span>
                          <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">Add to Bundle</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="calendar">
                <Card>
                  <CardHeader>
                    <CardTitle>Availability Calendar</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-8 border rounded-md bg-gray-50">
                      <Clock className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium mb-2">Calendar Booking</h3>
                      <p className="text-gray-500 mb-4">
                        To view detailed availability and book specific time slots, please add this trainer to your bundle or contact them directly.
                      </p>
                      <Button className="bg-yellow-500 hover:bg-yellow-600">Add to Bundle</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerProfile;
