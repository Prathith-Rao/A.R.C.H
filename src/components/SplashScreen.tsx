
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
    }, 3000);

    return () => {
      clearTimeout(animationTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-india-saffron to-india-deepSaffron flex flex-col items-center justify-center">
      <div className={`transition-all duration-1000 ${animate ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}>
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg">
          {/* App Logo - Replace with actual logo */}
          <span className="text-4xl text-india-saffron">
            E
          </span>
        </div>
        <h1 className="text-white text-3xl font-poppins font-bold text-center">
          Echoes of India
        </h1>
        <p className="text-white text-sm mt-2 opacity-80 text-center">
          A Journey Through India's Heritage
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;
