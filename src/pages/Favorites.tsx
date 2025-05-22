
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { mockHeritageData, HeritageItem } from "@/data/heritageData";
import { Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Favorites = () => {
  const [favorites, setFavorites] = useState<HeritageItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // For demo purposes, we'll just show 2 random items as favorites
    // In a real app, this would come from a database or local storage
    const randomItems = [...mockHeritageData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2);
    
    setFavorites(randomItems);
  }, []);

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-poppins font-semibold">Favorites</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                onClick={() => navigate(`/details/${item.id}`)}
              >
                <div className="relative">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white/80 rounded-full p-2">
                    <Heart size={18} className="text-red-500 fill-red-500" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.location.city}, {item.location.state}</p>
                  <p className="text-sm mt-2 line-clamp-2">{item.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-80">
            <Heart size={48} className="text-gray-300 mb-4" />
            <h2 className="text-xl font-medium mb-2">No favorites yet</h2>
            <p className="text-gray-500 text-center">
              Explore the app and heart the places you love to add them to favorites
            </p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Favorites;
