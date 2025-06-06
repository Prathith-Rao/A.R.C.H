
import React, { useState, useMemo } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { mockHeritageData, HeritageItem } from "@/data/heritageData";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    return mockHeritageData.filter((item: HeritageItem) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.era.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const popularSearches = [
    "Taj Mahal", "Red Fort", "Temples", "Mughal", "Rajasthan", "Delhi"
  ];

  return (
    <div className="pb-20 min-h-screen bg-arch text-white">
      {/* Header */}
      <header className="arch-gradient p-4 shadow-sm sticky top-0 z-10">
        <h1 className="text-xl font-poppins font-semibold text-arch mb-4">Search Heritage</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-arch/60" size={20} />
          <Input
            type="text"
            placeholder="Search monuments, art, battles, periods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-arch/20 text-arch placeholder:text-arch/60"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {!searchQuery.trim() ? (
          <div>
            <h2 className="text-accent font-medium text-lg mb-4">Popular Searches</h2>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {popularSearches.map((search) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-3 text-left hover:bg-accent/20 transition-colors"
                >
                  <span className="text-accent">{search}</span>
                </button>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-4">
              <h3 className="text-accent font-medium mb-2">Search Tips</h3>
              <ul className="text-accent-light text-sm space-y-1">
                <li>• Try searching by monument name (e.g., "Taj Mahal")</li>
                <li>• Search by location (e.g., "Rajasthan", "Delhi")</li>
                <li>• Look for categories (e.g., "Temples", "Forts")</li>
                <li>• Search by era (e.g., "Mughal", "Colonial")</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <h2 className="text-accent font-medium text-lg mb-4">
              Search Results ({filteredResults.length})
            </h2>
            
            {filteredResults.length === 0 ? (
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center">
                <p className="text-accent-light">No results found for "{searchQuery}"</p>
                <p className="text-accent-light text-sm mt-2">Try different keywords or browse categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item: HeritageItem) => (
                  <div 
                    key={item.id}
                    className="bg-accent/10 border border-accent/20 rounded-lg p-4 hover:bg-accent/20 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-4">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div className="flex-1">
                        <h3 className="text-accent font-medium">{item.title}</h3>
                        <p className="text-accent-light text-sm mt-1">
                          {item.location.city}, {item.location.state}
                        </p>
                        <p className="text-accent-light text-sm mt-1">{item.description}</p>
                        <div className="flex gap-2 mt-2">
                          <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                            {item.category}
                          </span>
                          <span className="bg-accent/20 text-accent text-xs px-2 py-1 rounded">
                            {item.era}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Search;
