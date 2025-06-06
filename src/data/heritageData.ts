
export const statesData = [
  "Rajasthan", "Tamil Nadu", "Kerala", "Maharashtra", "Gujarat", 
  "Karnataka", "Uttar Pradesh", "West Bengal", "Madhya Pradesh", 
  "Odisha", "Delhi", "Punjab", "Assam", "Nagaland"
];

export const architectureCategories = [
  { 
    name: "Temples", 
    icon: "🏛️", 
    description: "Ancient and modern temple architecture showcasing diverse styles across India",
    examples: [
      {
        id: "temple-1",
        name: "Meenakshi Temple",
        location: "Madurai, Tamil Nadu",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000",
        description: "A historic Hindu temple dedicated to Goddess Meenakshi, known for its stunning Dravidian architecture and colorful gopurams.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Meenakshi_Temple"
      },
      {
        id: "temple-2",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
        description: "The holiest Gurdwara of Sikhism, featuring stunning gold-plated architecture and the sacred Amrit Sarovar.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Golden_Temple"
      }
    ]
  },
  { 
    name: "Forts", 
    icon: "🏰", 
    description: "Historic fortifications and defensive structures built by various dynasties",
    examples: [
      {
        id: "fort-1",
        name: "Red Fort",
        location: "Delhi",
        imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528045?q=80&w=1000",
        description: "A historic fortified palace that served as the main residence of the Mughal emperors for nearly 200 years.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Red_Fort"
      },
      {
        id: "fort-2",
        name: "Chittorgarh Fort",
        location: "Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=1000",
        description: "One of the largest forts in India, known for its valor, sacrifice, and architectural grandeur.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Chittorgarh_Fort"
      }
    ]
  },
  { 
    name: "Palaces", 
    icon: "👑", 
    description: "Royal residences and grand palatial complexes showcasing regal architecture",
    examples: [
      {
        id: "palace-1",
        name: "City Palace",
        location: "Udaipur, Rajasthan",
        imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000",
        description: "A palace complex situated in the city of Udaipur, known for its beautiful architecture and stunning lake views.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/City_Palace,_Udaipur"
      }
    ]
  }
];

export const artCategories = [
  { 
    name: "Madhubani", 
    region: "Bihar", 
    description: "Traditional folk art with geometric patterns and vibrant colors",
    examples: [
      {
        id: "art-1",
        name: "Madhubani Fish Motif",
        artist: "Traditional Bihar Artists",
        imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1000",
        description: "A traditional Madhubani painting featuring fish motifs, symbolizing fertility and prosperity in Bihar's folk art tradition.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Madhubani_art"
      }
    ]
  },
  { 
    name: "Warli", 
    region: "Maharashtra", 
    description: "Tribal art with simple motifs depicting daily life and nature",
    examples: [
      {
        id: "art-2",
        name: "Warli Village Life",
        artist: "Traditional Warli Artists",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000",
        description: "Traditional Warli painting depicting village life with characteristic stick figures and geometric patterns.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Warli_painting"
      }
    ]
  }
];

export const famousBattles = [
  {
    name: "Battle of Panipat",
    years: "1526 / 1556 / 1761",
    description: "Three major battles fought in Panipat that were crucial in shaping Indian history and the rise and fall of empires.",
    significance: "Established Mughal rule and later led to British dominance in the Indian subcontinent",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Panipat",
    examples: [
      {
        id: "battle-1",
        name: "First Battle of Panipat (1526)",
        description: "Babur's victory over Ibrahim Lodi that established the Mughal Empire in India.",
        imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1000"
      }
    ]
  },
  {
    name: "Battle of Haldighati",
    years: "1576",
    description: "A legendary battle between Maharana Pratap of Mewar and the Mughal army led by Man Singh I.",
    significance: "Symbol of Rajput resistance against Mughal expansion and epitome of valor",
    wikipediaUrl: "https://en.wikipedia.org/wiki/Battle_of_Haldighati",
    examples: [
      {
        id: "battle-2",
        name: "Maharana Pratap's Last Stand",
        description: "The heroic resistance of Maharana Pratap against the mighty Mughal army.",
        imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027?q=80&w=1000"
      }
    ]
  }
];

export const culturalElements = [
  { 
    name: "Festivals", 
    icon: "🎉", 
    description: "Diverse celebrations across regions showcasing India's cultural richness",
    examples: [
      {
        id: "festival-1",
        name: "Diwali",
        region: "Pan-India",
        imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=1000",
        description: "The festival of lights celebrated across India, symbolizing the victory of light over darkness.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Diwali"
      }
    ]
  },
  { 
    name: "Dance Forms", 
    icon: "💃", 
    description: "Classical and folk dance traditions passed down through generations",
    examples: [
      {
        id: "dance-1",
        name: "Bharatanatyam",
        region: "Tamil Nadu",
        imageUrl: "https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=1000",
        description: "A classical Indian dance form that originated in Tamil Nadu, known for its grace, expressions, and storytelling.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Bharatanatyam"
      }
    ]
  }
];

export const timelinePeriods = [
  {
    name: "Indus Valley Civilization",
    period: "3300–1300 BCE",
    description: "One of the world's earliest urban civilizations known for advanced city planning",
    highlights: ["Harappa", "Mohenjo-daro", "Advanced drainage systems", "Standardized weights and measures"],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Indus_Valley_Civilisation",
    examples: [
      {
        id: "period-1",
        name: "Harappa Archaeological Site",
        imageUrl: "https://images.unsplash.com/photo-1482881497185-d4a9ddbe4151?q=80&w=1000",
        description: "Ancient city ruins showcasing the sophisticated urban planning of the Indus Valley Civilization."
      }
    ]
  },
  {
    name: "Mughal Empire",
    period: "1526–1857",
    description: "Islamic empire that ruled most of the Indian subcontinent, known for architectural marvels",
    highlights: ["Taj Mahal", "Administrative reforms", "Cultural synthesis", "Architectural achievements"],
    wikipediaUrl: "https://en.wikipedia.org/wiki/Mughal_Empire",
    examples: [
      {
        id: "period-2",
        name: "Taj Mahal",
        imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
        description: "The crown jewel of Mughal architecture, built by Shah Jahan as a mausoleum for his wife Mumtaz Mahal."
      }
    ]
  }
];

// Mock heritage data for exploration features
export interface HeritageItem {
  id: string;
  title: string;
  location: {
    state: string;
    city: string;
  };
  category: string;
  era: string;
  imageUrl: string;
  description: string;
}

export const mockHeritageData: HeritageItem[] = [
  {
    id: "1",
    title: "Taj Mahal",
    location: { state: "Uttar Pradesh", city: "Agra" },
    category: "Tombs",
    era: "Mughal Empire",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
    description: "Iconic marble mausoleum built by Shah Jahan"
  },
  {
    id: "2", 
    title: "Red Fort",
    location: { state: "Delhi", city: "Delhi" },
    category: "Forts",
    era: "Mughal Empire",
    imageUrl: "https://images.unsplash.com/photo-1587474260584-136574528045?q=80&w=1000",
    description: "Historic fortified palace of the Mughal emperors"
  },
  {
    id: "3",
    title: "Mysore Palace",
    location: { state: "Karnataka", city: "Mysore" },
    category: "Palaces", 
    era: "British Colonial Era",
    imageUrl: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1000",
    description: "Royal residence of the Wadiyar dynasty"
  }
];
