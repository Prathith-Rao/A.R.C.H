
import React from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useFavorites } from "@/contexts/FavoritesContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Favorites = () => {
  const { favorites, removeFromFavorites } = useFavorites();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary text-white flex items-center justify-center">
        <Card className="bg-white/10 border-white/20 max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-white text-xl font-bold mb-4">Please Login</h2>
            <p className="text-white/70 mb-4">You need to be logged in to view your favorites.</p>
            <button 
              onClick={() => navigate("/auth")}
              className="bg-accent text-white px-4 py-2 rounded hover:bg-accent-light transition-colors"
            >
              Go to Login
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary text-white animate-fade-in">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light p-6 shadow-lg sticky top-0 z-10 animate-slide-in-bottom">
        <h1 className="text-2xl font-bold text-white animate-float">My Favorites</h1>
        <p className="text-white/80">Your saved heritage items</p>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite, index) => (
              <Card 
                key={favorite.id}
                className="bg-white/10 border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer hover-lift group animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative">
                  <img 
                    src={favorite.imageUrl} 
                    alt={favorite.name} 
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    onClick={() => navigate(`/item/${favorite.categoryType}/${favorite.id}`)}
                  />
                  <div 
                    className="absolute top-4 right-4 bg-white/80 rounded-full p-2 cursor-pointer hover:bg-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFromFavorites(favorite.id);
                    }}
                  >
                    <Heart size={18} className="text-red-500 fill-red-500" />
                  </div>
                </div>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => navigate(`/item/${favorite.categoryType}/${favorite.id}`)}
                >
                  <CardTitle className="text-white group-hover:text-accent-light transition-colors duration-300">
                    {favorite.name}
                  </CardTitle>
                  <p className="text-white/70">
                    {favorite.location || favorite.artist || favorite.period}
                  </p>
                </CardHeader>
                <CardContent 
                  className="cursor-pointer"
                  onClick={() => navigate(`/item/${favorite.categoryType}/${favorite.id}`)}
                >
                  <p className="text-white/70 text-sm line-clamp-2">{favorite.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-80 animate-scale-in">
            <Heart size={48} className="text-white/30 mb-4" />
            <h2 className="text-white text-xl font-medium mb-2">No favorites yet</h2>
            <p className="text-white/70 text-center mb-6">
              Explore the app and heart the places you love to add them to favorites
            </p>
            <button 
              onClick={() => navigate("/")}
              className="bg-accent text-white px-6 py-3 rounded-lg hover:bg-accent-light transition-colors hover-scale"
            >
              Explore Heritage
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Favorites;
