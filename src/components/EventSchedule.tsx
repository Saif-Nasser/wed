"use client";

import React from "react";
import { motion } from "framer-motion";
import { Wine, Sparkles, Utensils, Music, HeartHandshake } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function EventSchedule() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "glass":
        return <Wine className="w-5 h-5 text-gold-400" />;
      case "rings":
        return <HeartHandshake className="w-5 h-5 text-gold-400" />;
      case "utensils":
        return <Utensils className="w-5 h-5 text-gold-400" />;
      case "music":
        return <Music className="w-5 h-5 text-gold-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-gold-400" />;
    }
  };

  return (
    <section id="schedule" className="relative py-24 px-4 bg-noir-900/50 border-t border-gold-500/20 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-400 font-serif mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold-400" />
            <span>Order of Events</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl font-normal text-cream-50 gold-gradient-text"
          >
            Ceremony & Celebration Program
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-cream-300/80 font-serif italic mt-3 max-w-lg mx-auto"
          >
            We have prepared an evening filled with love, laughter, fine dining, and cherished memories.
          </motion.p>
        </div>

        {/* Schedule Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INVITATION_CONFIG.schedule.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative p-6 sm:p-8 rounded-lg bg-noir-800/70 gold-card-border group hover:bg-noir-800 transition-all duration-300 overflow-hidden"
            >
              {/* Corner decor */}
              <div className="absolute top-2 right-2 w-6 h-6 border-t border-r border-gold-500/30 pointer-events-none group-hover:border-gold-400 transition-colors" />

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-noir-900 border border-gold-500/40 flex items-center justify-center group-hover:scale-110 group-hover:border-gold-300 transition-all duration-300 shadow-md shadow-gold-500/10">
                  {getIcon(item.iconName)}
                </div>

                <div className="flex-1">
                  <div className="inline-block text-xs font-serif font-semibold tracking-widest text-gold-400 uppercase mb-1">
                    {item.time}
                  </div>
                  <h3 className="font-serif text-xl text-cream-100 font-normal mb-2 group-hover:text-gold-200 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream-300/80 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
