
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";

const Examples = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const getContent = () => {
    switch (category) {
      case 'architecture':
        return {
          title: 'Architecture Collection',
          data: architectureCategories.flatMap(cat => 
            cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
          )
        };
      case 'art':
        return {
          title: 'Art Collection', 
          data: artCategories.flatMap(cat => 
            cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
          )
        };
      case 'timeline':
        return {
          title: 'Historical Periods',
          data: timelinePeriods.flatMap(period => 
            period.examples?.map(ex => ({ ...ex, categoryName: period.name })) || []
          )
        };
      case 'battles':
        return {
          title: 'Historic Battles',
          data: famousBattles.flatMap(battle => 
            battle.examples?.map(ex => ({ ...ex, categoryName: battle.name })) || []
          )
        };
      case 'culture':
        return {
          title: 'Cultural Heritage',
          data: culturalElements.flatMap(culture => 
            culture.examples?.map(ex => ({ ...ex, categoryName: culture.name })) || []
          )
        };
      default:
        return { title: 'Heritage Collection', data: [] };
    }
  };

  const { title, data } = getContent();

  return (
    <div className="min-h-screen bg-arch text-white animate-fade-in">
      {/* Header */}
      <div className="h-32 arch-gradient flex items-center px-6 animate-slide-in-bottom">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-arch hover:bg-arch/10 mr-4 hover-scale transition-all duration-300"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-arch text-2xl font-bold">{title}</h1>
          <p className="text-arch/80 text-sm">Discover cultural treasures</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {data.length === 0 ? (
            <Card className="bg-accent/10 border-accent/20 animate-scale-in">
              <CardContent className="p-6 text-center">
                <p className="text-accent-light">No items available for this category yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((item: any, index: number) => (
                <Card 
                  key={item.id} 
                  className="bg-accent/10 border-accent/20 overflow-hidden hover:bg-accent/20 transition-all duration-300 hover-lift cursor-pointer animate-fade-in group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/item/${category}/${item.id}`)}
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-accent text-lg group-hover:text-accent-light transition-colors duration-300">
                      {item.name}
                    </CardTitle>
                    <CardDescription className="text-accent-light">
                      {item.categoryName} • {item.location || item.region || item.artist || 'Historical'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-accent-light text-sm line-clamp-3">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Back to Categories */}
          <Card className="bg-accent/5 border-accent/20 mt-8 animate-slide-in-bottom" style={{ animationDelay: "0.5s" }}>
            <CardContent className="p-6 text-center">
              <Button
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10 hover-scale transition-all duration-300"
                onClick={() => navigate('/')}
              >
                Back to Categories
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Examples;
