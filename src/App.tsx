import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { lazy, Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

// Eager load critical pages
import Index from "./pages/Index";

// Lazy load other pages for better performance
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const DiscoverSpaces = lazy(() => import("./pages/DiscoverSpaces"));
const SpaceDetail = lazy(() => import("./pages/SpaceDetail"));
const Courses = lazy(() => import("./pages/Courses"));
const CourseDetail = lazy(() => import("./pages/CourseDetail"));
const SmartAssessment = lazy(() => import("./pages/SmartAssessment"));
const AccessTools = lazy(() => import("./pages/AccessTools"));
const ShareYourSpace = lazy(() => import("./pages/ShareYourSpace"));
const AddTool = lazy(() => import("./pages/AddTool"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const CompetitionsGuide = lazy(() => import("./pages/CompetitionsGuide"));
const AllSpaces = lazy(() => import("./pages/AllSpaces"));
const TrainerSignup = lazy(() => import("./pages/TrainerSignup"));
const TrainerDashboard = lazy(() => import("./pages/TrainerDashboard"));
const Auth = lazy(() => import("./pages/Auth"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Suspense fallback={<LoadingSpinner />}>
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
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/auth/verify-email" element={<VerifyEmail />} />
                  <Route path="/auth/reset-password" element={<ResetPassword />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/competitions-guide" element={<CompetitionsGuide />} />
                  <Route path="/all-spaces" element={<AllSpaces />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;