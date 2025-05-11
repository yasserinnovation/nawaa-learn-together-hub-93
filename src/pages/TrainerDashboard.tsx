
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  User,
  Award,
  Calendar,
  MapPin,
  Star,
  Languages,
  Users,
  DollarSign,
  Bell,
  Briefcase,
  GraduationCap,
  Clock,
  Shield,
  Upload,
  FileText,
  PlusCircle
} from "lucide-react";
import { Trainer, TrainerTab } from "@/types/trainer";
import TrainerProfile from "@/components/trainers/dashboard/TrainerProfile";
import TrainerPortfolio from "@/components/trainers/dashboard/TrainerPortfolio";
import TrainerCertifications from "@/components/trainers/dashboard/TrainerCertifications";
import TrainerCalendar from "@/components/trainers/dashboard/TrainerCalendar";
import TrainerIncome from "@/components/trainers/dashboard/TrainerIncome";
import TrainerTraining from "@/components/trainers/dashboard/TrainerTraining";

// Mock data for the current logged-in trainer
const mockTrainer: Trainer = {
  id: "current-user",
  name: "Sara Al-Dosari",
  location: "Jeddah",
  languages: ["Arabic", "English"],
  expertise: ["3D Printing", "Arduino", "Coding for Kids"],
  gender: "Female",
  rating: 4.7,
  imageUrl: "https://images.unsplash.com/photo-1632333650977-4045fb3bee33?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
  experience: 3,
  specialties: ["Teaching programming to children", "Arduino projects", "3D modeling"],
  availability: ["Weekends", "Evenings"],
  bio: "Passionate about making technology accessible to young minds. I believe in hands-on learning through creative projects that spark curiosity and problem-solving skills.",
  ageGroups: ["7-9", "10-12", "13-16"],
  reviewCount: 28,
  hasCertifications: true,
  email: "sara.aldosari@example.com",
  phone: "+966 55 123 4567",
  isVerified: true,
  isNawaaCertified: true,
  teachingStyle: "Project-based learning with emphasis on creativity and collaboration",
  certifications: [
    "T4EDU Certified Trainer",
    "STEM.org Certified Educator",
    "Arduino Education Certificate"
  ],
  completedTrainings: [
    {
      id: "t1",
      title: "Child Development Basics",
      description: "Understanding cognitive stages and attention spans in different age groups",
      completedAt: "2023-09-15",
      certificateUrl: "/certificates/child-development.pdf",
      category: "child-development"
    },
    {
      id: "t2",
      title: "Classroom Management",
      description: "Techniques for managing groups of children effectively and respectfully",
      completedAt: "2023-10-02",
      certificateUrl: "/certificates/classroom-management.pdf",
      category: "classroom-management"
    },
    {
      id: "t3",
      title: "Ethical Teaching Practices",
      description: "Guidelines for maintaining boundaries, inclusivity, and safety",
      completedAt: "2023-11-10",
      certificateUrl: "/certificates/ethical-teaching.pdf",
      category: "ethics"
    }
  ],
  portfolioItems: [
    {
      id: "p1",
      title: "Arduino Workshop for Kids",
      description: "A 3-day workshop teaching basic electronics and programming with Arduino",
      imageUrl: "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      type: "image",
      date: "2023-06-25"
    },
    {
      id: "p2",
      title: "3D Printing Summer Camp",
      description: "Summer program teaching 3D modeling and printing to elementary school students",
      imageUrl: "https://images.unsplash.com/photo-1581092335397-9fa341108550?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80",
      type: "image",
      date: "2023-07-15"
    }
  ],
  bookings: [
    {
      id: "b1",
      courseName: "Introduction to Arduino",
      date: "2023-12-10",
      timeSlot: "10:00 AM - 12:00 PM",
      status: "confirmed",
      studentCount: 8,
      location: "Innovation Hub, Jeddah"
    },
    {
      id: "b2",
      courseName: "3D Modeling for Kids",
      date: "2023-12-17",
      timeSlot: "4:00 PM - 6:00 PM",
      status: "pending",
      studentCount: 6,
      location: "MakerSpace, Jeddah"
    }
  ],
  income: {
    totalEarned: 12500,
    pendingPayments: 1500,
    lastMonthEarnings: 3200,
    bookingsByMonth: [
      { month: "Aug", amount: 2800 },
      { month: "Sep", amount: 3000 },
      { month: "Oct", amount: 3500 },
      { month: "Nov", amount: 3200 }
    ]
  }
};

const TrainerDashboard = () => {
  const [activeTab, setActiveTab] = useState<TrainerTab>("profile");
  const trainer = mockTrainer; // In a real app, this would come from context/state
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 h-32"></div>
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row md:items-end">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white overflow-hidden mt-[-4rem] bg-white">
                <img 
                  src={trainer.imageUrl} 
                  alt={trainer.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 pb-2 flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-3xl font-bold">{trainer.name}</h1>
                    {trainer.isNawaaCertified && (
                      <Badge className="bg-blue-500 hover:bg-blue-600 flex items-center gap-1">
                        <Award className="w-3 h-3" /> Nawaa Certified
                      </Badge>
                    )}
                    {trainer.isVerified && (
                      <Badge className="bg-green-500 hover:bg-green-600 flex items-center gap-1">
                        <Shield className="w-3 h-3" /> Verified
                      </Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{trainer.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>{trainer.rating} ({trainer.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-1" />
                      <span>{trainer.experience} years experience</span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button className="bg-yellow-500 hover:bg-yellow-600 flex items-center gap-2">
                    <PlusCircle className="w-4 h-4" />
                    Add New Course
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dashboard</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <nav className="space-y-1">
                  <Button 
                    variant={activeTab === "profile" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Button>
                  <Button 
                    variant={activeTab === "portfolio" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("portfolio")}
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Portfolio
                  </Button>
                  <Button 
                    variant={activeTab === "certifications" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("certifications")}
                  >
                    <Award className="mr-2 h-4 w-4" />
                    Certifications
                  </Button>
                  <Button 
                    variant={activeTab === "calendar" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("calendar")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Calendar & Bookings
                  </Button>
                  <Button 
                    variant={activeTab === "income" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("income")}
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Income
                  </Button>
                  <Button 
                    variant={activeTab === "training" ? "default" : "ghost"} 
                    className="w-full justify-start" 
                    onClick={() => setActiveTab("training")}
                  >
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Training & Development
                  </Button>
                </nav>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Bell className="h-4 w-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">New booking request</p>
                      <p className="text-xs text-gray-500">10 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-2 rounded-full">
                      <Users className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">2 new reviews received</p>
                      <p className="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 p-2 rounded-full">
                      <GraduationCap className="h-4 w-4 text-yellow-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Training module available</p>
                      <p className="text-xs text-gray-500">Yesterday</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-3">
            {activeTab === "profile" && <TrainerProfile trainer={trainer} />}
            {activeTab === "portfolio" && <TrainerPortfolio trainer={trainer} />}
            {activeTab === "certifications" && <TrainerCertifications trainer={trainer} />}
            {activeTab === "calendar" && <TrainerCalendar trainer={trainer} />}
            {activeTab === "income" && <TrainerIncome trainer={trainer} />}
            {activeTab === "training" && <TrainerTraining trainer={trainer} />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrainerDashboard;
