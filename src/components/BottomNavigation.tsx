
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
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 px-2 z-50">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center justify-center py-1 px-3 ${
            currentPath === item.path
              ? "text-india-saffron"
              : "text-gray-500"
          }`}
        >
          {item.icon}
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default BottomNavigation;
