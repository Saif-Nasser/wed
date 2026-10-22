"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink, Sparkles, QrCode, Check } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";
import Image from "next/image";

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
    link.setAttribute(
      "download",
      `${INVITATION_CONFIG.couple.shortNames.replace(/\s+/g, "-")}-Engagement.ics`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCalendarDownloaded(true);
    setTimeout(() => setCalendarDownloaded(false), 3000);
  };

  return (
    <section id="venue" className="relative py-24 px-4 max-w-4xl mx-auto">
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
          Location & Directions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-sm sm:text-base text-cream-300/80 font-serif italic mt-3 max-w-md mx-auto"
        >
          We look forward to welcoming you to celebrate this joyous occasion at {INVITATION_CONFIG.event.venueName}.
        </motion.p>
      </div>

      {/* Main Location Card with QR Code */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative p-8 sm:p-12 rounded-xl bg-noir-800/85 gold-card-border overflow-hidden"
      >
        {/* Ornate corner accents */}
        <div className="ornate-corner-tl" />
        <div className="ornate-corner-tr" />
        <div className="ornate-corner-bl" />
        <div className="ornate-corner-br" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left Details */}
          <div>
            <div className="w-12 h-12 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center mb-6">
              <MapPin className="w-6 h-6 text-gold-400" />
            </div>

            <span className="text-xs font-serif uppercase tracking-[0.25em] text-gold-400/90">
              The Venue
            </span>

            <h3 className="font-serif text-3xl sm:text-4xl text-cream-100 font-normal mt-1 mb-3">
              {INVITATION_CONFIG.event.venueName}
            </h3>

            <p className="text-sm text-cream-300/80 font-sans leading-relaxed mb-6">
              Join us for an enchanting evening from 8:00 PM to 11:00 PM.
            </p>

            <div className="p-4 rounded-lg bg-noir-900/70 border border-gold-500/20 text-xs text-cream-200/90 space-y-1 mb-8">
              <p className="font-semibold text-gold-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Arrival & Parking</span>
              </p>
              <p>Valet and designated guest parking are conveniently available upon arrival at West Arabella.</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={INVITATION_CONFIG.event.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 text-noir-900 hover:from-gold-400 hover:to-gold-300 transition-all text-xs font-sans font-semibold shadow-md shadow-gold-500/20"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>

              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-noir-900 border border-gold-500/30 text-cream-200 hover:border-gold-400 hover:text-gold-200 transition-all text-xs font-sans font-medium"
              >
                <Calendar className="w-3.5 h-3.5 text-gold-400" />
                <span>Google Calendar</span>
              </a>

              <button
                onClick={downloadIcs}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-noir-900 border border-gold-500/30 text-cream-200 hover:border-gold-400 hover:text-gold-200 transition-all text-xs font-sans font-medium"
              >
                {calendarDownloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-300">Saved to Calendar!</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    <span>iCal (.ics)</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Prominent QR Code */}
          <div className="flex flex-col items-center justify-center text-center p-6 rounded-xl bg-noir-900/80 border border-gold-500/30 shadow-xl shadow-gold-500/5">
            <div className="inline-flex items-center gap-1.5 text-xs font-serif uppercase tracking-widest text-gold-400 mb-4">
              <QrCode className="w-4 h-4 text-gold-400" />
              <span>Scan For Directions</span>
            </div>

            {/* QR Image with luxury gold border */}
            <div className="relative p-3 rounded-lg bg-white border-2 border-gold-400 shadow-[0_0_25px_rgba(212,175,55,0.25)] group hover:scale-105 transition-transform duration-300">
              <Image
                src="/location-qr.png"
                alt="West Arabella Location QR Code"
                width={190}
                height={190}
                className="rounded"
                priority
              />
            </div>

            <p className="text-xs text-cream-300/80 font-sans mt-4 max-w-[220px]">
              Scan with your phone&apos;s camera to open location directly in Google Maps.
            </p>

            <a
              href={INVITATION_CONFIG.event.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 px-4 py-2 rounded-full bg-gold-500/15 hover:bg-gold-500/25 border border-gold-400/50 text-gold-300 text-xs font-sans inline-flex items-center gap-1.5 transition-all max-w-full"
            >
              <MapPin className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
              <span className="font-medium">Open in Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70 flex-shrink-0" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
