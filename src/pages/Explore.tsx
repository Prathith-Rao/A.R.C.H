
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockHeritageData } from "@/data/heritageData";
import BottomNavigation from "@/components/BottomNavigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Explore = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("states");
  
  // Gather unique values
  const states: string[] = [...new Set(mockHeritageData.map(item => item.location.state))];
  const categories: string[] = [...new Set(mockHeritageData.map(item => item.category))];
  const eras: string[] = [...new Set(mockHeritageData.map(item => item.era))];
  
  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm flex items-center justify-between sticky top-0 z-10">
        <h1 className="text-xl font-poppins font-semibold">Explore</h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <Tabs defaultValue="states" className="mb-6" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="states">States</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="eras">Eras</TabsTrigger>
          </TabsList>
          
          <TabsContent value="states" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {states.map((state: string) => (
                <div 
                  key={state}
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/explore/state/${state}`)}
                >
                  <h3 className="font-medium">{state}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {mockHeritageData.filter(item => item.location.state === state).length} items
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="categories" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {categories.map((category: string) => (
                <div 
                  key={category}
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/explore/category/${category}`)}
                >
                  <h3 className="font-medium">{category}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {mockHeritageData.filter(item => item.category === category).length} items
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="eras" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {eras.map((era: string) => (
                <div 
                  key={era}
                  className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/explore/era/${era}`)}
                >
                  <h3 className="font-medium">{era}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    {mockHeritageData.filter(item => item.era === era).length} items
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <h2 className="font-medium text-lg mb-4">
          {activeTab === "states" ? "Popular States" : 
           activeTab === "categories" ? "Popular Categories" : 
           "Significant Eras"}
        </h2>
        
        <div className="space-y-4">
          {/* Display recommended items based on active tab */}
          {(activeTab === "states" ? states.slice(0, 3) : 
            activeTab === "categories" ? categories.slice(0, 3) : 
            eras.slice(0, 3)).map((item: string) => {
            
            const filteredItems = activeTab === "states" 
              ? mockHeritageData.filter(i => i.location.state === item)
              : activeTab === "categories"
                ? mockHeritageData.filter(i => i.category === item)
                : mockHeritageData.filter(i => i.era === item);
            
            return (
              <div key={item} className="bg-white rounded-lg shadow-sm p-4">
                <h3 className="font-medium mb-3">{item}</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {filteredItems.slice(0, 3).map(heritage => (
                    <div 
                      key={heritage.id}
                      className="flex-shrink-0 w-28 cursor-pointer"
                      onClick={() => navigate(`/details/${heritage.id}`)}
                    >
                      <img 
                        src={heritage.imageUrl} 
                        alt={heritage.title} 
                        className="w-full h-20 object-cover rounded-md"
                      />
                      <p className="text-xs mt-1 font-medium line-clamp-1">{heritage.title}</p>
                    </div>
                  ))}
                </div>
              </div>
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
