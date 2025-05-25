
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface FavoriteLocation {
  id: string;
  location_id: string;
  heritage_locations: {
    id: string;
    title: string;
    short_description: string;
    image_url: string;
    location_city: string;
    location_state: string;
  };
}

const Favorites = () => {
  const [favorites, setFavorites] = useState<FavoriteLocation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
      return;
    }
    
    fetchFavorites();
  }, [user, navigate]);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          id,
          location_id,
          heritage_locations (
            id,
            title,
            short_description,
            image_url,
            location_city,
            location_state
          )
        `)
        .eq('user_id', user?.id);

      if (error) throw error;

      setFavorites(data || []);
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Error loading favorites",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      setFavorites(favorites.filter(fav => fav.id !== favoriteId));
      toast({
        title: "Removed from favorites",
        description: "The location has been removed from your favorites.",
      });
    } catch (error: any) {
      toast({
        title: "Error removing favorite",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
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
        <h1 className="text-xl font-poppins font-semibold">Favorites</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {favorites.length > 0 ? (
          <div className="space-y-4">
            {favorites.map(favorite => (
              <div 
                key={favorite.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={favorite.heritage_locations.image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000"} 
                    alt={favorite.heritage_locations.title} 
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => navigate(`/details/${favorite.heritage_locations.id}`)}
                  />
                  <div 
                    className="absolute top-4 right-4 bg-white/80 rounded-full p-2 cursor-pointer"
                    onClick={() => removeFavorite(favorite.id)}
                  >
                    <Heart size={18} className="text-red-500 fill-red-500" />
                  </div>
                </div>
                <div 
                  className="p-4 cursor-pointer"
                  onClick={() => navigate(`/details/${favorite.heritage_locations.id}`)}
                >
                  <h3 className="font-medium">{favorite.heritage_locations.title}</h3>
                  <p className="text-gray-500 text-sm">
                    {favorite.heritage_locations.location_city}, {favorite.heritage_locations.location_state}
                  </p>
                  <p className="text-sm mt-2 line-clamp-2">{favorite.heritage_locations.short_description}</p>
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
