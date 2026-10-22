"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { INVITATION_CONFIG } from "@/config/invitation";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Compute tomorrow at 8:00 PM (20:00:00)
    const computeTarget = () => {
      const parsed = new Date(INVITATION_CONFIG.event.isoDate).getTime();
      if (!isNaN(parsed) && parsed > Date.now()) {
        return parsed;
      }
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(20, 0, 0, 0);
      return tomorrow.getTime();
    };

    const target = computeTarget();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return null;
  }

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <section className="relative py-16 px-4 bg-noir-900/60 border-y border-gold-500/20 backdrop-blur-md">
      <div className="max-w-4xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold-400 font-serif mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Save the Date</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl text-cream-50 font-normal">
            Counting the Moments Until We Say Yes
          </h2>
        </motion.div>

        {/* Counter cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto">
          {units.map((unit, idx) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative p-4 sm:p-6 rounded-lg bg-noir-800/80 gold-card-border flex flex-col items-center justify-center group overflow-hidden"
            >
              {/* Subtle top gold accent line */}
              <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-gold-400 to-transparent opacity-60" />

              <span className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-gold-300 tracking-tight group-hover:scale-105 transition-transform duration-300">
                {String(unit.value).padStart(2, "0")}
              </span>

              <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-cream-300/70 font-sans mt-2">
                {unit.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
