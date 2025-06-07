
import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-primary to-primary-light p-6 text-center animate-slide-in-bottom shadow-lg">
      <div className="flex items-center justify-center gap-4 mb-4">
        <img 
          src="/lovable-uploads/a586ee94-dd25-4e2a-b5b1-61983b1ed07a.png" 
          alt="Indian Heritage Logo" 
          className="w-16 h-16 animate-float"
        />
        <div>
          <h1 className="text-3xl font-bold text-white animate-float">
            Heritage Explorer
          </h1>
          <p className="text-white/80">Discover the rich cultural heritage around you</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
