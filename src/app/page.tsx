"use client";

import React from "react";
import FloatingParticles from "@/components/FloatingParticles";
import AudioPlayer from "@/components/AudioPlayer";
import WaxSealHero from "@/components/WaxSealHero";
import CountdownTimer from "@/components/CountdownTimer";
import OurStory from "@/components/OurStory";
import EventSchedule from "@/components/EventSchedule";
import VenueLocation from "@/components/VenueLocation";
import RsvpSection from "@/components/RsvpSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0B0D0F] text-[#F7F3EB] selection:bg-gold-500 selection:text-noir-900 overflow-x-hidden">
      {/* Interactive gold dust & petal canvas */}
      <FloatingParticles />

      {/* Floating classical music accompaniment */}
      <AudioPlayer />

      {/* Hero Section with Grand Wax Seal & Opening */}
      <WaxSealHero />

      {/* Target anchor for smooth scroll from Wax Seal */}
      <div id="invitation-body">
        {/* Live Countdown Clock */}
        <CountdownTimer />

        {/* Story / Milestones */}
        <OurStory />

        {/* Ceremony & Reception Schedule */}
        <EventSchedule />

        {/* Venue, Map, Calendar, and Dress Code */}
        <VenueLocation />

        {/* Interactive RSVP Form with Supabase persistence */}
        <RsvpSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
