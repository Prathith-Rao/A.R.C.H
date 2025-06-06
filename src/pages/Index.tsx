
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { 
  architectureCategories, 
  artCategories, 
  timelinePeriods, 
  famousBattles,
  culturalElements 
} from "@/data/heritageData";
import BottomNavigation from "@/components/BottomNavigation";

const Index = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "🏛️ Architecture",
      description: "Explore India's magnificent architectural heritage",
      data: architectureCategories,
      route: "architecture",
      color: "from-accent to-accent-dark"
    },
    {
      title: "🖼️ Art & Paintings",
      description: "Discover traditional art forms and painting styles",
      data: artCategories,
      route: "art",
      color: "from-accent-light to-accent"
    },
    {
      title: "⚔️ Historic Battles",
      description: "Learn about famous wars and battles",
      data: famousBattles,
      route: "battles",
      color: "from-accent-dark to-accent-darker"
    },
    {
      title: "🧵 Cultural Elements",
      description: "Experience diverse cultural traditions",
      data: culturalElements,
      route: "culture",
      color: "from-accent to-accent-light"
    },
    {
      title: "⌛ Timeline",
      description: "Journey through historical periods",
      data: timelinePeriods,
      route: "timeline",
      color: "from-accent-lighter to-accent"
    }
  ];

  return (
    <div className="min-h-screen bg-arch text-white pb-20">
      {/* Hero Section */}
      <div className="arch-gradient text-center py-12 px-6">
        <h1 className="text-4xl font-bold text-arch mb-4">A.R.C.H</h1>
        <p className="text-arch-light text-lg mb-6">
          Architectural & Cultural Heritage of India
        </p>
        <p className="text-arch/80 max-w-2xl mx-auto">
          Discover the rich tapestry of India's cultural and architectural heritage through 
          an interactive journey across millennia of history, art, and tradition.
        </p>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-8">
        {sections.map((section, sectionIndex) => (
          <div key={section.route}>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-accent">{section.title}</h2>
                <p className="text-accent-light">{section.description}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-accent/20 text-accent hover:bg-accent/10"
                onClick={() => navigate(`/examples/${section.route}`)}
              >
                View Examples
              </Button>
            </div>

            <Carousel className="w-full">
              <CarouselContent>
                {section.data.map((item: any, index: number) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <Card 
                      className="bg-accent/10 border-accent/20 hover:bg-accent/20 transition-colors cursor-pointer h-full"
                      onClick={() => navigate(`/details/${section.route}/${index}`)}
                    >
                      <CardHeader className="pb-3">
                        <CardTitle className="text-accent flex items-center gap-3 text-lg">
                          {item.icon && <span className="text-2xl">{item.icon}</span>}
                          {item.name}
                        </CardTitle>
                        {item.region && (
                          <CardDescription className="text-accent-light">
                            Region: {item.region}
                          </CardDescription>
                        )}
                        {item.period && (
                          <CardDescription className="text-accent-light">
                            Period: {item.period}
                          </CardDescription>
                        )}
                        {item.years && (
                          <CardDescription className="text-accent-light">
                            Year(s): {item.years}
                          </CardDescription>
                        )}
                      </CardHeader>
                      <CardContent>
                        <p className="text-accent-light text-sm line-clamp-3">
                          {item.description}
                        </p>
                        {item.examples && item.examples.length > 0 && (
                          <div className="mt-3 flex gap-2 overflow-x-auto">
                            {item.examples.slice(0, 2).map((example: any, idx: number) => (
                              <img
                                key={idx}
                                src={example.imageUrl}
                                alt={example.name}
                                className="w-12 h-12 object-cover rounded border border-accent/20"
                              />
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="text-accent border-accent/20 hover:bg-accent/10" />
              <CarouselNext className="text-accent border-accent/20 hover:bg-accent/10" />
            </Carousel>
          </div>
        ))}

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-accent/10 to-accent/20 border-accent/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-accent mb-4">
              Explore India's Rich Heritage
            </h3>
            <p className="text-accent-light mb-6">
              Dive deeper into each category and discover the stories, traditions, 
              and architectural marvels that define India's cultural legacy.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                className="arch-gradient text-arch hover:opacity-90"
                onClick={() => navigate('/explore')}
              >
                Start Exploring
              </Button>
              <Button 
                variant="outline"
                className="border-accent/20 text-accent hover:bg-accent/10"
                onClick={() => navigate('/search')}
              >
                Search Heritage
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Index;
