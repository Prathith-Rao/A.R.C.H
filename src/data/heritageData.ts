
export const statesData = [
  "Rajasthan", "Tamil Nadu", "Kerala", "Maharashtra", "Gujarat", 
  "Karnataka", "Uttar Pradesh", "West Bengal", "Madhya Pradesh", 
  "Odisha", "Delhi", "Punjab", "Assam", "Nagaland"
];

export const architectureCategories = [
  { name: "Temples", icon: "🏛️", description: "Ancient and modern temple architecture" },
  { name: "Forts", icon: "🏰", description: "Historic fortifications and defensive structures" },
  { name: "Palaces", icon: "👑", description: "Royal residences and grand palatial complexes" },
  { name: "Stupas", icon: "⛩️", description: "Buddhist monuments and meditation structures" },
  { name: "Caves", icon: "🕳️", description: "Rock-cut architecture and cave temples" },
  { name: "Mosques", icon: "🕌", description: "Islamic architectural marvels" },
  { name: "Churches", icon: "⛪", description: "Christian religious architecture" },
  { name: "Colonial Buildings", icon: "🏢", description: "British and European colonial structures" },
  { name: "Stepwells", icon: "🌊", description: "Ancient water conservation structures" },
  { name: "Tombs", icon: "⚰️", description: "Mausoleums and burial monuments" }
];

export const artCategories = [
  { name: "Madhubani", region: "Bihar", description: "Traditional folk art with geometric patterns" },
  { name: "Pattachitra", region: "Odisha", description: "Cloth-based scroll painting" },
  { name: "Tanjore", region: "Tamil Nadu", description: "Gold leaf embossed paintings" },
  { name: "Warli", region: "Maharashtra", description: "Tribal art with simple motifs" },
  { name: "Miniature Paintings", region: "Rajasthan", description: "Detailed small-scale paintings" },
  { name: "Mughal Art", region: "North India", description: "Persian-influenced court art" },
  { name: "Rajput Art", region: "Rajasthan", description: "Royal court paintings" },
  { name: "Gond Painting", region: "Madhya Pradesh", description: "Tribal art with dots and lines" },
  { name: "Kalamkari", region: "Andhra Pradesh", description: "Hand-painted textile art" },
  { name: "Phad", region: "Rajasthan", description: "Scroll paintings of folk deities" }
];

export const famousBattles = [
  {
    name: "Battle of Panipat",
    years: "1526 / 1556 / 1761",
    description: "Three major battles fought in Panipat, crucial in shaping Indian history.",
    significance: "Established Mughal rule and later led to British dominance"
  },
  {
    name: "Battle of Haldighati",
    years: "1576",
    description: "Between Maharana Pratap and Akbar's army led by Man Singh.",
    significance: "Symbol of Rajput resistance against Mughal expansion"
  },
  {
    name: "Anglo-Mysore Wars",
    years: "1767–1799",
    description: "Four battles between Tipu Sultan and British forces.",
    significance: "Marked the beginning of British territorial expansion in South India"
  },
  {
    name: "Kalinga War",
    years: "261 BCE",
    description: "A brutal war led by Emperor Ashoka, which changed his path to Buddhism.",
    significance: "Led to Ashoka's conversion to Buddhism and spread of non-violence"
  }
];

export const culturalElements = [
  { name: "Festivals", icon: "🎉", description: "Diverse celebrations across regions" },
  { name: "Dance Forms", icon: "💃", description: "Classical and folk dance traditions" },
  { name: "Languages", icon: "🗣️", description: "22 official languages and hundreds of dialects" },
  { name: "Costumes", icon: "👘", description: "Traditional attire and regional clothing" },
  { name: "Folk Music", icon: "🎵", description: "Regional musical traditions and instruments" },
  { name: "Crafts & Weaving Styles", icon: "🧵", description: "Traditional handicrafts and textiles" },
  { name: "Food Heritage", icon: "🍛", description: "Diverse culinary traditions" },
  { name: "Mythologies & Epics", icon: "📚", description: "Ancient stories and legends" },
  { name: "Martial Arts", icon: "🥋", description: "Traditional fighting forms like Kalaripayattu" }
];

export const timelinePeriods = [
  {
    name: "Indus Valley Civilization",
    period: "3300–1300 BCE",
    description: "One of the world's earliest urban civilizations",
    highlights: ["Harappa", "Mohenjo-daro", "Advanced drainage systems"]
  },
  {
    name: "Maurya Dynasty",
    period: "321–185 BCE",
    description: "First pan-Indian empire under Chandragupta Maurya",
    highlights: ["Ashoka's edicts", "Buddhist expansion", "Administrative system"]
  },
  {
    name: "Gupta Empire",
    period: "320–550 CE",
    description: "Golden Age of Indian culture and science",
    highlights: ["Mathematical discoveries", "Literature", "Art and sculpture"]
  },
  {
    name: "Chola Dynasty",
    period: "300s BCE – 1279 CE",
    description: "Maritime empire in South India",
    highlights: ["Naval power", "Temple architecture", "Trade networks"]
  },
  {
    name: "Mughal Empire",
    period: "1526–1857",
    description: "Islamic empire that ruled most of the Indian subcontinent",
    highlights: ["Taj Mahal", "Administrative reforms", "Cultural synthesis"]
  },
  {
    name: "British Colonial Era",
    period: "1858–1947",
    description: "Period of British rule in India",
    highlights: ["Railway system", "Independence movement", "Educational reforms"]
  },
  {
    name: "Post-Independence",
    period: "1947–Present",
    description: "Modern India as a sovereign nation",
    highlights: ["Democratic republic", "Economic growth", "Technological advancement"]
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
