import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, MapPin, Calendar, User, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import HeritageImage from "@/components/HeritageImage";
import { useFolderImages } from "@/hooks/useFolderImages";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";

const ItemDetail = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const { user } = useAuth();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const findItem = () => {
    let allItems: any[] = [];
    
    switch (category) {
      case 'architecture':
        allItems = architectureCategories.flatMap(cat => 
          cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
        );
        break;
      case 'art':
        allItems = artCategories.flatMap(cat => 
          cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
        );
        break;
      case 'timeline':
        allItems = timelinePeriods.flatMap(period => 
          period.examples?.map(ex => ({ ...ex, categoryName: period.name })) || []
        );
        break;
      case 'battles':
        allItems = famousBattles.flatMap(battle => 
          battle.examples?.map(ex => ({ ...ex, categoryName: battle.name })) || []
        );
        break;
      case 'culture':
        allItems = culturalElements.flatMap(culture => 
          culture.examples?.map(ex => ({ ...ex, categoryName: culture.name })) || []
        );
        break;
      default:
        return null;
    }
    
    return allItems.find(item => item.id === id);
  };

  const item = findItem();
  
  // Use the folder images hook
  const { images = [], isLoading } = useFolderImages(
    item?.imageFolder, 
    item?.imageUrl || item?.images?.[0]
  );

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleFavoriteToggle = () => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to add items to favorites.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (!item) return;

    const favoriteItem = {
      id: item.id,
      categoryType: category || 'heritage',
      name: item.name,
      imageUrl: item.imageUrl,
      description: item.description,
      location: item.location,
      artist: item.artist,
      period: item.period,
    };

    if (isFavorite(item.id)) {
      removeFromFavorites(item.id);
      toast({
        title: "Removed from favorites",
        description: `${item.name} has been removed from your favorites.`,
      });
    } else {
      addToFavorites(favoriteItem);
      toast({
        title: "Added to favorites",
        description: `${item.name} has been added to your favorites.`,
      });
    }
  };

  if (!item) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary text-white flex items-center justify-center animate-fade-in">
        <Card className="bg-white/10 border-white/20 max-w-md animate-scale-in">
          <CardContent className="p-6 text-center">
            <h2 className="text-white text-xl font-bold mb-4">Item Not Found</h2>
            <Button onClick={() => navigate(-1)} className="bg-accent text-white hover:bg-accent-light hover-scale transition-all duration-300">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary text-white animate-fade-in">
      <div className="bg-gradient-to-r from-primary to-primary-light p-6 animate-slide-in-bottom shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Button 
              onClick={() => navigate(-1)}
              variant="ghost"
              className="text-white hover:bg-white/10 mr-4 hover-scale transition-all duration-300"
            >
              <ArrowLeft size={20} />
            </Button>
            <div>
              <h1 className="text-white text-2xl font-bold">{item.name}</h1>
              <p className="text-white/80 text-sm">{item.categoryName}</p>
            </div>
          </div>
          <Button
            onClick={handleFavoriteToggle}
            variant="ghost"
            className="text-white hover:bg-white/10 hover-scale transition-all duration-300"
          >
            <Heart 
              size={24} 
              className={`transition-colors duration-300 ${
                isFavorite(item.id) ? 'text-red-500 fill-red-500' : 'text-white'
              }`} 
            />
          </Button>
        </div>
      </div>

      <div className="p-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <Card className="bg-white/10 border-white/20 overflow-hidden animate-scale-in">
            <div className="aspect-video md:aspect-[21/9] overflow-hidden relative group">
              {isLoading ? (
                <div className="w-full h-full bg-white/5 animate-pulse flex items-center justify-center">
                  <span className="text-white/60">Loading images...</span>
                </div>
              ) : images.length === 0 ? (
                <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/60">
                  No images available.
                </div>
              ) : (
                <HeritageImage 
                  src={images[currentImageIndex]} 
                  alt={`${item.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              )}

              {images.length > 1 && !isLoading && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={prevImage}
                  >
                    <ChevronLeft size={24} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={nextImage}
                  >
                    <ChevronRight size={24} />
                  </Button>
                  <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${
                          index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                        }`}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

