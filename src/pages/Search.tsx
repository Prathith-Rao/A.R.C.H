
import React, { useState, useMemo } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { mockHeritageData, HeritageItem } from "@/data/heritageData";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

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
    <div className="pb-20 min-h-screen bg-arch text-white animate-fade-in">
      {/* Header */}
      <header className="arch-gradient p-6 shadow-sm sticky top-0 z-10 animate-slide-in-bottom">
        <h1 className="text-2xl font-bold text-arch mb-4 animate-float">Search Heritage</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-arch/60 transition-all duration-300" size={20} />
          <Input
            type="text"
            placeholder="Search monuments, art, battles, periods..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-arch/20 text-arch placeholder:text-arch/60 hover:bg-white/15 focus:bg-white/20 transition-all duration-300"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!searchQuery.trim() ? (
          <div className="animate-fade-in">
            <h2 className="text-accent font-medium text-xl mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Popular Searches
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {popularSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="bg-accent/10 border border-accent/20 rounded-lg p-4 text-left hover:bg-accent/20 transition-all duration-300 hover-lift group animate-scale-in"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <span className="text-accent group-hover:text-accent-light transition-colors duration-300">{search}</span>
                </button>
              ))}
            </div>

            <div className="bg-accent/5 border border-accent/20 rounded-lg p-6 animate-fade-in" style={{ animationDelay: "0.8s" }}>
              <h3 className="text-accent font-medium mb-3 text-lg">Search Tips</h3>
              <ul className="text-accent-light space-y-2">
                <li className="flex items-center">
                  <span className="text-accent mr-2">•</span>
                  Try searching by monument name (e.g., "Taj Mahal")
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">•</span>
                  Search by location (e.g., "Rajasthan", "Delhi")
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">•</span>
                  Look for categories (e.g., "Temples", "Forts")
                </li>
                <li className="flex items-center">
                  <span className="text-accent mr-2">•</span>
                  Search by era (e.g., "Mughal", "Colonial")
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-accent font-medium text-xl mb-6">
              Search Results ({filteredResults.length})
            </h2>
            
            {filteredResults.length === 0 ? (
              <div className="bg-accent/5 border border-accent/20 rounded-lg p-8 text-center animate-scale-in">
                <p className="text-accent-light text-lg">No results found for "{searchQuery}"</p>
                <p className="text-accent-light text-sm mt-2">Try different keywords or browse categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item: HeritageItem, index: number) => (
                  <div 
                    key={item.id}
                    className="bg-accent/10 border border-accent/20 rounded-lg p-4 hover:bg-accent/20 transition-all duration-300 cursor-pointer hover-lift group animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => navigate(`/details/${item.category}/${item.id}`)}
                  >
                    <div className="flex gap-4">
                      <div className="w-20 h-20 overflow-hidden rounded-md">
                        <img 
                          src={item.imageUrl} 
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-accent font-medium text-lg group-hover:text-accent-light transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-accent-light mt-1">
                          {item.location.city}, {item.location.state}
                        </p>
                        <p className="text-accent-light mt-2 line-clamp-2">{item.description}</p>
                        <div className="flex gap-2 mt-3">
                          <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-accent/30">
                            {item.category}
                          </span>
                          <span className="bg-accent/20 text-accent text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-accent/30">
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
