
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, User, Settings, HelpCircle, Info, Edit } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/use-toast";

interface UserProfile {
  id: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: "",
    bio: "",
  });
  const [loading, setLoading] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    // Initialize profile with user data
    setProfile({
      id: user.id,
      full_name: user.fullName,
      bio: "",
      avatar_url: ""
    });
    setEditForm({
      full_name: user.fullName,
      bio: "",
    });
  }, [user, navigate]);

  const handleLogout = async () => {
    await signOut();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate("/auth");
  };

  const handleSaveProfile = async () => {
    try {
      // Update local profile state
      const updatedProfile = {
        id: user?.id || "",
        full_name: editForm.full_name,
        bio: editForm.bio,
        avatar_url: ""
      };
      
      setProfile(updatedProfile);
      setIsEditing(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error updating profile",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (!user) return null;

  return (
    <div className="pb-20 min-h-screen bg-background">
      {/* Header */}
      <header className="bg-arch p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-poppins font-semibold text-foreground">Profile</h1>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setIsEditing(!isEditing)}
        >
          <Edit size={20} />
        </Button>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-arch-lighter rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center">
            <div className="bg-india-saffron/10 rounded-full p-4 mr-4">
              <User size={32} className="text-india-saffron" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <Input
                    value={editForm.full_name}
                    onChange={(e) => setEditForm({...editForm, full_name: e.target.value})}
                    placeholder="Full name"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                    placeholder="Bio (optional)"
                    className="w-full p-2 border rounded-md"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      onClick={handleSaveProfile}
                      className="bg-india-saffron hover:bg-india-deepSaffron"
                    >
                      Save
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-medium">
                    {profile?.full_name || user.fullName || user.email}
                  </h2>
                  <p className="text-gray-500">{user.email}</p>
                  {profile?.bio && (
                    <p className="text-sm mt-2 text-gray-600">{profile.bio}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-black rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-medium">Account Settings</h3>
          </div>
          
          <div className="divide-y">
            <button 
              className="w-full flex items-center p-4 hover:bg-red-700 text-left"
              onClick={() => {
                toast({
                  title: "Coming soon",
                  description: "This feature will be available in a future update.",
                });
              }}
            >
              <Settings size={20} className="mr-3 text-red-700" />
              <span>App Settings</span>
            </button>
            
            <button 
                className="w-full flex items-center p-4 hover:bg-red-700 text-left"
              onClick={() => {
              window.open("https://github.com/Prathith-Rao/A.R.C.H/issues", "_blank");
            }}
            
            >
              <HelpCircle size={20} className="mr-3 text-red-700" />
              <span>Help & Support</span>
            </button>
            
            <button 
              className="w-full flex items-center p-4 hover:bg-red-700 text-left"
              onClick={() => {
              window.open("https://github.com/Prathith-Rao/A.R.C.H", "_blank");
            }}
            >
              <Info size={20} className="mr-3 text-red-700" />
              <span>About A.R.C.H</span>
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
