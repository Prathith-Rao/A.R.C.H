
import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Index from "@/pages/Index";
import Auth from "@/pages/Auth";
import Explore from "@/pages/Explore";
import Search from "@/pages/Search";
import Profile from "@/pages/Profile";
import Favorites from "@/pages/Favorites";
import Details from "@/pages/Details";
import NotFound from "@/pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import Examples from "@/pages/Examples";
import ItemDetail from "@/pages/ItemDetail";

// Animation variants for page transitions
const pageVariants = {
  initial: {
    opacity: 0,
    x: 100,
    scale: 0.95
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    x: -100,
    scale: 0.95
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Animated page wrapper
const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

// Routes component to handle animations
const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Index /></AnimatedPage>} />
        <Route path="/auth" element={<AnimatedPage><Auth /></AnimatedPage>} />
        <Route path="/explore" element={<AnimatedPage><Explore /></AnimatedPage>} />
        <Route path="/search" element={<AnimatedPage><Search /></AnimatedPage>} />
        <Route path="/profile" element={<AnimatedPage><Profile /></AnimatedPage>} />
        <Route path="/favorites" element={<AnimatedPage><Favorites /></AnimatedPage>} />
        <Route path="/details/:category/:id" element={<AnimatedPage><Details /></AnimatedPage>} />
        <Route path="/examples/:category" element={<AnimatedPage><Examples /></AnimatedPage>} />
        <Route path="/item/:category/:id" element={<AnimatedPage><ItemDetail /></AnimatedPage>} />
        <Route path="*" element={<AnimatedPage><NotFound /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary">
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
