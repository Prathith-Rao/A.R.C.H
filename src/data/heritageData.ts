
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
        imageFolder: "/images/heritage/temples/meenakshi/",
        imageUrl: "/images/heritage/temples/meenakshi/1.jpg",
        description: "A historic Hindu temple dedicated to Goddess Meenakshi, known for its stunning Dravidian architecture and colorful gopurams.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Meenakshi_Temple"
      },
      {
        id: "temple-2",
        name: "Golden Temple",
        location: "Amritsar, Punjab",
        imageFolder: "/images/heritage/temples/golden-temple/",
        imageUrl: "/images/heritage/temples/golden-temple/1.jpg",
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
        imageFolder: "/images/heritage/forts/red-fort/",
        imageUrl: "/images/heritage/forts/red-fort/1.jpg",
        description: "A historic fortified palace that served as the main residence of the Mughal emperors for nearly 200 years.",
        wikipediaUrl: "https://en.wikipedia.org/wiki/Red_Fort"
      },
      {
        id: "fort-2",
        name: "Chittorgarh Fort",
        location: "Rajasthan",
        imageFolder: "/images/heritage/forts/chittorgarh/",
        imageUrl: "/images/heritage/forts/chittorgarh/1.jpg",
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
        imageFolder: "/images/heritage/palaces/city-palace/",
        imageUrl: "/images/heritage/palaces/city-palace/1.jpg",
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
        imageFolder: "/images/heritage/art/madhubani/",
        imageUrl: "/images/heritage/art/madhubani/1.jpg",
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
        imageFolder: "/images/heritage/art/warli/",
        imageUrl: "/images/heritage/art/warli/1.jpg",
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
        imageFolder: "/images/heritage/battles/panipat/",
        imageUrl: "/images/heritage/battles/panipat/1.jpg"
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
        imageFolder: "/images/heritage/battles/haldighati/",
        imageUrl: "/images/heritage/battles/haldighati/1.jpg"
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
        imageFolder: "/images/heritage/culture/festivals/diwali/",
        imageUrl: "/images/heritage/culture/festivals/diwali/1.jpg",
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
        imageFolder: "/images/heritage/culture/dance/bharatanatyam/",
        imageUrl: "/images/heritage/culture/dance/bharatanatyam/1.jpg",
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
        imageFolder: "/images/heritage/timeline/indus-valley/",
        imageUrl: "/images/heritage/timeline/indus-valley/1.jpg",
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
        imageFolder: "/images/heritage/timeline/mughal/",
        imageUrl: "/images/heritage/timeline/mughal/1.jpg",
        description: "The crown jewel of Mughal architecture, built by Shah Jahan as a mausoleum for his wife Mumtaz Mahal."
      }
    ]
  }
];

// Enhanced heritage data interface for better search functionality
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
  imageFolder?: string;
  description: string;
  keywords?: string[];
  period?: string;
  significance?: string;
  artist?: string;
  region?: string;
}

