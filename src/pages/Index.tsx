
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import BottomNavigation from "@/components/BottomNavigation";
import { MapPin, LogOut, Palette, History, Castle } from "lucide-react";
import { architectureCategories, artCategories, timelinePeriods } from "@/data/heritageData";

const Index = () => {
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const isGuest = localStorage.getItem('guest_mode') === 'true';

  const handleSignOut = async () => {
    try {
      signOut();
      localStorage.removeItem('guest_mode');
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
        {!user && !isGuest ? (
          // Not logged in content
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
          </div>
        ) : (
          // Logged in or guest content
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Welcome Section */}
            <Card className="bg-accent/10 border-accent/20 animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-accent">
                  {user ? `Welcome back, ${user.fullName}!` : 'Welcome, Guest!'}
                </CardTitle>
                <CardDescription className="text-accent-light">
                  Explore India's rich cultural heritage
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={() => navigate("/explore")} 
                  className="arch-gradient text-arch font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                  <MapPin size={18} className="mr-2" />
                  Explore Heritage
                </Button>
                
                {user && (
                  <Button 
                    onClick={handleSignOut}
                    variant="outline"
                    className="border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <LogOut size={18} className="mr-2" />
                    Sign Out
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* Categories Preview */}
            <div className="grid gap-6">
              {/* Architecture */}
              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-accent flex items-center gap-2">
                    <Castle size={24} />
                    Architecture Categories
                  </CardTitle>
                  <CardDescription className="text-accent-light">
                    Explore different architectural styles across India
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {architectureCategories.slice(0, 6).map((category, index) => (
                      <Button
                        key={category.name}
                        variant="outline"
                        className="h-auto p-3 border-accent/20 text-accent hover:bg-accent/10 transition-all duration-200"
                        onClick={() => navigate(`/details/architecture/${index}`)}
                      >
                        <div className="text-center">
                          <div className="text-2xl mb-1">{category.icon}</div>
                          <div className="text-sm font-medium">{category.name}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Art Styles */}
              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-accent flex items-center gap-2">
                    <Palette size={24} />
                    Art & Painting Styles
                  </CardTitle>
                  <CardDescription className="text-accent-light">
                    Traditional art forms from different regions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {artCategories.slice(0, 4).map((art, index) => (
                      <Button
                        key={art.name}
                        variant="outline"
                        className="h-auto p-3 border-accent/20 text-accent hover:bg-accent/10 text-left justify-start"
                        onClick={() => navigate(`/details/art/${index}`)}
                      >
                        <div>
                          <div className="font-medium">{art.name}</div>
                          <div className="text-xs text-accent-light">{art.region}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Timeline */}
              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="text-accent flex items-center gap-2">
                    <History size={24} />
                    Historical Timeline
                  </CardTitle>
                  <CardDescription className="text-accent-light">
                    Journey through India's historical periods
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {timelinePeriods.slice(0, 3).map((period, index) => (
                      <Button
                        key={period.name}
                        variant="outline"
                        className="h-auto p-3 border-accent/20 text-accent hover:bg-accent/10 text-left justify-start w-full"
                        onClick={() => navigate(`/details/timeline/${index}`)}
                      >
                        <div>
                          <div className="font-medium">{period.name}</div>
                          <div className="text-xs text-accent-light">{period.period}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
