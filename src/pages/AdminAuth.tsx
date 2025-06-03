
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, ArrowLeft } from "lucide-react";

const AdminAuth = () => {
  const navigate = useNavigate();
  const { user, loading, isAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect if user is already logged in and is admin
    if (!loading && user && isAdmin) {
      navigate("/admin");
    } else if (!loading && user && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have admin privileges.",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [user, loading, isAdmin, navigate]);

  const handleAdminSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', data.user.id)
        .eq('role', 'admin')
        .single();

      if (roleError || !roleData) {
        await supabase.auth.signOut();
        toast({
          title: "Access Denied",
          description: "This account does not have admin privileges.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Admin login successful!",
        description: "Welcome to the admin panel.",
      });
      
      navigate("/admin");
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      }
      
      toast({
        title: "Error signing in",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arch to-arch-lighter flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <span className="text-2xl gradient-text font-bold">A</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 to-red-700 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="h-40 bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-sm flex items-center justify-center animate-slide-in-bottom">
        <div className="text-center">
          <h1 className="text-white text-4xl font-poppins font-bold mb-2 animate-float">Admin Panel</h1>
          <p className="text-white/80 text-sm">A.R.C.H Administration</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-white/20">
          {/* Header */}
          <div className="bg-red-600 text-white p-6 text-center">
            <h2 className="text-xl font-semibold">Admin Sign In</h2>
            <p className="text-red-100 text-sm mt-1">Authorized personnel only</p>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleAdminSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Admin Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter admin email"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-red-600/20"
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                    minLength={6}
                    className="transition-all duration-200 focus:ring-2 focus:ring-red-600/20 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={authLoading}
              >
                {authLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In to Admin Panel"
                )}
              </Button>
            </form>
            
            {/* Back to Home */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button 
                onClick={() => navigate("/")} 
                variant="outline" 
                className="w-full border-red-600/20 text-red-600 hover:bg-red-600/5 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                disabled={authLoading}
              >
                <ArrowLeft size={16} className="mr-2" />
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;
