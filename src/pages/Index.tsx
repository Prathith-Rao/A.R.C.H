
import React from "react";
import BottomNavigation from "@/components/BottomNavigation";
import Header from "@/components/Header";
import CategoryGrid from "@/components/CategoryGrid";
import FeaturedHeritage from "@/components/FeaturedHeritage";
import QuickActions from "@/components/QuickActions";

const Index = () => {
  return (
    <div className="pb-20 min-h-screen bg-background text-white animate-fade-in">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="p-6 space-y-8">
        {/* Categories Grid */}
        <CategoryGrid />

        {/* Featured Items */}
        <FeaturedHeritage />

        {/* Quick Actions */}
        <QuickActions />
      </main>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
};

export default Index;
