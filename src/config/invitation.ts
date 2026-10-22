export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: "rings" | "sparkles" | "glass" | "utensils" | "music";
}

export interface StoryMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}

export interface DressCodePalette {
  name: string;
  color: string;
  border?: string;
}

export const INVITATION_CONFIG = {
  couple: {
    bride: "Lina",
    groom: "Khaled",
    shortNames: "Lina & Khaled",
    initials: "L & K",
    monogram: "L 💍 K",
    hashtag: "#LinaAndKhaled2026",
    tagline: "Together with their families, invite you to celebrate their engagement",
  },
  event: {
    type: "Engagement Ceremony & Celebration",
    date: "Saturday, November 28, 2026",
    isoDate: "2026-11-28T17:00:00", // ISO string for countdown
    time: "5:00 PM onwards",
    venueName: "The Grand Rosewood Glasshouse & Gardens",
    address: "742 Evergreen Bel-Air Boulevard, Beverly Hills, CA 90210",
    googleMapsUrl: "https://maps.google.com/?q=The+Rosewood+Glasshouse+Beverly+Hills",
  },
  schedule: [
    {
      time: "05:00 PM",
      title: "Welcome & Champagne Reception",
      description: "Arrival of esteemed guests with sparkling refreshments, live harpist, and hors d'œuvres in the glasshouse courtyard.",
      iconName: "glass",
    },
    {
      time: "06:00 PM",
      title: "The Engagement Ceremony & Ring Exchange",
      description: "A timeless exchange of promises and rings surrounded by candlelight, golden arches, and loved ones.",
      iconName: "rings",
    },
    {
      time: "07:15 PM",
      title: "Royal Banquet & Speeches",
      description: "A gourmet 4-course candlelit dinner accompanied by heartwarming toasts from family and closest friends.",
      iconName: "utensils",
    },
    {
      time: "09:00 PM",
      title: "Celebration Dance & Soirée",
      description: "Music, dancing under the stars, cake cutting ceremony, bespoke cocktail bar, and endless celebration.",
      iconName: "music",
    },
  ] as ScheduleItem[],
  story: [
    {
      year: "Spring 2022",
      title: "The First Glimpse",
      description: "An unexpected encounter sparked an unforgettable conversation that lasted for hours and felt as though they had known each other for lifetimes.",
      tag: "Serendipity",
    },
    {
      year: "Autumn 2024",
      title: "The Journey Together",
      description: "From exploring new horizons to sharing quiet evening moments dreaming together, their bond grew deeper with each passing season.",
      tag: "Adventures",
    },
    {
      year: "Summer 2026",
      title: "The Sunset Proposal",
      description: "Under a breathtaking golden sunset, Khaled knelt and asked the question that made eternity begin, and Lina joyfully said yes.",
      tag: "She Said Yes",
    },
  ] as StoryMilestone[],
  dressCode: {
    theme: "Black Tie & Elegant Evening Attire",
    description: "We warmly invite our guests to dress in formal, timeless evening attire. Classic black, champagne gold, deep emerald, and midnight hues are encouraged.",
    palettes: [
      { name: "Champagne Gold", color: "#D4AF37" },
      { name: "Midnight Charcoal", color: "#1A1D20" },
      { name: "Royal Emerald", color: "#12372E" },
      { name: "Ivory Pearl", color: "#F7F3EB", border: "#D4AF37" },
      { name: "Warm Rosewood", color: "#591F2B" },
    ] as DressCodePalette[],
  },
  contact: {
    email: "concierge@lina-khaled.com",
    phone: "+1 (555) 742-2026",
  },
  calendar: {
    title: "Lina & Khaled's Engagement Ceremony",
    description: "Join us in celebrating the engagement ceremony of Lina & Khaled at The Grand Rosewood Glasshouse.",
    location: "The Grand Rosewood Glasshouse, Beverly Hills, CA",
    startTime: "20261128T170000",
    endTime: "20261128T233000",
  },
};
