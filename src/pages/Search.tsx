
import React, { useState, useMemo } from "react";
import BottomNavigation from "@/components/BottomNavigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { getAllHeritageItems, HeritageItem } from "@/data/heritageData";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Get all heritage items for comprehensive search
  const allHeritageItems = getAllHeritageItems();

  const filteredResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    
    const query = searchQuery.toLowerCase();
    
    return allHeritageItems.filter((item: HeritageItem) => 
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.location.state.toLowerCase().includes(query) ||
      item.location.city.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.era.toLowerCase().includes(query) ||
      item.keywords?.some(keyword => keyword.includes(query)) ||
      item.period?.toLowerCase().includes(query) ||
      item.significance?.toLowerCase().includes(query) ||
      item.artist?.toLowerCase().includes(query) ||
      item.region?.toLowerCase().includes(query)
    );
  }, [searchQuery, allHeritageItems]);

  const popularSearches = [
    "Taj Mahal", "Red Fort", "Temples", "Mughal", "Rajasthan", "Delhi",
    "Palaces", "Forts", "Art", "Culture", "Battles", "Ancient"
  ];

  const handleItemClick = (item: HeritageItem) => {
    // Determine the category type for navigation
    let categoryType = 'heritage';
    if (item.category === 'Temples' || item.category === 'Forts' || item.category === 'Palaces') {
      categoryType = 'architecture';
    } else if (item.category === 'Art') {
      categoryType = 'art';
    } else if (item.category === 'Historical Site') {
      categoryType = 'timeline';
    } else if (item.category === 'Historical Battle') {
      categoryType = 'battles';
    } else if (item.category === 'Festivals' || item.category === 'Dance Forms') {
      categoryType = 'culture';
    }
    
    navigate(`/item/${categoryType}/${item.id}`);
  };

  return (
    <div className="pb-20 min-h-screen bg-background text-white transition-all duration-500 ease-in-out animate-fade-in">
      {/* Header */}
      <header className="bg-gradient-to-r from-primary to-primary-light p-6 shadow-lg sticky top-0 z-10 animate-slide-in-bottom backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white mb-4 animate-float">Search Heritage</h1>
        <div className="relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 transition-all duration-300" size={20} />
          <Input
            type="text"
            placeholder="Search monuments, art, battles, periods, locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60 hover:bg-white/15 focus:bg-white/20 transition-all duration-300 backdrop-blur-sm"
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {!searchQuery.trim() ? (
          <div className="animate-fade-in">
            <h2 className="text-white font-medium text-xl mb-6 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Popular Searches
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              {popularSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => setSearchQuery(search)}
                  className="bg-white/10 border border-white/20 rounded-lg p-4 text-left hover:bg-white/20 transition-all duration-300 hover-lift group animate-scale-in backdrop-blur-sm"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <span className="text-white group-hover:text-accent-light transition-colors duration-300">{search}</span>
                </button>
              ))}
            </div>

            <div className="bg-white/5 border border-white/20 rounded-lg p-6 animate-fade-in backdrop-blur-sm" style={{ animationDelay: "0.8s" }}>
              <h3 className="text-white font-medium mb-3 text-lg">Search Tips</h3>
              <ul className="text-white/70 space-y-2">
                <li className="flex items-center">
                  <span className="text-white mr-2">•</span>
                  Try searching by monument name (e.g., "Taj Mahal")
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">•</span>
                  Search by location (e.g., "Rajasthan", "Delhi")
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">•</span>
                  Look for categories (e.g., "Temples", "Forts")
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">•</span>
                  Search by era (e.g., "Mughal", "Colonial")
                </li>
                <li className="flex items-center">
                  <span className="text-white mr-2">•</span>
                  Try keywords (e.g., "architecture", "art", "culture")
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <h2 className="text-white font-medium text-xl mb-6">
              Search Results ({filteredResults.length})
            </h2>
            
            {filteredResults.length === 0 ? (
              <div className="bg-white/5 border border-white/20 rounded-lg p-8 text-center animate-scale-in backdrop-blur-sm">
                <p className="text-white/70 text-lg">No results found for "{searchQuery}"</p>
                <p className="text-white/70 text-sm mt-2">Try different keywords or browse categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResults.map((item: HeritageItem, index: number) => (
                  <div 
                    key={item.id}
                    className="bg-white/10 border border-white/20 rounded-lg p-4 hover:bg-white/20 transition-all duration-300 cursor-pointer hover-lift group animate-fade-in backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                    onClick={() => handleItemClick(item)}
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
                        <h3 className="text-white font-medium text-lg group-hover:text-accent-light transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-white/70 mt-1">
                          {item.location.city}, {item.location.state}
                        </p>
                        <p className="text-white/70 mt-2 line-clamp-2">{item.description}</p>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/30">
                            {item.category}
                          </span>
                          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/30">
                            {item.era}
                          </span>
                          {item.period && (
                            <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/30">
                              {item.period}
                            </span>
                          )}
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
