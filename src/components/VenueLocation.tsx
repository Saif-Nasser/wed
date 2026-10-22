"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, Sparkles, Shirt, Check } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function VenueLocation() {
  const [calendarDownloaded, setCalendarDownloaded] = useState(false);

  // Generate Google Calendar Link
  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    INVITATION_CONFIG.calendar.title
  )}&dates=${INVITATION_CONFIG.calendar.startTime}/${
    INVITATION_CONFIG.calendar.endTime
  }&details=${encodeURIComponent(
    INVITATION_CONFIG.calendar.description
  )}&location=${encodeURIComponent(INVITATION_CONFIG.calendar.location)}`;

  // Download iCal (.ics) file
  const downloadIcs = () => {
    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Engagement Invitation//EN",
      "BEGIN:VEVENT",
      `SUMMARY:${INVITATION_CONFIG.calendar.title}`,
      `DESCRIPTION:${INVITATION_CONFIG.calendar.description}`,
      `LOCATION:${INVITATION_CONFIG.calendar.location}`,
      `DTSTART:${INVITATION_CONFIG.calendar.startTime}`,
      `DTEND:${INVITATION_CONFIG.calendar.endTime}`,
      "STATUS:CONFIRMED",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `${INVITATION_CONFIG.couple.shortNames.replace(/\s+/g, "-")}-Engagement.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3000);
  };

  return (
    <section id="venue" className="relative py-24 px-4 max-w-5xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-400 font-serif mb-3"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>The Destination</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-3xl sm:text-5xl font-normal text-cream-50 gold-gradient-text"
        >
          Venue & Dress Code
        </motion.h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* Venue Card */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-lg bg-noir-800/80 gold-card-border flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-gold-400" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.2em] text-gold-400/90">
              The Venue
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-normal mt-1 mb-3">
              {INVITATION_CONFIG.event.venueName}
            </h3>

            <p className="text-sm text-cream-300/80 font-sans leading-relaxed mb-6">
              {INVITATION_CONFIG.event.address}
            </p>

            <div className="p-4 rounded bg-noir-900/60 border border-gold-500/20 text-xs text-cream-200/90 space-y-1 mb-8">
              <p className="font-semibold text-gold-300">Valet & Arrival</p>
              <p>Complimentary white-glove valet parking is available at the grand north entrance.</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href={INVITATION_CONFIG.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-gold-500/20 border border-gold-400/60 text-gold-300 hover:bg-gold-500 hover:text-noir-900 transition-all duration-300 text-xs font-sans font-medium"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={googleCalendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-noir-900 border border-gold-500/30 text-cream-200 hover:border-gold-400 hover:text-gold-200 transition-all duration-300 text-xs font-sans font-medium"
            >
              <Calendar className="w-3.5 h-3.5 text-gold-400" />
              <span>Google Calendar</span>
            </a>

            <button
              onClick={downloadIcs}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-noir-900 border border-gold-500/30 text-cream-200 hover:border-gold-400 hover:text-gold-200 transition-all duration-300 text-xs font-sans font-medium"
            >
              {calendarDownloaded ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-300">Saved to Calendar!</span>
                </>
              ) : (
                <>
                  <Calendar className="w-3.5 h-3.5 text-gold-400" />
                  <span>iCal / Apple (.ics)</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Dress Code Card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-8 rounded-lg bg-noir-800/80 gold-card-border flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
              <Shirt className="w-6 h-6 text-gold-400" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.2em] text-gold-400/90">
              Attire Guide
            </span>

            <h3 className="font-serif text-2xl sm:text-3xl text-cream-100 font-normal mt-1 mb-3">
              {INVITATION_CONFIG.dressCode.theme}
            </h3>

            <p className="text-sm text-cream-300/80 font-sans leading-relaxed mb-8">
              {INVITATION_CONFIG.dressCode.description}
            </p>

            {/* Color Swatches */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-gold-400/80 font-serif">
                Inspiration Color Palette
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {INVITATION_CONFIG.dressCode.palettes.map((palette) => (
                  <div
                    key={palette.name}
                    className="flex items-center gap-2.5 p-2 rounded bg-noir-900/50 border border-gold-500/20 group hover:border-gold-400/60 transition-all"
                  >
                    <span
                      className="w-5 h-5 rounded-full shadow-inner flex-shrink-0"
                      style={{
                        backgroundColor: palette.color,
                        border: palette.border ? `1px solid ${palette.border}` : "1px solid rgba(255,255,255,0.15)",
                      }}
                    />
                    <span className="text-xs font-sans text-cream-200 group-hover:text-gold-200 transition-colors truncate">
                      {palette.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gold-500/20 text-xs text-cream-400/70 font-serif italic text-center">
            &ldquo;Elegance is not standing out, but being remembered.&rdquo;
          </div>
        </motion.div>
      </div>
    </section>
  );
}
