
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import DiscoverSpaces from "./pages/DiscoverSpaces";
import Courses from "./pages/Courses";
import AccessTools from "./pages/AccessTools";
import BuildBundle from "./pages/BuildBundle";
import FindTrainers from "./pages/FindTrainers";
import TrainerProfile from "./pages/TrainerProfile";
import ShareYourSpace from "./pages/ShareYourSpace";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/discover-spaces" element={<DiscoverSpaces />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/access-tools" element={<AccessTools />} />
          <Route path="/build-bundle" element={<BuildBundle />} />
          <Route path="/find-trainers" element={<FindTrainers />} />
          <Route path="/trainers/:id" element={<TrainerProfile />} />
          <Route path="/share-your-space" element={<ShareYourSpace />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
