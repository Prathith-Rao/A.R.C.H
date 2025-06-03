
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface HeritageLocation {
  id: string;
  title: string;
  short_description: string;
  image_url: string;
  location_city: string;
  location_state: string;
  categories: { name: string; color: string } | null;
}

interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
}

const Index = () => {
  const { user, loading, signOut, isAdmin } = useAuth();
  const [featured, setFeatured] = useState<HeritageLocation[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for guest mode
    const guestMode = localStorage.getItem('guest_mode');
    if (guestMode === 'true') {
      setIsGuest(true);
    }

    if (!loading && !user && !guestMode) {
      navigate("/auth");
      return;
    }

    // Fetch data regardless of auth status for guest users
    fetchData();
  }, [loading, user, navigate]);

  const fetchData = async () => {
    try {
      // Fetch heritage locations with categories
      const { data: locations, error: locationsError } = await supabase
        .from('heritage_locations')
        .select(`
          id,
          title,
          short_description,
          image_url,
          location_city,
          location_state,
          categories (
            name,
            color
          )
        `)
        .limit(10);

      if (locationsError) throw locationsError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('categories')
        .select('*');

      if (categoriesError) throw categoriesError;

      setFeatured(locations || []);
      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error loading data",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    if (isGuest) {
      localStorage.removeItem('guest_mode');
      setIsGuest(false);
      navigate("/auth");
    } else {
      await signOut();
      navigate("/auth");
    }
  };

  const handleItemClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/explore?category=${categoryId}`);
  };

  if (loading || dataLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu size={24} />
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[85vh]">
              <div className="p-4">
                <div className="py-6 border-b mb-4">
                  <h2 className="text-xl font-semibold">
                    {isGuest ? "Guest User" : (user?.user_metadata?.full_name || user?.email)}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {isGuest ? "Limited access - Sign up for full features" : (user?.email || "")}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Explore by Category</h3>
                  {categories.map(category => (
                    <div 
                      key={category.id} 
                      className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50"
                      onClick={() => handleCategoryClick(category.id)}
                    >
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 rounded-full mr-3"
                          style={{ backgroundColor: category.color }}
                        />
                        {category.name}
                      </div>
                    </div>
                  ))}
                  
                  {isGuest && (
                    <Button 
                      variant="default" 
                      className="w-full mt-6 bg-arch hover:bg-arch-light"
                      onClick={() => navigate("/auth")}
                    >
                      Sign Up for Full Access
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={handleLogout}
                  >
                    {isGuest ? "Go to Login" : "Logout"}
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="text-xl font-poppins font-semibold ml-2">A.R.C.H</h1>
        </div>
        {!isGuest && isAdmin && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/admin")}
          >
            Admin Panel
          </Button>
        )}
      </header>

      {/* Main Content */}
      <main className="px-4 py-6">
        {/* Hero Section */}
        <div className="relative rounded-xl overflow-hidden mb-8 shadow-md">
          <img 
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000" 
            alt="India Heritage" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
            <h2 className="text-white text-xl font-semibold">Discover India's Rich Heritage</h2>
            <p className="text-white/80 text-sm">Explore the beauty, culture, and history</p>
          </div>
        </div>

        {/* Categories Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Explore Categories</h2>
          <div className="grid grid-cols-2 gap-4">
            {categories.slice(0, 4).map(category => (
              <div 
                key={category.id}
                className="bg-white rounded-lg p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleCategoryClick(category.id)}
              >
                <div 
                  className="w-8 h-8 rounded-full mb-2"
                  style={{ backgroundColor: category.color }}
                />
                <h3 className="font-medium text-sm">{category.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{category.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Locations */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Featured Locations</h2>
          {featured.length > 0 ? (
            <div className="space-y-4">
              {featured.map(item => (
                <div 
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                  onClick={() => handleItemClick(item.id)}
                >
                  <img 
                    src={item.image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000"} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{item.title}</h3>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Heart size={18} className="text-gray-400" />
                      </Button>
                    </div>
                    <p className="text-gray-500 text-sm">{item.location_city}, {item.location_state}</p>
                    <p className="text-sm mt-2 line-clamp-2">{item.short_description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No heritage locations found. Check back later!</p>
            </div>
          )}
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
