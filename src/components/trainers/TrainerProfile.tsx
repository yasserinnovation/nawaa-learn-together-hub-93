
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Star, MapPin, Calendar, Award, Languages, Users, 
  Mail, Phone, Clock, Briefcase, GraduationCap 
} from "lucide-react";

// Mock data for a single trainer
const mockTrainer = {
  id: "1",
  name: "Ahmed Al-Farsi",
  location: "Riyadh",
  languages: ["Arabic", "English"],
  expertise: ["Robotics", "Arduino", "Electronics"],
  gender: "Male",
  rating: 4.8,
  imageUrl: "https://images.unsplash.com/photo-1612883600377-617235130904?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  experience: 5,
  specialties: ["LEGO Robotics", "Arduino Programming", "Electronics for Kids"],
  availability: ["Weekends", "Weekday Evenings"],
  bio: "With over 5 years of experience teaching technology to young learners, Ahmed specializes in making complex concepts accessible and engaging for children. His hands-on approach emphasizes creativity and problem-solving.",
  ageGroups: ["8-12", "13-16"],
  reviewCount: 42,
  hasCertifications: true,
  education: "M.S. in Computer Science, King Saud University",
  certifications: ["Certified STEM Educator", "Arduino Educator Certificate"],
  courses: [
    {
      id: "c1",
      title: "Intro to Robotics",
      description: "A beginner-friendly introduction to robotics concepts and building simple robots.",
      duration: "4 weeks",
      ageRange: "8-12 years"
    },
    {
      id: "c2",
      title: "Arduino for Young Inventors",
      description: "Learn to program Arduino boards and create interactive electronic projects.",
      duration: "6 weeks",
      ageRange: "10-14 years"
    }
  ],
  reviews: [
    {
      id: "r1",
      author: "Fatima K.",
      rating: 5,
      comment: "My son loved Ahmed's robotics class! He made complex concepts so easy to understand.",
      date: "March 15, 2023"
    },
    {
      id: "r2",
      author: "Mohammed A.",
      rating: 4,
      comment: "Great teaching style, very patient with the children. Would recommend for beginners.",
      date: "February 3, 2023"
    }
  ]
};

const TrainerProfile = () => {
  const { id } = useParams();
  const trainer = mockTrainer; // In a real app, fetch the trainer data based on the ID
  
  if (!trainer) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold">Trainer not found</h1>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Trainer Profile Content */}
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 h-40"></div>
              <div className="relative px-6 pb-6">
                <div className="flex flex-col md:flex-row md:items-end mt-[-4rem]">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden">
                    <img 
                      src={trainer.imageUrl} 
                      alt={trainer.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 pb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h1 className="text-3xl font-bold">{trainer.name}</h1>
                      {trainer.hasCertifications && (
                        <Badge className="bg-blue-500">
                          <Award className="w-3 h-3 mr-1" /> Certified
                        </Badge>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {trainer.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-yellow-500" />
                        {trainer.rating} ({trainer.reviewCount} reviews)
                      </div>
                      <div className="flex items-center">
                        <Briefcase className="w-4 h-4 mr-1" />
                        {trainer.experience} years experience
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-4 border-t">
                <h2 className="text-xl font-semibold mb-4">About</h2>
                <p className="text-gray-700">{trainer.bio}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {trainer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="bg-gray-100">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Languages</h3>
                    <div className="flex items-center gap-2">
                      <Languages className="w-4 h-4 text-gray-600" />
                      <span>{trainer.languages.join(", ")}</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Age Groups</h3>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-600" />
                      <span>{trainer.ageGroups.join(", ")} years</span>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-2">Availability</h3>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-600" />
                      <span>{trainer.availability.join(", ")}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Education & Certifications */}
              <div className="px-6 py-4 border-t">
                <h2 className="text-xl font-semibold mb-4">Education & Certifications</h2>
                <div className="mb-4">
                  <div className="flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 text-gray-600 mt-0.5" />
                    <span>{trainer.education}</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  {trainer.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Award className="w-5 h-5 text-blue-500 mt-0.5" />
                      <span>{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Courses */}
              <div className="px-6 py-4 border-t">
                <h2 className="text-xl font-semibold mb-4">Courses Offered</h2>
                <div className="space-y-4">
                  {trainer.courses.map(course => (
                    <div key={course.id} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="text-lg font-medium mb-1">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{course.description}</p>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1 text-gray-500" />
                          {course.duration}
                        </div>
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-1 text-gray-500" />
                          {course.ageRange}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="px-6 py-4 border-t">
                <h2 className="text-xl font-semibold mb-4">Reviews</h2>
                <div className="space-y-4">
                  {trainer.reviews.map(review => (
                    <div key={review.id} className="border-b border-gray-100 pb-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="font-medium">{review.author}</div>
                        <div className="flex items-center">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i}
                                className={`w-4 h-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                fill={i < review.rating ? 'currentColor' : 'none'}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500 ml-2">{review.date}</span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            {/* Contact Trainer */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Contact {trainer.name}</h2>
              <div className="space-y-3 mb-6">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" />
                  Send a Message
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Request a Call
                </Button>
              </div>
              
              <Button className="w-full bg-yellow-500 hover:bg-yellow-600">
                Book Training Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerProfile;
