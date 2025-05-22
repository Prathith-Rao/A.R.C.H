
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockHeritageData, HeritageItem } from "@/data/heritageData";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import BottomNavigation from "@/components/BottomNavigation";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<HeritageItem[]>([]);
  const navigate = useNavigate();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    
    if (searchQuery.trim() === "") {
      setResults([]);
      return;
    }
    
    // Simple search logic - would be more sophisticated in production
    const filtered = mockHeritageData.filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setResults(filtered);
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <div className="relative">
          <Input
            value={query}
            onChange={handleSearch}
            placeholder="Search heritage sites, arts, culture..."
            className="pl-10"
          />
          <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {query.trim() === "" ? (
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="font-medium text-lg mb-3">Popular Searches</h2>
              <div className="flex flex-wrap gap-2">
                {["Taj Mahal", "Rajasthan", "Temples", "UNESCO Sites", "Mughal Architecture"].map(term => (
                  <div 
                    key={term}
                    className="bg-white rounded-full px-4 py-2 text-sm shadow-sm cursor-pointer"
                    onClick={() => {
                      setQuery(term);
                      handleSearch({ target: { value: term } } as React.ChangeEvent<HTMLInputElement>);
                    }}
                  >
                    {term}
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h2 className="font-medium text-lg mb-3">Recent Searches</h2>
              <p className="text-gray-500 text-sm">Your search history will appear here</p>
            </div>
          </div>
        ) : results.length > 0 ? (
          <div className="mt-4 space-y-4">
            <p className="text-sm text-gray-500">{results.length} results found</p>
            
            {results.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-lg shadow-sm p-4 flex cursor-pointer"
                onClick={() => navigate(`/details/${item.id}`)}
              >
                <img 
                  src={item.imageUrl} 
                  alt={item.title} 
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <div>
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-gray-500 text-sm">{item.location.city}, {item.location.state}</p>
                  <p className="text-xs mt-1 line-clamp-2">{item.shortDescription}</p>
                </div>
              </div>
            ))}
          </div>
        ) : query.trim() !== "" && (
          <div className="mt-10 text-center">
            <p className="text-gray-500 mb-2">No results found for "{query}"</p>
            <p className="text-sm text-gray-400">Try different keywords or check spelling</p>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Search;
