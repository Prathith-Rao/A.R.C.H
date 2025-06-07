
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CategoryGrid = () => {
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

  return (
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
  );
};

export default CategoryGrid;
