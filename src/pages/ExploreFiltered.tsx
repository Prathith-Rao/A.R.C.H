
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BottomNavigation from "@/components/BottomNavigation";
import HeritageImage from "@/components/HeritageImage";
import { getAllHeritageItems, HeritageItem } from "@/data/heritageData";

const ExploreFiltered = () => {
  const { filterType, filterValue } = useParams();
  const navigate = useNavigate();
  
  const allItems = getAllHeritageItems();
  
  // Filter items based on the filter type and value
  const filteredItems = allItems.filter((item: HeritageItem) => {
    switch (filterType) {
      case "state":
        return item.location.state.toLowerCase() === filterValue?.toLowerCase();
      case "category":
        return item.category.toLowerCase() === filterValue?.toLowerCase();
      case "era":
        return item.era.toLowerCase() === filterValue?.toLowerCase();
      default:
        return false;
    }
  });

  const getTitle = () => {
    switch (filterType) {
      case "state":
        return `Heritage in ${filterValue}`;
      case "category":
        return `${filterValue} Heritage`;
      case "era":
        return `${filterValue} Period`;
      default:
        return "Heritage Items";
    }
  };

  return (
    <div className="pb-20 min-h-screen bg-arch text-white animate-fade-in">
      {/* Header */}
      <header className="arch-gradient p-6 shadow-sm sticky top-0 z-10 animate-slide-in-bottom">
        <div className="flex items-center mb-4">
          <Button 
            onClick={() => navigate("/explore")}
            variant="ghost"
            className="text-arch hover:bg-arch/10 mr-4 hover-scale transition-all duration-300"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-arch animate-float">{getTitle()}</h1>
            <p className="text-arch/80 text-sm">{filteredItems.length} items found</p>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="p-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-accent-light text-lg mb-4">No items found for this filter</p>
            <Button 
              onClick={() => navigate("/explore")}
              className="bg-accent text-white hover:bg-accent-light hover-scale transition-all duration-300"
            >
              Back to Explore
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item: HeritageItem, index: number) => (
              <Card 
                key={item.id}
                className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer hover-lift group animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => {
                  // Navigate to appropriate detail page based on item type
                  if (item.category === 'Temples' || item.category === 'Forts' || item.category === 'Palaces') {
                    navigate(`/item/architecture/${item.id}`);
                  } else if (item.category === 'Art') {
                    navigate(`/item/art/${item.id}`);
                  } else if (item.category === 'Historical Site') {
                    navigate(`/item/timeline/${item.id}`);
                  } else if (item.category === 'Historical Battle') {
                    navigate(`/item/battles/${item.id}`);
                  } else if (item.category === 'Festivals' || item.category === 'Dance Forms') {
                    navigate(`/item/culture/${item.id}`);
                  } else {
                    navigate(`/details/${item.category}/${item.id}`);
                  }
                }}
              >
                <div className="aspect-video overflow-hidden rounded-t-lg">
                  <HeritageImage 
                    src={item.imageUrl} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-accent group-hover:text-accent-light transition-colors duration-300">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-accent-light text-sm mb-2">
                    {item.location.city}, {item.location.state}
                  </p>
                  <p className="text-accent/80 text-sm mb-2">
                    {item.era}
                  </p>
                  <p className="text-accent-light text-xs line-clamp-2">
                    {item.description}
                  </p>
                  <div className="mt-2">
                    <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                      {item.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default ExploreFiltered;
