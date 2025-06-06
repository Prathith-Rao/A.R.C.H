
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink, MapPin, Calendar, User } from "lucide-react";
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

  if (!item) {
    return (
      <div className="min-h-screen bg-arch flex items-center justify-center animate-fade-in">
        <Card className="bg-accent/10 border-accent/20 max-w-md animate-scale-in">
          <CardContent className="p-6 text-center">
            <h2 className="text-accent text-xl font-bold mb-4">Item Not Found</h2>
            <Button onClick={() => navigate(-1)} className="arch-gradient text-arch hover-scale transition-all duration-300">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <h1 className="text-arch text-2xl font-bold">{item.name}</h1>
          <p className="text-arch/80 text-sm">{item.categoryName}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Hero Image */}
          <Card className="bg-accent/10 border-accent/20 overflow-hidden animate-scale-in">
            <div className="aspect-video md:aspect-[21/9] overflow-hidden">
              <img 
                src={item.imageUrl} 
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </Card>

          {/* Main Content */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Description */}
            <div className="md:col-span-2 space-y-6">
              <Card className="bg-accent/10 border-accent/20 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                <CardHeader>
                  <CardTitle className="text-accent text-xl">About {item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-accent-light leading-relaxed">
                    {item.description}
                  </p>
                </CardContent>
              </Card>

              {/* Wikipedia Link */}
              {item.wikipediaUrl && (
                <Card className="bg-accent/10 border-accent/20 animate-fade-in" style={{ animationDelay: "0.4s" }}>
                  <CardContent className="p-6">
                    <Button
                      variant="outline"
                      className="border-accent/20 text-accent hover:bg-accent/10 w-full hover-scale transition-all duration-300"
                      onClick={() => window.open(item.wikipediaUrl, '_blank')}
                    >
                      <ExternalLink size={16} className="mr-2" />
                      Read more on Wikipedia
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar Info */}
            <div className="space-y-4">
              <Card className="bg-accent/10 border-accent/20 animate-slide-in-right" style={{ animationDelay: "0.3s" }}>
                <CardHeader>
                  <CardTitle className="text-accent text-lg">Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {item.location && (
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-accent" />
                      <span className="text-accent-light text-sm">{item.location}</span>
                    </div>
                  )}
                  
                  {item.region && (
                    <div className="flex items-center gap-3">
                      <MapPin size={16} className="text-accent" />
                      <span className="text-accent-light text-sm">{item.region}</span>
                    </div>
                  )}
                  
                  {item.artist && (
                    <div className="flex items-center gap-3">
                      <User size={16} className="text-accent" />
                      <span className="text-accent-light text-sm">{item.artist}</span>
                    </div>
                  )}
                  
                  {item.period && (
                    <div className="flex items-center gap-3">
                      <Calendar size={16} className="text-accent" />
                      <span className="text-accent-light text-sm">{item.period}</span>
                    </div>
                  )}
                  
                  <div className="pt-2 border-t border-accent/20">
                    <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                      {item.categoryName}
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Navigation */}
              <Card className="bg-accent/5 border-accent/20 animate-slide-in-right" style={{ animationDelay: "0.5s" }}>
                <CardContent className="p-4 space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/20 text-accent hover:bg-accent/10 w-full hover-scale transition-all duration-300"
                    onClick={() => navigate(`/examples/${category}`)}
                  >
                    View All {item.categoryName}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-accent/20 text-accent hover:bg-accent/10 w-full hover-scale transition-all duration-300"
                    onClick={() => navigate('/')}
                  >
                    Back to Home
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
