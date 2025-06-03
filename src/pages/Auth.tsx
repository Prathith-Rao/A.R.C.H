
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    // Redirect if user is already logged in
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      if (data.user && !data.user.email_confirmed_at) {
        toast({
          title: "Check your email!",
          description: "We've sent you a confirmation link to complete your registration.",
        });
      } else {
        toast({
          title: "Account created successfully!",
          description: "Welcome to A.R.C.H!",
        });
        navigate("/");
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully logged in.",
      });
      
      navigate("/");
    } catch (error: any) {
      let errorMessage = error.message;
      
      if (error.message.includes("Invalid login credentials")) {
        errorMessage = "Invalid email or password. Please check your credentials and try again.";
      } else if (error.message.includes("Email not confirmed")) {
        errorMessage = "Please check your email and click the confirmation link before signing in.";
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

  const handleGuestAccess = () => {
    // For guest access, simply navigate to the main page
    // The app will handle the guest state properly
    toast({
      title: "Continuing as guest",
      description: "You can explore the app, but some features require an account.",
    });
    navigate("/");
  };

  const handleSubmit = isLogin ? handleSignIn : handleSignUp;

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
    <div className="min-h-screen bg-gradient-to-br from-arch to-arch-lighter flex flex-col animate-fade-in">
      {/* Header */}
      <div className="h-40 bg-gradient-to-r from-white/10 to-white/20 backdrop-blur-sm flex items-center justify-center animate-slide-in-bottom">
        <div className="text-center">
          <h1 className="text-white text-4xl font-poppins font-bold mb-2 animate-float">A.R.C.H</h1>
          <p className="text-white/80 text-sm">Architectural & Cultural Heritage of India</p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden animate-scale-in border border-white/20">
          {/* Tab Headers */}
          <div className="flex border-b border-gray-100">
            <button 
              className={`flex-1 py-4 font-medium text-center transition-all duration-300 ${
                isLogin 
                  ? 'text-arch bg-arch/5 border-b-2 border-arch' 
                  : 'text-gray-500 hover:text-arch hover:bg-arch/5'
              }`}
              onClick={() => setIsLogin(true)}
            >
              Sign In
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center transition-all duration-300 ${
                !isLogin 
                  ? 'text-arch bg-arch/5 border-b-2 border-arch' 
                  : 'text-gray-500 hover:text-arch hover:bg-arch/5'
              }`}
              onClick={() => setIsLogin(false)}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form Content */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="animate-fade-in">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    required={!isLogin}
                    className="transition-all duration-200 focus:ring-2 focus:ring-arch/20"
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-arch/20"
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
                    placeholder="Enter your password"
                    required
                    minLength={6}
                    className="transition-all duration-200 focus:ring-2 focus:ring-arch/20 pr-10"
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
                className="w-full bg-arch hover:bg-arch-light text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                disabled={authLoading}
              >
                {authLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Please wait...
                  </div>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>
            
            {/* Guest Access */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button 
                onClick={handleGuestAccess} 
                variant="outline" 
                className="w-full border-arch/20 text-arch hover:bg-arch/5 transition-all duration-200 hover:shadow-md transform hover:-translate-y-0.5"
                disabled={authLoading}
              >
                Continue as Guest
              </Button>
              <p className="text-xs text-gray-500 text-center mt-2">
                Guest access provides limited functionality
              </p>
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="mt-8 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
          <p className="text-white/70 text-sm">
            Discover India's rich architectural and cultural heritage
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
