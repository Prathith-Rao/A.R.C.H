
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after a brief delay
    const animationTimer = setTimeout(() => {
      setAnimate(true);
    }, 500);

    // Navigate to auth screen after animation completes
    const navigationTimer = setTimeout(() => {
      navigate("/auth");
    }, 3500);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-arch to-arch-lighter flex flex-col items-center justify-center overflow-hidden">
      <div className={`transition-all duration-1000 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg animate-float">
          <span className="text-4xl gradient-text font-bold">
            A
          </span>
        </div>
        <h1 className="text-white text-3xl font-poppins font-bold text-center animate-fade-in">
          A.R.C.H
        </h1>
        <p className="text-white text-sm mt-2 opacity-80 text-center animate-fade-in" style={{ animationDelay: "200ms" }}>
          Architectural and Cultural Heritage of India
        </p>
        
        <div className="flex justify-center mt-8 space-x-2">
          {['A', 'R', 'C', 'H'].map((letter, index) => (
            <div 
              key={letter}
              className="w-2 h-2 bg-white rounded-full animate-pulse-slow"
              style={{ animationDelay: `${index * 200}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
