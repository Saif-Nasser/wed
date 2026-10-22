"use client";

import React from "react";
import FloatingParticles from "@/components/FloatingParticles";
import AudioPlayer from "@/components/AudioPlayer";
import WaxSealHero from "@/components/WaxSealHero";
import CountdownTimer from "@/components/CountdownTimer";
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

        {/* Order of Events (8:00 PM start, 11:00 PM end) */}
        <EventSchedule />

        {/* Venue, Map, and Location QR Code */}
        <VenueLocation />

        {/* Interactive RSVP Form */}
        <RsvpSection />

        {/* Footer */}
        <Footer />
      </div>
    </main>
  );
}
