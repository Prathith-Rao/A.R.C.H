
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockHeritageData } from "@/data/heritageData";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Explore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("states");
  
  // Gather unique values
  const states: string[] = [...new Set(mockHeritageData.map(item => item.location.state))];
  const categories: string[] = [...new Set(mockHeritageData.map(item => item.category))];
  const eras: string[] = [...new Set(mockHeritageData.map(item => item.era))];
  
  return (
    <div className="pb-20 min-h-screen bg-arch text-white animate-fade-in">
      {/* Header */}
      <header className="arch-gradient p-6 shadow-sm sticky top-0 z-10 animate-slide-in-bottom">
        <h1 className="text-2xl font-bold text-arch mb-2 animate-float">Explore Heritage</h1>
        <p className="text-arch/80 text-sm">Discover heritage by states, categories, and eras</p>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="states" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 bg-accent/10 border-accent/20">
            <TabsTrigger 
              value="states" 
              className="text-accent data-[state=active]:bg-accent/20 data-[state=active]:text-accent-light transition-all duration-300"
            >
              States
            </TabsTrigger>
            <TabsTrigger 
              value="categories"
              className="text-accent data-[state=active]:bg-accent/20 data-[state=active]:text-accent-light transition-all duration-300"
            >
              Categories
            </TabsTrigger>
            <TabsTrigger 
              value="eras"
              className="text-accent data-[state=active]:bg-accent/20 data-[state=active]:text-accent-light transition-all duration-300"
            >
              Eras
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="states" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {states.map((state: string, index: number) => (
                <Card 
                  key={state}
                  className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/explore/state/${state}`)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-accent font-medium group-hover:text-accent-light transition-colors duration-300">{state}</h3>
                    <p className="text-accent-light text-sm mt-1">
                      {mockHeritageData.filter(item => item.location.state === state).length} items
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category: string, index: number) => (
                <Card 
                  key={category}
                  className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/explore/category/${category}`)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-accent font-medium group-hover:text-accent-light transition-colors duration-300">{category}</h3>
                    <p className="text-accent-light text-sm mt-1">
                      {mockHeritageData.filter(item => item.category === category).length} items
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="eras" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {eras.map((era: string, index: number) => (
                <Card 
                  key={era}
                  className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-all duration-300 cursor-pointer hover-lift group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(`/explore/era/${era}`)}
                >
                  <CardContent className="p-4">
                    <h3 className="text-accent font-medium group-hover:text-accent-light transition-colors duration-300">{era}</h3>
                    <p className="text-accent-light text-sm mt-1">
                      {mockHeritageData.filter(item => item.era === era).length} items
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <h2 className="text-accent font-medium text-xl mb-6 animate-fade-in" style={{ animationDelay: "0.5s" }}>
          {activeTab === "states" ? "Popular States" : 
           activeTab === "categories" ? "Popular Categories" : 
           "Significant Eras"}
        </h2>
        
        <div className="space-y-6">
          {/* Display recommended items based on active tab */}
          {(activeTab === "states" ? states.slice(0, 3) : 
            activeTab === "categories" ? categories.slice(0, 3) : 
            eras.slice(0, 3)).map((item: string, sectionIndex: number) => {
            
            const filteredItems = activeTab === "states" 
              ? mockHeritageData.filter(i => i.location.state === item)
              : activeTab === "categories"
                ? mockHeritageData.filter(i => i.category === item)
                : mockHeritageData.filter(i => i.era === item);
            
            return (
              <Card 
                key={item} 
                className="bg-accent/10 border-accent/20 animate-fade-in"
                style={{ animationDelay: `${0.6 + sectionIndex * 0.2}s` }}
              >
                <CardHeader>
                  <CardTitle className="text-accent text-lg">{item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4 overflow-x-auto pb-2">
                    {filteredItems.slice(0, 3).map((heritage, itemIndex) => (
                      <div 
                        key={heritage.id}
                        className="flex-shrink-0 w-32 cursor-pointer hover-lift group transition-all duration-300 animate-scale-in"
                        style={{ animationDelay: `${0.8 + sectionIndex * 0.2 + itemIndex * 0.1}s` }}
                        onClick={() => navigate(`/details/${heritage.category}/${heritage.id}`)}
                      >
                        <div className="overflow-hidden rounded-lg">
                          <img 
                            src={heritage.imageUrl} 
                            alt={heritage.title} 
                            className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        <p className="text-accent text-sm mt-2 font-medium line-clamp-2 group-hover:text-accent-light transition-colors duration-300">
                          {heritage.title}
                        </p>
                        <p className="text-accent-light text-xs mt-1">
                          {heritage.location.city}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Explore;
