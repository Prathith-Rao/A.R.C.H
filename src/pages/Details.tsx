
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeritageItem, mockHeritageData } from "@/data/heritageData";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart, Share2 } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { toast } from "@/components/ui/use-toast";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<HeritageItem | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const heritageItem = mockHeritageData.find(item => item.id === id);
      if (heritageItem) {
        setItem(heritageItem);
        // Check if it's in favorites (would use real storage in production)
        setIsFavorite(false);
      }
    }
    setLoading(false);
  }, [id]);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite 
        ? `${item?.title} has been removed from your favorites.` 
        : `${item?.title} has been added to your favorites.`,
    });
  };

  const handleShare = () => {
    toast({
      title: "Share feature",
      description: "This feature would allow sharing to social media or via message.",
    });
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
        <h1 className="text-xl font-semibold mb-2">Item Not Found</h1>
        <p className="text-gray-500 mb-6">The heritage item you're looking for doesn't exist.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Image Gallery */}
      <div className="relative">
        <img 
          src={item.images[activeImage]} 
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
        
        {/* Image thumbnails/indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {item.images.map((_, index) => (
            <button 
              key={index}
              className={`h-2 w-2 rounded-full ${activeImage === index ? 'bg-white' : 'bg-white/40'}`}
              onClick={() => setActiveImage(index)}
            />
          ))}
        </div>
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
          <span className="bg-india-saffron/10 text-india-deepSaffron text-xs px-2 py-1 rounded-full">
            {item.category}
          </span>
          <span className="text-sm text-gray-500">
            {item.location.city}, {item.location.state}
          </span>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-2">Overview</h2>
          <p className="text-gray-600">{item.description}</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-2">Historical Significance</h2>
          <p className="text-gray-600">{item.significance}</p>
        </div>

        {item.architecturalStyle && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-lg font-medium mb-2">Architectural Style</h2>
            <p className="text-gray-600">{item.architecturalStyle}</p>
          </div>
        )}

        {item.culturalImportance && (
          <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
            <h2 className="text-lg font-medium mb-2">Cultural Importance</h2>
            <p className="text-gray-600">{item.culturalImportance}</p>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 shadow-sm mb-4">
          <h2 className="text-lg font-medium mb-2">Era</h2>
          <p className="text-gray-600">{item.era}</p>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="text-lg font-medium mb-2">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {item.tags.map(tag => (
              <span 
                key={tag} 
                className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Details;
