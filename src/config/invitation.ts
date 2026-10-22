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
    bride: "Sophia Loren",
    groom: "Alexander Vance",
    shortNames: "Sophia & Alexander",
    initials: "S & A",
    monogram: "S 💍 A",
    hashtag: "#SophiaAlexanderForever",
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
      description: "Arrival of esteemed guests with sparkling champagne, live harpist, and hors d'œuvres in the glasshouse courtyard.",
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
      title: "First Dance & Celebratory Soirée",
      description: "Dancing under the stars, cake cutting ceremony, bespoke cocktail bar, and endless celebration.",
      iconName: "music",
    },
  ] as ScheduleItem[],
  story: [
    {
      year: "Spring 2022",
      title: "The First Glimpse",
      description: "An unexpected encounter in an old Parisian bookstore sparked an unforgettable conversation over espresso that lasted until the streetlamps lit up the Seine.",
      tag: "Serendipity",
    },
    {
      year: "Autumn 2024",
      title: "The Journey Together",
      description: "From exploring misty mountain trails to sharing cozy Sunday mornings baking bread and dreaming together, their souls intertwined forever.",
      tag: "Adventures",
    },
    {
      year: "Summer 2026",
      title: "The Sunset Proposal",
      description: "Under the golden sunset of Lake Como with violin music drifting on the breeze, Alexander knelt and asked the question that made eternity begin.",
      tag: "She Said Yes",
    },
  ] as StoryMilestone[],
  dressCode: {
    theme: "Black Tie & Elegant Cocktail",
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
    email: "concierge@sophia-alexander.com",
    phone: "+1 (555) 742-2026",
  },
  calendar: {
    title: "Sophia & Alexander's Engagement Ceremony",
    description: "Join us in celebrating the engagement ceremony of Sophia & Alexander at The Grand Rosewood Glasshouse.",
    location: "The Grand Rosewood Glasshouse, Beverly Hills, CA",
    startTime: "20261128T170000",
    endTime: "20261128T233000",
  },
};
