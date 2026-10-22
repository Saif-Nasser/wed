"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function OurStory() {
  return (
    <section id="story" className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-400 font-serif mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>Chapter by Chapter</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-normal text-cream-50 gold-gradient-text"
        >
          Our Love Story
        </motion.h2>

        {/* Ornate Divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-3 my-4"
        >
          <div className="w-16 h-px bg-gold-500/40" />
          <Heart className="w-4 h-4 text-gold-400 fill-gold-400/20" />
          <div className="w-16 h-px bg-gold-500/40" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-serif italic text-cream-300/80 text-sm sm:text-base max-w-xl mx-auto"
        >
          &ldquo;Whatever our souls are made of, his and mine are the same.&rdquo;
        </motion.p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Center vertical connector line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-gold-500/40 to-transparent -translate-x-1/2" />

        <div className="space-y-12">
          {INVITATION_CONFIG.story.map((milestone, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={milestone.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Milestone Card */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                  <div
                    className={`relative p-6 sm:p-8 rounded-lg bg-noir-800/80 gold-card-border group hover:border-gold-400/70 transition-all duration-300 ${
                      isEven ? "md:text-left" : "md:text-right"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-sans uppercase tracking-widest bg-gold-500/10 text-gold-300 border border-gold-500/30 mb-3">
                      {milestone.year} • {milestone.tag}
                    </span>

                    <h3 className="font-serif text-xl sm:text-2xl text-cream-100 font-normal mb-2 group-hover:text-gold-200 transition-colors">
                      {milestone.title}
                    </h3>

                    <p className="text-sm text-cream-300/80 leading-relaxed font-sans">
                      {milestone.description}
                    </p>
                  </div>
                </div>

                {/* Glowing Center Node */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-noir-900 border-2 border-gold-400 flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.4)] z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
