
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const { user, loading, signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);

    try {
      if (isLogin) {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in.",
        });
      } else {
        await signUp(email, password, fullName);
        toast({
          title: "Account created successfully!",
          description: "Welcome to A.R.C.H!",
        });
      }
      navigate("/");
    } catch (error: any) {
      toast({
        title: `Error ${isLogin ? 'signing in' : 'creating account'}`,
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setAuthLoading(false);
    }
  };

  const handleGuestAccess = () => {
    localStorage.setItem('guest_mode', 'true');
    toast({
      title: "Continuing as guest",
      description: "You can explore the app with limited features.",
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-arch to-arch-lighter flex items-center justify-center">
        <div className="animate-pulse-slow">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
            <img 
              src="/lovable-uploads/a586ee94-dd25-4e2a-b5b1-61983b1ed07a.png" 
              alt="A.R.C.H Logo" 
              className="w-12 h-12"
            />
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
          <div className="flex items-center justify-center gap-3 mb-3">
            <img 
              src="/lovable-uploads/a586ee94-dd25-4e2a-b5b1-61983b1ed07a.png" 
              alt="A.R.C.H Logo" 
              className="w-12 h-12 animate-float"
            />
            <h1 className="text-white text-4xl font-bold animate-float">A.R.C.H</h1>
          </div>
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
                className="w-full bg-arch hover:bg-arch-light text-white transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
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
      </div>
    </div>
  );
};

export default Auth;
