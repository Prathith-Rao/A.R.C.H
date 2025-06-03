
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SplashScreen from "./components/SplashScreen";
import Auth from "./pages/Auth";
import Details from "./pages/Details";
import Admin from "./pages/Admin";
import Explore from "./pages/Explore";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

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
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/splash" element={<SplashScreen />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
