
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, User, Settings, HelpCircle, Info } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/use-toast";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("echoes_user");
    if (!storedUser) {
      navigate("/auth");
      return;
    }
    
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("echoes_user");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  if (!user) return null;

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-poppins font-semibold">Profile</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-india-saffron/10 rounded-full p-4 mr-4">
              <User size={32} className="text-india-saffron" />
            </div>
            <div>
              <h2 className="text-xl font-medium">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              {user.role === "guest" && (
                <p className="text-xs bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                  Guest Account
                </p>
              )}
              {user.role === "admin" && (
                <p className="text-xs bg-india-saffron/10 text-india-deepSaffron px-2 py-1 rounded mt-1 inline-block">
                  Administrator
                </p>
              )}
            </div>
          </div>
          
          {user.role === "guest" && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-sm">
                Create an account to save your favorites and get personalized recommendations.
              </p>
              <Button 
                className="mt-2 w-full bg-india-saffron hover:bg-india-deepSaffron"
                onClick={() => navigate("/auth")}
              >
                Sign Up Now
              </Button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Account Settings</h3>
          </div>
          
          <div className="divide-y">
            <button 
              className="w-full flex items-center p-4 hover:bg-gray-50 text-left"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "This feature will be available in a future update.",
                });
              }}
            >
              <Settings size={20} className="mr-3 text-gray-500" />
              <span>App Settings</span>
            </button>
            
            <button 
              className="w-full flex items-center p-4 hover:bg-gray-50 text-left"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "This feature will be available in a future update.",
                });
              }}
            >
              <HelpCircle size={20} className="mr-3 text-gray-500" />
              <span>Help & Support</span>
            </button>
            
            <button 
              className="w-full flex items-center p-4 hover:bg-gray-50 text-left"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "This feature will be available in a future update.",
                });
              }}
            >
              <Info size={20} className="mr-3 text-gray-500" />
              <span>About Echoes of India</span>
            </button>
            
            <button 
              className="w-full flex items-center p-4 hover:bg-gray-50 text-left text-red-500"
              onClick={handleLogout}
            >
              <LogOut size={20} className="mr-3" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Profile;