// Enhanced mock heritage data with more comprehensive search fields and folder paths
export const mockHeritageData: HeritageItem[] = [
  {
    id: "1",
    title: "Taj Mahal",
    location: { state: "Uttar Pradesh", city: "Agra" },
    category: "Tombs",
    era: "Mughal Empire",
    imageFolder: "/images/heritage/mock/taj-mahal/",
    imageUrl: "/images/heritage/mock/taj-mahal/1.jpg",
    description: "Iconic marble mausoleum built by Shah Jahan",
    keywords: ["marble", "mausoleum", "Shah Jahan", "Mumtaz Mahal", "UNESCO", "wonder", "love"],
    period: "1632-1653",
    significance: "Symbol of eternal love and architectural masterpiece"
  },
  {
    id: "2", 
    title: "Red Fort",
    location: { state: "Delhi", city: "Delhi" },
    category: "Forts",
    era: "Mughal Empire",
    imageFolder: "/images/heritage/mock/red-fort/",
    imageUrl: "/images/heritage/mock/red-fort/1.jpg",
    description: "Historic fortified palace of the Mughal emperors",
    keywords: ["Lal Qila", "fortified", "palace", "emperor", "independence", "flag"],
    period: "1638-1648",
    significance: "Symbol of Mughal power and Indian independence"
  },
  {
    id: "3",
    title: "Mysore Palace",
    location: { state: "Karnataka", city: "Mysore" },
    category: "Palaces", 
    era: "British Colonial Era",
    imageFolder: "/images/heritage/mock/mysore-palace/",
    imageUrl: "/images/heritage/mock/mysore-palace/1.jpg",
    description: "Royal residence of the Wadiyar dynasty",
    keywords: ["royal", "Wadiyar", "Dussehra", "illumination", "architecture"],
    period: "1912",
    significance: "Example of Indo-Saracenic architecture"
  },
  {
    id: "4",
    title: "Meenakshi Temple",
    location: { state: "Tamil Nadu", city: "Madurai" },
    category: "Temples",
    era: "Ancient Period",
    imageFolder: "/images/heritage/mock/meenakshi-temple/",
    imageUrl: "/images/heritage/mock/meenakshi-temple/1.jpg",
    description: "Historic Hindu temple with stunning Dravidian architecture",
    keywords: ["Dravidian", "gopuram", "Hindu", "goddess", "colorful", "ancient"],
    period: "6th century CE",
    significance: "Masterpiece of Dravidian temple architecture"
  },
  {
    id: "5",
    title: "Golden Temple",
    location: { state: "Punjab", city: "Amritsar" },
    category: "Temples",
    era: "Sikh Period",
    imageFolder: "/images/heritage/mock/golden-temple/",
    imageUrl: "/images/heritage/mock/golden-temple/1.jpg",
    description: "Holiest Gurdwara of Sikhism with gold-plated architecture",
    keywords: ["Gurdwara", "Sikh", "gold", "Amrit Sarovar", "langar", "holy"],
    period: "1604",
    significance: "Spiritual center of Sikhism"
  }
];

// Create a comprehensive search dataset combining all heritage items
export const getAllHeritageItems = (): HeritageItem[] => {
  const allItems: HeritageItem[] = [...mockHeritageData];

  // Add items from architecture categories
  architectureCategories.forEach(category => {
    category.examples?.forEach(example => {
      const [city, state] = example.location.split(', ');
      allItems.push({
        id: example.id,
        title: example.name,
        location: { state: state || 'India', city: city || 'Unknown' },
        category: category.name,
        era: 'Historical Period',
        imageUrl: example.imageUrl,
        imageFolder: example.imageFolder,
        description: example.description,
        keywords: [category.name.toLowerCase(), 'architecture', 'heritage']
      });
    });
  });

  // Add items from art categories
  artCategories.forEach(category => {
    category.examples?.forEach(example => {
      allItems.push({
        id: example.id,
        title: example.name,
        location: { state: category.region, city: category.region },
        category: 'Art',
        era: 'Traditional Period',
        imageUrl: example.imageUrl,
        imageFolder: example.imageFolder,
        description: example.description,
        artist: example.artist,
        region: category.region,
        keywords: [category.name.toLowerCase(), 'art', 'folk', 'traditional']
      });
    });
  });

  // Add items from timeline periods
  timelinePeriods.forEach(period => {
    period.examples?.forEach(example => {
      allItems.push({
        id: example.id,
        title: example.name,
        location: { state: 'India', city: 'Various' },
        category: 'Historical Site',
        era: period.name,
        imageUrl: example.imageUrl,
        imageFolder: example.imageFolder,
        description: example.description,
        period: period.period,
        keywords: [period.name.toLowerCase(), 'historical', 'civilization', 'period']
      });
    });
  });

  // Add items from famous battles
  famousBattles.forEach(battle => {
    battle.examples?.forEach(example => {
      allItems.push({
        id: example.id,
        title: example.name,
        location: { state: 'India', city: 'Battlefield' },
        category: 'Historical Battle',
        era: battle.years,
        imageUrl: example.imageUrl,
        imageFolder: example.imageFolder,
        description: example.description,
        significance: battle.significance,
        keywords: [battle.name.toLowerCase(), 'battle', 'war', 'historical']
      });
    });
  });

  // Add items from cultural elements
  culturalElements.forEach(element => {
    element.examples?.forEach(example => {
      allItems.push({
        id: example.id,
        title: example.name,
        location: { state: example.region || 'India', city: example.region || 'Various' },
        category: element.name,
        era: 'Cultural Tradition',
        imageUrl: example.imageUrl,
        imageFolder: example.imageFolder,
        description: example.description,
        region: example.region,
        keywords: [element.name.toLowerCase(), 'culture', 'tradition', 'festival']
      });
    });
  });

  return allItems;
};
