
export interface HeritageItem {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  images: string[];
  location: {
    state: string;
    city: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  era: string;
  category: string;
  subcategory: string;
  tags: string[];
  significance: string;
  architecturalStyle?: string;
  culturalImportance?: string;
  featured: boolean;
  trending: boolean;
  dateAdded: string;
}

export const mockHeritageData: HeritageItem[] = [
  {
    id: "1",
    title: "Taj Mahal",
    description: "The Taj Mahal is an ivory-white marble mausoleum on the southern bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favourite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself.",
    shortDescription: "An iconic marble mausoleum built by Emperor Shah Jahan in memory of his beloved wife.",
    imageUrl: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=1000",
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=1000",
      "https://images.unsplash.com/photo-1585135497273-1a86b09fe70e?q=80&w=1000"
    ],
    location: {
      state: "Uttar Pradesh",
      city: "Agra",
      coordinates: {
        latitude: 27.1751,
        longitude: 78.0421
      }
    },
    era: "Mughal Empire",
    category: "Monument",
    subcategory: "Mausoleum",
    tags: ["UNESCO World Heritage", "Seven Wonders", "Marble", "Islamic Architecture"],
    significance: "The Taj Mahal is considered to be the greatest architectural achievement in the whole range of Indo-Islamic architecture.",
    architecturalStyle: "Mughal Architecture",
    culturalImportance: "Symbol of eternal love and a testament to the rich history of the Mughal Empire in India.",
    featured: true,
    trending: true,
    dateAdded: "2023-01-01T00:00:00.000Z"
  },
  {
    id: "2",
    title: "Hawa Mahal",
    description: "Hawa Mahal (Palace of Winds) is a palace in Jaipur, India, built from red and pink sandstone. The structure was built in 1799 by Maharaja Sawai Pratap Singh with its unique five-story exterior resembling a honeycomb with 953 small windows.",
    shortDescription: "A palace known for its honeycomb facade with 953 small windows designed to let cool air pass through.",
    imageUrl: "https://images.unsplash.com/photo-1599661046827-9deb586a2d2d?q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1599661046827-9deb586a2d2d?q=80&w=1000",
      "https://images.unsplash.com/photo-1598924957326-0446ac30341a?q=80&w=1000"
    ],
    location: {
      state: "Rajasthan",
      city: "Jaipur",
      coordinates: {
        latitude: 26.9239,
        longitude: 75.8267
      }
    },
    era: "Rajput Era",
    category: "Monument",
    subcategory: "Palace",
    tags: ["Pink City", "Rajput Architecture", "Royal Heritage"],
    significance: "An excellent example of Rajput architecture and artistry with its cultural and historical significance in Jaipur's heritage.",
    architecturalStyle: "Rajput Architecture",
    culturalImportance: "Represents the rich cultural heritage and architectural innovation of the Rajput era.",
    featured: true,
    trending: false,
    dateAdded: "2023-01-05T00:00:00.000Z"
  },
  {
    id: "3",
    title: "Khajuraho Group of Monuments",
    description: "The Khajuraho Group of Monuments is a group of Hindu temples and Jain temples in Chhatarpur district, Madhya Pradesh, India, famous for their nagara-style architectural symbolism and their sculptures.",
    shortDescription: "A UNESCO World Heritage site known for temples adorned with intricate sculptures depicting various aspects of life.",
    imageUrl: "https://images.unsplash.com/photo-1668779459767-79ab42de57d7?q=80&w=1000",
    images: [
      "https://images.unsplash.com/photo-1668779459767-79ab42de57d7?q=80&w=1000",
      "https://images.unsplash.com/photo-1624363407802-52a5f3952dac?q=80&w=1000"
    ],
    location: {
      state: "Madhya Pradesh",
      city: "Khajuraho",
      coordinates: {
        latitude: 24.8318,
        longitude: 79.9199
      }
    },
    era: "Medieval Period",
    category: "Monument",
    subcategory: "Temple",
    tags: ["UNESCO World Heritage", "Hindu Temples", "Nagara Architecture", "Sculptures"],
    significance: "These temples represent one of the finest examples of Indian art and architecture.",
    architecturalStyle: "Nagara Architecture",
    culturalImportance: "Represents the harmonious integration of art, architecture, and philosophical beliefs of ancient India.",
    featured: false,
    trending: true,
    dateAdded: "2023-02-10T00:00:00.000Z"
  }
];
