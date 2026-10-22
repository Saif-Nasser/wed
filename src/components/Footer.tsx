"use client";

import React from "react";
import { Heart, ArrowUp } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative py-16 px-4 bg-noir-950 border-t border-gold-500/20 text-center overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Monogram */}
        <div className="w-14 h-14 rounded-full border border-gold-500/40 flex items-center justify-center mb-4 bg-noir-900/60 shadow-lg shadow-gold-500/10">
          <span className="font-script text-2xl text-gold-300">
            {INVITATION_CONFIG.couple.initials}
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-light text-cream-100 gold-shimmer-text mb-2">
          {INVITATION_CONFIG.couple.shortNames}
        </h3>

        <p className="font-serif italic text-cream-300/70 text-sm max-w-md mb-6">
          &ldquo;We cannot wait to celebrate with all the people who hold a piece of our hearts.&rdquo;
        </p>

        <span className="inline-block px-4 py-1 rounded-full text-xs font-sans tracking-widest uppercase bg-gold-500/10 text-gold-400 border border-gold-500/30 mb-8">
          {INVITATION_CONFIG.couple.hashtag}
        </span>

        {/* Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-cream-300/80 font-serif uppercase tracking-widest mb-10">
          <a href="#schedule" className="hover:text-gold-300 transition-colors">Order of Events</a>
          <span className="text-gold-500/40">•</span>
          <a href="#venue" className="hover:text-gold-300 transition-colors">Location</a>
          <span className="text-gold-500/40">•</span>
          <a href="#rsvp" className="hover:text-gold-300 transition-colors">RSVP</a>
        </div>

        {/* Back to top button */}
        <button
          onClick={scrollToTop}
          className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-500/30 hover:border-gold-400 bg-noir-900/80 text-gold-400 hover:text-gold-300 text-xs font-sans transition-all mb-8"
        >
          <span>Return to Top</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent mb-6" />

        <p className="text-[11px] text-cream-400/50 font-sans flex items-center justify-center gap-1.5">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-red-400 fill-red-400" />
          <span>for {INVITATION_CONFIG.couple.shortNames}</span>
        </p>
      </div>
    </footer>
  );
}
