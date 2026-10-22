import type { Metadata } from "next";
import "./globals.css";
import { INVITATION_CONFIG } from "@/config/invitation";

export const metadata: Metadata = {
  title: `${INVITATION_CONFIG.couple.shortNames} | Engagement Ceremony Invitation`,
  description: `You are cordially invited to celebrate the engagement ceremony of ${INVITATION_CONFIG.couple.shortNames}. Join us for an enchanting evening on ${INVITATION_CONFIG.event.date}.`,
  keywords: ["engagement", "invitation", "ceremony", "wedding", "celebration", "RSVP"],
  openGraph: {
    title: `${INVITATION_CONFIG.couple.shortNames} - Engagement Invitation`,
    description: `Save the Date: ${INVITATION_CONFIG.event.date} at ${INVITATION_CONFIG.event.venueName}`,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-gold-500 selection:text-noir-900 bg-[#0B0D0F] text-[#F7F3EB] min-h-screen">
        {children}
      </body>
    </html>
  );
}
