
import React from "react";
import { Home, Compass, Heart, User, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const navItems = [
    { icon: <Home size={24} />, label: "Home", path: "/" },
    { icon: <Compass size={24} />, label: "Explore", path: "/explore" },
    { icon: <Search size={24} />, label: "Search", path: "/search" },
    { icon: <Heart size={24} />, label: "Favorites", path: "/favorites" },
    { icon: <User size={24} />, label: "Profile", path: "/profile" }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-black flex justify-around items-center h-16 px-2 z-50 animate-slide-in-bottom">
      {navItems.map((item, index) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center py-1 px-3 transition-all duration-300 hover:scale-110 ${
            currentPath === item.path
              ? "text-orange-500 hover:text-orange-400"
              : "text-white hover:text-orange-500"
          }`}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
