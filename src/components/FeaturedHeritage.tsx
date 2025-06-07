
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods 
} from "@/data/heritageData";

const FeaturedHeritage = () => {
  const navigate = useNavigate();

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
        locationText: ex.artist || 'Cultural Heritage'
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
  );
};

export default FeaturedHeritage;
