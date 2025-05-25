
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

interface HeritageLocation {
  id: string;
  title: string;
  short_description: string;
  full_description: string;
  image_url: string;
  location_city: string;
  location_state: string;
  historical_period: string;
  unesco_status: boolean;
  categories: { name: string; color: string } | null;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<HeritageLocation | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchLocation();
      if (user) {
        checkFavoriteStatus();
      }
    }
  }, [id, user]);

  const fetchLocation = async () => {
    try {
      const { data, error } = await supabase
        .from('heritage_locations')
        .select(`
          *,
          categories (
            name,
            color
          )
        `)
        .eq('id', id)
        .single();

      if (error) throw error;

      setItem(data);
    } catch (error) {
      console.error('Error fetching location:', error);
      toast({
        title: "Error loading location",
        description: "The location could not be found.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    if (!user || !id) return;

    try {
      const { data } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user.id)
        .eq('location_id', id)
        .single();

      setIsFavorite(!!data);
    } catch (error) {
      // Not a favorite
      setIsFavorite(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to add favorites.",
      });
      return;
    }

    try {
      if (isFavorite) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('location_id', id);

        if (error) throw error;

        setIsFavorite(false);
        toast({
          title: "Removed from favorites",
          description: `${item?.title} has been removed from your favorites.`,
        });
      } else {
        // Add to favorites
        const { error } = await supabase
          .from('favorites')
          .insert([{
            user_id: user.id,
            location_id: id,
          }]);

        if (error) throw error;

        setIsFavorite(true);
        toast({
          title: "Added to favorites",
          description: `${item?.title} has been added to your favorites.`,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error updating favorites",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: item?.title,
        text: item?.short_description,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link copied",
        description: "The location link has been copied to your clipboard.",
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

  if (!item) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-xl font-semibold mb-2">Location Not Found</h1>
        <p className="text-gray-500 mb-6">The heritage location you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Image */}
      <div className="relative">
        <img 
          src={item.image_url || "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1000"} 
          alt={item.title} 
          className="w-full h-64 object-cover"
        />
        
        <Button 
          size="icon"
          variant="ghost" 
          className="absolute top-4 left-4 bg-white/80 rounded-full h-10 w-10"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-2xl font-semibold font-poppins">{item.title}</h1>
          <div className="flex gap-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="h-10 w-10 rounded-full"
              onClick={toggleFavorite}
            >
              <Heart 
                size={20} 
                className={isFavorite ? "text-red-500 fill-red-500" : ""}
              />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="h-10 w-10 rounded-full"
              onClick={handleShare}
            >
              <Share2 size={20} />
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          {item.categories && (
            <span 
              className="text-xs px-2 py-1 rounded-full text-white"
              style={{ backgroundColor: item.categories.color }}
            >
              {item.categories.name}
            </span>
          )}
          <span className="text-sm text-gray-500">
            {item.location_city}, {item.location_state}
          </span>
          {item.unesco_status && (
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
              UNESCO World Heritage Site
            </span>
          )}
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-2">About</h2>
          <p className="text-gray-600">{item.full_description || item.short_description}</p>
        </div>

        {item.historical_period && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-lg font-medium mb-2">Historical Period</h2>
            <p className="text-gray-600">{item.historical_period}</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Details;
