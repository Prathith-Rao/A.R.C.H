
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Eye, EyeOff } from "lucide-react";

const AdminSetup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const createAdminAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create the admin user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Admin account created successfully!",
        description: `Admin account for ${email} has been created. You can now use these credentials to log into the admin panel.`,
      });

      // Clear the form
      setEmail("");
      setPassword("");
      setFullName("");

    } catch (error: any) {
      toast({
        title: "Error creating admin account",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-accent/10 border-accent/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-accent">
          <UserPlus size={24} />
          Create First Admin Account
        </CardTitle>
        <CardDescription className="text-accent-light">
          Set up your admin credentials to manage locations and content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={createAdminAccount} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-accent mb-2">
              Full Name
            </label>
            <Input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your full name"
              required
              className="bg-arch/20 border-accent/30 text-white placeholder:text-accent-light focus:ring-accent/50"
            />
          </div>
          
          <div>
            <label htmlFor="adminEmail" className="block text-sm font-medium text-accent mb-2">
              Admin Email
            </label>
            <Input
              id="adminEmail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@yourapp.com"
              required
              className="bg-arch/20 border-accent/30 text-white placeholder:text-accent-light focus:ring-accent/50"
            />
          </div>
          
          <div>
            <label htmlFor="adminPassword" className="block text-sm font-medium text-accent mb-2">
              Password
            </label>
            <div className="relative">
              <Input
                id="adminPassword"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secure password"
                required
                minLength={6}
                className="bg-arch/20 border-accent/30 text-white placeholder:text-accent-light focus:ring-accent/50 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-accent-light hover:text-accent transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full arch-gradient text-arch font-medium hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-arch mr-2"></div>
                Creating Admin Account...
              </div>
            ) : (
              "Create Admin Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminSetup;
