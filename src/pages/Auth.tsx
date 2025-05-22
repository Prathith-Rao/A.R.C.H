
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setLoading(false);
      
      // For demo purposes, any credentials will work
      localStorage.setItem("echoes_user", JSON.stringify({
        name: isLogin ? email.split("@")[0] : name,
        email,
        role: "user"
      }));
      
      toast({
        title: isLogin ? "Welcome back!" : "Account created",
        description: isLogin 
          ? "You have successfully logged in." 
          : "Your account has been created successfully.",
      });
      
      navigate("/");
    }, 1500);
  };

  const handleAdminLogin = () => {
    setLoading(true);
    
    // Simulate admin authentication
    setTimeout(() => {
      setLoading(false);
      localStorage.setItem("echoes_user", JSON.stringify({
        name: "Admin",
        email: "admin@echoesofindia.com",
        role: "admin"
      }));
      
      toast({
        title: "Admin access granted",
        description: "You've logged in as an administrator.",
      });
      
      navigate("/admin");
    }, 1500);
  };

  const handleGuestAccess = () => {
    localStorage.setItem("echoes_user", JSON.stringify({
      name: "Guest",
      email: "guest@example.com",
      role: "guest"
    }));
    
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="h-40 bg-gradient-to-r from-india-saffron to-india-deepSaffron flex items-center justify-center">
        <h1 className="text-white text-3xl font-poppins font-bold">Echoes of India</h1>
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button 
              className={`flex-1 py-4 font-medium text-center ${isLogin ? 'text-india-saffron border-b-2 border-india-saffron' : 'text-gray-500'}`}
              onClick={() => setIsLogin(true)}
            >
              User Login
            </button>
            <button 
              className={`flex-1 py-4 font-medium text-center ${!isLogin ? 'text-india-saffron border-b-2 border-india-saffron' : 'text-gray-500'}`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required={!isLogin}
                  />
                </div>
              )}
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-india-saffron hover:bg-india-deepSaffron text-white"
                disabled={loading}
              >
                {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
              </Button>
            </form>
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Button 
                onClick={handleAdminLogin} 
                variant="outline" 
                className="w-full mb-3"
                disabled={loading}
              >
                Admin Login
              </Button>
              
              <Button 
                onClick={handleGuestAccess} 
                variant="secondary" 
                className="w-full"
                disabled={loading}
              >
                Continue as Guest
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
