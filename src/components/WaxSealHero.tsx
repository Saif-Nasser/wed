"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Calendar, MapPin, Sparkles, Heart } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function WaxSealHero() {
  const [sealOpened, setSealOpened] = useState(false);

  const handleOpenInvitation = () => {
    setSealOpened(true);
    const target = document.getElementById("invitation-body");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-[#0e1217] via-[#0b0d0f] to-[#090b0d]">
      {/* Subtle radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold-500/10 via-transparent to-transparent pointer-events-none" />

      {/* Ornate corner frame */}
      <div className="absolute inset-4 sm:inset-8 border border-gold-500/20 pointer-events-none rounded-sm">
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />
      </div>

      <div className="relative z-20 max-w-3xl mx-auto flex flex-col items-center">
        {/* Monogram Crest */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative mb-6"
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-gold-500/40 flex items-center justify-center p-1.5 shadow-[0_0_30px_rgba(212,175,55,0.25)]">
            <div className="w-full h-full rounded-full border border-dashed border-gold-400/50 flex flex-col items-center justify-center bg-noir-800/60 backdrop-blur-md">
              <span className="font-script text-2xl sm:text-3xl text-gold-300">
                {INVITATION_CONFIG.couple.initials}
              </span>
              <div className="w-8 h-px bg-gold-500/40 my-0.5" />
              <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/30" />
            </div>
          </div>
          <span className="absolute -bottom-2 bg-noir-900 border border-gold-500/40 text-[10px] tracking-widest uppercase px-2 py-0.5 rounded text-gold-300 font-sans">
            EST. 2026
          </span>
        </motion.div>

        {/* Top Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] text-gold-400/90 font-serif mb-4"
        >
          Together with their families
        </motion.p>

        {/* Main Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-4"
        >
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide gold-shimmer-text leading-tight">
            {INVITATION_CONFIG.couple.bride}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2">
            <div className="w-12 sm:w-20 h-px bg-gradient-to-r from-transparent to-gold-400/60" />
            <span className="font-script text-3xl sm:text-4xl text-gold-300">&</span>
            <div className="w-12 sm:w-20 h-px bg-gradient-to-l from-transparent to-gold-400/60" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide gold-shimmer-text leading-tight">
            {INVITATION_CONFIG.couple.groom}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-sm sm:text-base text-cream-200/80 font-serif italic max-w-lg mb-8"
        >
          Request the pleasure of your company at the celebration of their engagement ceremony & future union
        </motion.p>

        {/* Date & Location Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-cream-100 font-sans mb-10"
        >
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-noir-800/80 border border-gold-500/30 backdrop-blur-sm">
            <Calendar className="w-4 h-4 text-gold-400" />
            <span>{INVITATION_CONFIG.event.date}</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-noir-800/80 border border-gold-500/30 backdrop-blur-sm">
            <MapPin className="w-4 h-4 text-gold-400" />
            <span>{INVITATION_CONFIG.event.venueName}</span>
          </div>
        </motion.div>

        {/* Interactive Wax Seal Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="relative"
        >
          <button
            onClick={handleOpenInvitation}
            className="group relative flex flex-col items-center justify-center transition-transform active:scale-95 focus:outline-none"
          >
            {/* The Wax Seal disc */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#7A1D2C] via-[#631422] to-[#400B15] border-2 border-[#A83244] shadow-[0_10px_25px_rgba(100,20,30,0.6)] flex items-center justify-center text-[#F9D77E] animate-seal-pulse group-hover:scale-105 transition-all duration-300">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-dashed border-[#F9D77E]/40 flex flex-col items-center justify-center text-center p-2">
                <Sparkles className="w-4 h-4 text-[#F9D77E] mb-0.5" />
                <span className="text-[10px] sm:text-xs font-serif font-bold uppercase tracking-wider text-[#F9D77E]">
                  {sealOpened ? "Opened" : "Open"}
                </span>
                <span className="text-[8px] tracking-widest text-[#F9D77E]/80">SEAL</span>
              </div>
            </div>

            <span className="mt-3 text-xs tracking-widest uppercase text-gold-400/80 group-hover:text-gold-300 font-sans transition-colors">
              Click to Open Invitation
            </span>
          </button>
        </motion.div>

        {/* Down Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="mt-12 text-gold-500/60"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </div>
    </section>
  );
}
