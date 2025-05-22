
import React, { useEffect, useState } from "react";
import { HeritageItem, mockHeritageData } from "@/data/heritageData";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Menu, Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [featured, setFeatured] = useState<HeritageItem[]>([]);
  const [trending, setTrending] = useState<HeritageItem[]>([]);
  const [recent, setRecent] = useState<HeritageItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("echoes_user");
    if (!storedUser) {
      navigate("/splash");
      return;
    }
    
    setUser(JSON.parse(storedUser));
    
    // Filter heritage items
    setFeatured(mockHeritageData.filter(item => item.featured));
    setTrending(mockHeritageData.filter(item => item.trending));
    setRecent([...mockHeritageData].sort((a, b) => 
      new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    ).slice(0, 3));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("echoes_user");
    navigate("/auth");
  };

  const handleItemClick = (id: string) => {
    navigate(`/details/${id}`);
  };

  if (!user) return null;

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
                  <h2 className="text-xl font-semibold">{user.name}</h2>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Explore by Category</h3>
                  {["Monument", "Art Form", "Festival", "Cuisine"].map(category => (
                    <div key={category} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      {category}
                    </div>
                  ))}
                  
                  <h3 className="font-medium text-gray-700 mt-6">Explore by State</h3>
                  {["Rajasthan", "Tamil Nadu", "Kerala", "Uttar Pradesh"].map(state => (
                    <div key={state} className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      {state}
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full mt-6"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
          <h1 className="text-xl font-poppins font-semibold ml-2">Echoes of India</h1>
        </div>
        {user.role === "admin" && (
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

        {/* Featured Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Featured Destinations</h2>
          <div className="grid grid-cols-1 gap-4">
            {featured.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <img 
                  src={item.imageUrl} 
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
                  <p className="text-gray-500 text-sm">{item.location.city}, {item.location.state}</p>
                  <p className="text-sm mt-2 line-clamp-2">{item.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trending Section */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Trending Now</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
            {trending.map(item => (
              <div 
                key={item.id}
                className="flex-shrink-0 w-60 bg-white rounded-lg overflow-hidden shadow-md cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-full h-32 object-cover"
                />
                <div className="p-3">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.location.city}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recently Added */}
        <section>
          <h2 className="text-lg font-semibold mb-4">Recently Added</h2>
          <div className="space-y-4">
            {recent.map(item => (
              <div 
                key={item.id}
                className="flex bg-white rounded-lg overflow-hidden shadow-sm cursor-pointer"
                onClick={() => handleItemClick(item.id)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-24 h-24 object-cover"
                />
                <div className="p-3 flex-1">
                  <h3 className="font-medium text-sm">{item.title}</h3>
                  <p className="text-gray-500 text-xs">{item.location.city}, {item.location.state}</p>
                  <p className="text-xs mt-1 line-clamp-2">{item.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
