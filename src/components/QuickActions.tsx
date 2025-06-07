
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <section className="animate-fade-in" style={{ animationDelay: "1.2s" }}>
      <Card className="bg-white/5 border-white/20 backdrop-blur-sm">
        <CardContent className="p-6">
          <h3 className="text-white font-semibold mb-4 text-center">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover-scale transition-all duration-300"
              onClick={() => navigate('/search')}
            >
              🔍 Search Heritage
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover-scale transition-all duration-300"
              onClick={() => navigate('/favorites')}
            >
              ❤️ My Favorites
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default QuickActions;
