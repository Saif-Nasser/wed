export interface ScheduleItem {
  time: string;
  title: string;
  description: string;
  iconName: "rings" | "sparkles" | "glass" | "utensils" | "music";
}

export const INVITATION_CONFIG = {
  couple: {
    bride: "Lina",
    groom: "Khaled",
    shortNames: "Lina & Khaled",
    initials: "L & K",
    monogram: "L 💍 K",
    hashtag: "#LinaAndKhaled",
    tagline: "Together with their families, invite you to celebrate their engagement",
  },
  event: {
    type: "Engagement Celebration",
    date: "Tomorrow, Friday, October 23, 2026",
    isoDate: "2026-10-23T20:00:00", // Tomorrow at 8:00 PM
    time: "8:00 PM – 11:00 PM",
    venueName: "West Arabella",
    address: "West Arabella",
    googleMapsUrl: "https://maps.app.goo.gl/DsjotSRt6CJiZLBE7",
    qrCodeImage: "/location-qr.png",
  },
  schedule: [
    {
      time: "08:00 PM",
      title: "Celebration Begins & Welcome",
      description: "Arrival of beloved family and friends, welcome refreshments, and the commencement of the engagement celebration.",
      iconName: "sparkles",
    },
    {
      time: "11:00 PM",
      title: "Celebration Finale & Sweet Farewell",
      description: "Closing joyful toasts, photos with the couple, and a memorable conclusion to an unforgettable evening.",
      iconName: "rings",
    },
  ] as ScheduleItem[],
  calendar: {
    title: "Lina & Khaled's Engagement Celebration",
    description: "Join us in celebrating the engagement of Lina & Khaled at West Arabella.",
    location: "West Arabella (https://maps.app.goo.gl/DsjotSRt6CJiZLBE7)",
    startTime: "20261023T200000",
    endTime: "20261023T230000",
  },
};
