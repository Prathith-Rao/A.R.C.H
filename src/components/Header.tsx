
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
            A.R.C.H
          </h1>
          <p className="text-white/80">Architectural & Cultural Heritage of India</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
