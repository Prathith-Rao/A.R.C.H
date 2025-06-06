
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";

const Examples = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const getExamples = () => {
    switch (category) {
      case 'architecture':
        return {
          title: 'Architecture Examples',
          data: architectureCategories.flatMap(cat => 
            cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
          )
        };
      case 'art':
        return {
          title: 'Art Examples', 
          data: artCategories.flatMap(cat => 
            cat.examples?.map(ex => ({ ...ex, categoryName: cat.name })) || []
          )
        };
      case 'timeline':
        return {
          title: 'Historical Period Examples',
          data: timelinePeriods.flatMap(period => 
            period.examples?.map(ex => ({ ...ex, categoryName: period.name })) || []
          )
        };
      case 'battles':
        return {
          title: 'Battle Examples',
          data: famousBattles.flatMap(battle => 
            battle.examples?.map(ex => ({ ...ex, categoryName: battle.name })) || []
          )
        };
      case 'culture':
        return {
          title: 'Cultural Examples',
          data: culturalElements.flatMap(culture => 
            culture.examples?.map(ex => ({ ...ex, categoryName: culture.name })) || []
          )
        };
      default:
        return { title: 'Examples', data: [] };
    }
  };

  const { title, data } = getExamples();

  return (
    <div className="min-h-screen bg-arch text-white">
      {/* Header */}
      <div className="h-32 arch-gradient flex items-center px-6">
        <Button 
          onClick={() => navigate(-1)}
          variant="ghost"
          className="text-arch hover:bg-arch/10 mr-4"
        >
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h1 className="text-arch text-2xl font-bold">{title}</h1>
          <p className="text-arch/80 text-sm">Explore detailed examples</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <div className="max-w-4xl mx-auto">
          {data.length === 0 ? (
            <Card className="bg-accent/10 border-accent/20">
              <CardContent className="p-6 text-center">
                <p className="text-accent-light">No examples available for this category yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.map((example: any) => (
                <Card key={example.id} className="bg-accent/10 border-accent/20 overflow-hidden hover:bg-accent/20 transition-colors">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={example.imageUrl} 
                      alt={example.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-accent text-lg">{example.name}</CardTitle>
                    <CardDescription className="text-accent-light">
                      {example.categoryName} • {example.location || example.region || example.artist || 'Historical'}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-accent-light text-sm">
                      {example.description}
                    </p>
                    
                    {example.wikipediaUrl && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-accent/20 text-accent hover:bg-accent/10 w-full"
                        onClick={() => window.open(example.wikipediaUrl, '_blank')}
                      >
                        <ExternalLink size={16} className="mr-2" />
                        Read on Wikipedia
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Back to Categories */}
          <Card className="bg-accent/5 border-accent/20 mt-8">
            <CardContent className="p-6 text-center">
              <Button
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10"
                onClick={() => navigate('/')}
              >
                Back to Categories
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Examples;
