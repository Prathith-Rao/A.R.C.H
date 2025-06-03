
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import AdminSetup from "@/components/AdminSetup";
import { MapPin, Users, Settings, LogOut, Shield } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut, isAdmin } = useAuth();
  const [showAdminSetup, setShowAdminSetup] = useState(false);

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-arch flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 arch-gradient rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl text-arch font-bold">A</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-arch text-white">
      {/* Header */}
      <div className="h-40 arch-gradient flex items-center justify-center animate-slide-in-bottom">
        <div className="text-center">
          <h1 className="text-arch text-4xl font-bold mb-2 animate-float">A.R.C.H</h1>
          <p className="text-arch/80 text-sm">Architectural and Cultural Heritage of India</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 px-6 py-8 pb-20">
        {!user ? (
          // Guest Content
          <div className="max-w-md mx-auto space-y-6">
            <Card className="bg-accent/10 border-accent/20 animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-accent">Welcome to A.R.C.H</CardTitle>
                <CardDescription className="text-accent-light">
                  Discover India's rich architectural and cultural heritage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate("/auth")} 
                  className="w-full arch-gradient text-arch font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  Sign In / Sign Up
                </Button>
                <Button 
                  onClick={() => navigate("/explore")} 
                  variant="outline" 
                  className="w-full border-accent/30 text-accent hover:bg-accent/10 transition-all duration-200"
                >
                  Continue as Guest
                </Button>
              </CardContent>
            </Card>

            {/* Admin Setup Section */}
            <Card className="bg-accent/5 border-accent/20">
              <CardHeader className="text-center">
                <CardTitle className="text-accent flex items-center justify-center gap-2">
                  <Shield size={20} />
                  Admin Setup
                </CardTitle>
                <CardDescription className="text-accent-light">
                  First time? Create your admin account to manage content
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!showAdminSetup ? (
                  <Button 
                    onClick={() => setShowAdminSetup(true)}
                    variant="outline"
                    className="w-full border-accent/30 text-accent hover:bg-accent/10"
                  >
                    Set Up Admin Account
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <AdminSetup />
                    <Button 
                      onClick={() => setShowAdminSetup(false)}
                      variant="ghost"
                      className="w-full text-accent-light hover:text-accent"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          // Authenticated User Content
          <div className="max-w-md mx-auto space-y-6">
            <Card className="bg-accent/10 border-accent/20 animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-accent">Welcome back!</CardTitle>
                <CardDescription className="text-accent-light">
                  Ready to explore India's heritage?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={() => navigate("/explore")} 
                  className="w-full arch-gradient text-arch font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MapPin size={18} className="mr-2" />
                  Explore Heritage Sites
                </Button>
                
                {isAdmin && (
                  <Button 
                    onClick={() => navigate("/admin")} 
                    variant="outline"
                    className="w-full border-accent/30 text-accent hover:bg-accent/10 transition-all duration-200"
                  >
                    <Settings size={18} className="mr-2" />
                    Admin Panel
                  </Button>
                )}
                
                <Button 
                  onClick={handleSignOut}
                  variant="ghost"
                  className="w-full text-accent-light hover:text-accent hover:bg-accent/5"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
