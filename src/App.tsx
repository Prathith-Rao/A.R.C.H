
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import Auth from "./pages/Auth";
import Explore from "./pages/Explore";
import Details from "./pages/Details";

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if this is the first visit
    const hasVisited = localStorage.getItem("has_visited_arch");
    if (hasVisited) {
      setIsFirstVisit(false);
      setShowSplash(false);
    } else {
      localStorage.setItem("has_visited_arch", "true");
      // Show splash screen for 3 seconds for first-time visitors
      setTimeout(() => {
        setShowSplash(false);
      }, 3000);
    }
  }, []);

  // Show splash screen for first-time visitors
  if (isFirstVisit && showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen bg-arch">
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/details/:category/:id" element={<Details />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </div>
  );
};

export default App;
