import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DiscoverSpaces from "./pages/DiscoverSpaces";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import SmartAssessment from "./pages/SmartAssessment";
import AccessTools from "./pages/AccessTools";
import BuildBundle from "./pages/BuildBundle";
import FindTrainers from "./pages/FindTrainers";
import TrainerProfile from "./pages/TrainerProfile";
import ShareYourSpace from "./pages/ShareYourSpace";
import AddTool from "./pages/AddTool";
import TrainerSignup from "./pages/TrainerSignup";
import TrainerDashboard from "./pages/TrainerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/discover-spaces" element={<DiscoverSpaces />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/courses/:courseId" element={<CourseDetail />} />
            <Route path="/smart-assessment" element={<SmartAssessment />} />
            <Route path="/access-tools" element={<AccessTools />} />
            <Route path="/build-bundle" element={<BuildBundle />} />
            <Route path="/find-trainers" element={<FindTrainers />} />
            <Route path="/trainers/:id" element={<TrainerProfile />} />
            <Route path="/share-your-space" element={<ShareYourSpace />} />
            <Route path="/add-tool" element={<AddTool />} />
            <Route path="/trainer-signup" element={<TrainerSignup />} />
            <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
