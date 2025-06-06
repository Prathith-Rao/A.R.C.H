
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";

const Details = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const getContent = () => {
    const index = parseInt(id || '0');
    
    switch (category) {
      case 'architecture':
        const arch = architectureCategories[index];
        return {
          title: arch?.name || 'Architecture',
          data: arch,
          type: 'architecture'
        };
      case 'art':
        const art = artCategories[index];
        return {
          title: art?.name || 'Art Style',
          data: art,
          type: 'art'
        };
      case 'timeline':
        const period = timelinePeriods[index];
        return {
          title: period?.name || 'Historical Period',
          data: period,
          type: 'timeline'
        };
      case 'battles':
        const battle = famousBattles[index];
        return {
          title: battle?.name || 'Historic Battle',
          data: battle,
          type: 'battle'
        };
      case 'culture':
        const culture = culturalElements[index];
        return {
          title: culture?.name || 'Cultural Element',
          data: culture,
          type: 'culture'
        };
      default:
        return { title: 'Not Found', data: null, type: 'unknown' };
    }
  };

  const { title, data, type } = getContent();

  if (!data) {
    return (
      <div className="min-h-screen bg-arch flex items-center justify-center">
        <Card className="bg-accent/10 border-accent/20 max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-accent text-xl font-bold mb-4">Content Not Found</h2>
            <Button onClick={() => navigate(-1)} className="arch-gradient text-arch">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
          <p className="text-arch/80 text-sm capitalize">{type} Details</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 pb-20">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-accent/10 border-accent/20">
            <CardHeader>
              <CardTitle className="text-accent flex items-center gap-3">
                {type === 'architecture' && <span className="text-2xl">{data.icon}</span>}
                {title}
              </CardTitle>
              {type === 'art' && (
                <CardDescription className="text-accent-light">
                  Region: {data.region}
                </CardDescription>
              )}
              {type === 'timeline' && (
                <CardDescription className="text-accent-light">
                  Period: {data.period}
                </CardDescription>
              )}
              {type === 'battle' && (
                <CardDescription className="text-accent-light">
                  Year(s): {data.years}
                </CardDescription>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-accent-light">
                {data.description}
              </p>

              {/* Type-specific content */}
              {type === 'timeline' && data.highlights && (
                <div>
                  <h3 className="text-accent font-semibold mb-2">Key Highlights:</h3>
                  <ul className="space-y-1">
                    {data.highlights.map((highlight, index) => (
                      <li key={index} className="text-accent-light text-sm flex items-center">
                        <span className="w-2 h-2 bg-accent rounded-full mr-3"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {type === 'battle' && data.significance && (
                <div>
                  <h3 className="text-accent font-semibold mb-2">Historical Significance:</h3>
                  <p className="text-accent-light text-sm">{data.significance}</p>
                </div>
              )}

              {type === 'culture' && (
                <div className="text-center">
                  <span className="text-6xl">{data.icon}</span>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Related Content Suggestions */}
          <Card className="bg-accent/5 border-accent/20 mt-6">
            <CardHeader>
              <CardTitle className="text-accent text-lg">Explore More</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10"
                onClick={() => navigate('/explore')}
              >
                All Categories
              </Button>
              <Button
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10"
                onClick={() => navigate('/')}
              >
                Home
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Details;
