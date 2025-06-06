import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-arch">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/search" element={<Search />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/details/:category/:id" element={<Details />} />
            <Route path="/examples/:category" element={<Examples />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
