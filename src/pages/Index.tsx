
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import BottomNavigation from "@/components/BottomNavigation";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";

const Index = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Architecture",
      description: "Discover magnificent structures and buildings",
      icon: "🏛️",
      route: "architecture",
      color: "from-accent to-accent-light"
    },
    {
      title: "Art & Culture",
      description: "Explore artistic traditions and cultural heritage",
      icon: "🎨",
      route: "art",
      color: "from-accent-light to-accent-lighter"
    },
    {
      title: "Historical Timeline",
      description: "Journey through significant periods in history",
      icon: "📜",
      route: "timeline",
      color: "from-accent-lighter to-accent-lightest"
    },
    {
      title: "Famous Battles",
      description: "Learn about pivotal moments in warfare",
      icon: "⚔️",
      route: "battles",
      color: "from-accent-lightest to-accent-light"
    },
    {
      title: "Cultural Elements",
      description: "Understand traditions and cultural practices",
      icon: "🎭",
      route: "culture",
      color: "from-accent to-accent-lighter"
    }
  ];

  // Create featured items with proper type handling
  const featuredItems = [
    ...architectureCategories.flatMap(cat => 
      cat.examples?.slice(0, 1).map(ex => ({
        ...ex,
        categoryType: 'architecture',
        locationText: ex.location || 'Historical Site'
      })) || []
    ),
    ...artCategories.flatMap(cat => 
      cat.examples?.slice(0, 1).map(ex => ({
        ...ex,
        categoryType: 'art',
        locationText: ex.artist || cat.region || 'Cultural Heritage'
      })) || []
    ),
    ...timelinePeriods.flatMap(period => 
      period.examples?.slice(0, 1).map(ex => ({
        ...ex,
        categoryType: 'timeline',
        locationText: period.period || 'Historical Period'
      })) || []
    )
  ].slice(0, 6);

  return (
    <div className="pb-20 min-h-screen bg-gradient-to-br from-primary via-primary-dark to-secondary text-white animate-fade-in">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light p-6 text-center animate-slide-in-bottom shadow-lg">
        <h1 className="text-3xl font-bold text-white mb-2 animate-float">
          Heritage Explorer
        </h1>
        <p className="text-white/80">Discover the rich cultural heritage around you</p>
      </header>

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Categories Grid */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 animate-fade-in">
            Explore Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card 
                key={category.route}
                className="bg-white/10 border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover-lift group animate-scale-in backdrop-blur-sm"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/examples/${category.route}`)}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-4xl mb-3 group-hover:animate-bounce transition-all duration-300">
                    {category.icon}
                  </div>
                  <CardTitle className="text-white group-hover:text-accent-light transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10 hover-scale transition-all duration-300"
                  >
                    Explore Collection
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Items */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-6 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Featured Heritage
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item, index) => (
              <Card 
                key={item.id}
                className="bg-white/10 border-white/20 overflow-hidden hover:bg-white/20 transition-all duration-300 cursor-pointer hover-lift group animate-fade-in backdrop-blur-sm"
                style={{ animationDelay: `${0.8 + index * 0.1}s` }}
                onClick={() => {
                  navigate(`/item/${item.categoryType}/${item.id}`);
                }}
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-white text-lg group-hover:text-accent-light transition-colors duration-300">
                    {item.name}
                  </CardTitle>
                  <CardDescription className="text-white/70">
                    {item.locationText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm line-clamp-2">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-white font-semibold mb-4 text-center">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover-scale transition-all duration-300"
                  onClick={() => navigate('/search')}
                >
                  🔍 Search Heritage
                </Button>
                <Button
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 hover-scale transition-all duration-300"
                  onClick={() => navigate('/favorites')}
                >
                  ❤️ My Favorites
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
