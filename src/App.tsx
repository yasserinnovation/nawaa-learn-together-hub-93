import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DiscoverSpaces from "./pages/DiscoverSpaces";
import SpaceDetail from "./pages/SpaceDetail";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import SmartAssessment from "./pages/SmartAssessment";
import AccessTools from "./pages/AccessTools";
import ShareYourSpace from "./pages/ShareYourSpace";
import AddTool from "./pages/AddTool";
import AdminDashboard from "./pages/AdminDashboard";
import CompetitionsGuide from "./pages/CompetitionsGuide";
import TrainerSignup from "./pages/TrainerSignup";
import TrainerDashboard from "./pages/TrainerDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/discover-spaces" element={<DiscoverSpaces />} />
              <Route path="/spaces/:spaceId" element={<SpaceDetail />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetail />} />
              <Route path="/smart-assessment" element={<SmartAssessment />} />
              <Route path="/access-tools" element={<AccessTools />} />
              <Route path="/share-your-space" element={<ShareYourSpace />} />
              <Route path="/add-tool" element={<AddTool />} />
              <Route path="/trainer-signup" element={<TrainerSignup />} />
              <Route path="/trainer-dashboard" element={<TrainerDashboard />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/competitions-guide" element={<CompetitionsGuide />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;