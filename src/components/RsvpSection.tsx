"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Eye,
  Info,
  CalendarCheck2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { submitRsvp, isSupabaseConfigured } from "@/lib/supabase";
import { INVITATION_CONFIG } from "@/config/invitation";
import Link from "next/link";

export default function RsvpSection() {
  const [fullName, setFullName] = useState("");
  const [isAttending, setIsAttending] = useState(true);
  const [guestSide, setGuestSide] = useState<"lady" | "gentleman" | "both">("lady");
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isLocalMode, setIsLocalMode] = useState(!isSupabaseConfigured);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setSubmitError("Please fill in your full name.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitRsvp({
      full_name: fullName.trim(),
      is_attending: isAttending,
      guest_side: guestSide,
      guest_count: isAttending ? guestCount : 0,
      message_to_couple: message.trim() || undefined,
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setIsLocalMode(result.isLocal);

      // Trigger celebratory golden confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#D4AF37", "#F3E5AB", "#FFF1C5", "#F4BBC2"],
      });
    } else {
      setSubmitError(result.error || "Something went wrong. Please try again.");
    }
  };

  const handleReset = () => {
    setFullName("");
    setIsAttending(true);
    setGuestSide("lady");
    setGuestCount(1);
    setMessage("");
    setSubmitSuccess(false);
    setSubmitError(null);
  };

  return (
    <section id="rsvp" className="relative py-24 px-4 bg-noir-900/80 border-t border-gold-500/20 backdrop-blur-md">
      <div className="max-w-2xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gold-400 font-serif mb-3"
          >
            <CalendarCheck2 className="w-3.5 h-3.5 text-gold-400" />
            <span>Kindly Respond</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-serif text-3xl sm:text-5xl font-normal text-cream-50 gold-gradient-text"
          >
            RSVP for the Celebration
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm sm:text-base text-cream-300/80 font-serif italic mt-3 max-w-md mx-auto"
          >
            Your presence would make our engagement ceremony complete. Please let {INVITATION_CONFIG.couple.shortNames} know by November 15, 2026.
          </motion.p>

          {/* Database Mode status indicator */}
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] bg-noir-800 border border-gold-500/30 text-cream-300">
            <Info className="w-3 h-3 text-gold-400" />
            <span>
              {isSupabaseConfigured
                ? "Connected to Live Supabase Database"
                : "Interactive Demo Mode"}
            </span>
          </div>
        </div>

        {/* Main Card Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative p-6 sm:p-10 rounded-xl bg-noir-800/90 gold-card-border"
        >
          {/* Ornate corner accents */}
          <div className="ornate-corner-tl" />
          <div className="ornate-corner-tr" />
          <div className="ornate-corner-bl" />
          <div className="ornate-corner-br" />

          {submitSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-10 text-center flex flex-col items-center justify-center space-y-5"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl text-cream-50 font-normal">
                {isAttending ? "We Rejoice in Your Presence!" : "Thank You For Letting Us Know"}
              </h3>

              <p className="text-sm text-cream-300/80 font-sans max-w-md">
                {isAttending
                  ? `Thank you, ${fullName}! Your reservation has been recorded. We eagerly look forward to celebrating together on November 28, 2026.`
                  : `Thank you, ${fullName}. Even though you cannot join us in person, your blessings and warm thoughts mean the world to us.`}
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/responses"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-noir-900 font-medium text-xs tracking-wider uppercase transition-all shadow-lg shadow-gold-500/20"
                >
                  <Eye className="w-4 h-4" />
                  <span>View Guest Attendance List</span>
                </Link>

                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-full bg-noir-900 border border-gold-500/30 hover:border-gold-400 text-cream-200 text-xs tracking-wider uppercase transition-all"
                >
                  Submit Another RSVP
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {submitError && (
                <div className="p-3 rounded bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
                  <span>{submitError}</span>
                </div>
              )}

              {/* 1. Full Name */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-400 font-serif mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Tariq & Mona Al-Mansoor"
                  className="w-full px-4 py-3 rounded bg-noir-900/90 border border-gold-500/30 text-cream-100 placeholder:text-cream-400/40 focus:outline-none focus:border-gold-400 text-sm font-sans transition-colors"
                />
              </div>

              {/* 2. ATTENDANCE CHECKBOX (Coming or Not) */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-400 font-serif mb-3">
                  Attendance Confirmation
                </label>
                <div
                  onClick={() => setIsAttending(!isAttending)}
                  className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex items-center justify-between ${
                    isAttending
                      ? "bg-gold-500/10 border-gold-400 shadow-md shadow-gold-500/5"
                      : "bg-noir-900/60 border-noir-700 hover:border-noir-600"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-6 h-6 rounded flex items-center justify-center border transition-colors ${
                        isAttending
                          ? "bg-gold-500 border-gold-400 text-noir-900"
                          : "bg-noir-900 border-gold-500/40 text-transparent"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <p className="text-sm font-serif font-medium text-cream-100">
                        {isAttending
                          ? "Joyfully Accept — I will be attending the celebration"
                          : "Regretfully Decline — I cannot attend, but celebrate in spirit"}
                      </p>
                      <p className="text-xs text-cream-400/70 font-sans">
                        Click checkbox to toggle attendance status
                      </p>
                    </div>
                  </div>

                  <span
                    className={`text-xs px-2.5 py-1 rounded-full uppercase tracking-wider font-sans font-medium ${
                      isAttending
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : "bg-red-500/20 text-red-300 border border-red-500/40"
                    }`}
                  >
                    {isAttending ? "Attending" : "Declining"}
                  </span>
                </div>
              </div>

              {/* 3. SIDE SELECTION (Lady's Side vs Gentleman's Side) */}
              <AnimatePresence>
                {isAttending && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6 overflow-hidden pt-2"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gold-400 font-serif mb-2">
                        Which Side Are You Celebrating With?
                      </label>
                      <p className="text-xs text-cream-400/70 font-sans mb-3">
                        Please let us know if you are joining from the lady&apos;s side or gentleman&apos;s side:
                      </p>

                      {/* Side selector */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setGuestSide("lady")}
                          className={`p-3.5 rounded-lg border text-left transition-all ${
                            guestSide === "lady"
                              ? "bg-gold-500/20 border-gold-400 shadow-md shadow-gold-500/10 text-gold-200"
                              : "bg-noir-900/60 border-gold-500/20 text-cream-300 hover:border-gold-500/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                              Lady&apos;s Side
                            </span>
                            <span className="text-base">👰</span>
                          </div>
                          <p className="text-[11px] text-cream-400/70 font-sans leading-tight">
                            Lina&apos;s Family & Friends
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setGuestSide("gentleman")}
                          className={`p-3.5 rounded-lg border text-left transition-all ${
                            guestSide === "gentleman"
                              ? "bg-gold-500/20 border-gold-400 shadow-md shadow-gold-500/10 text-gold-200"
                              : "bg-noir-900/60 border-gold-500/20 text-cream-300 hover:border-gold-500/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                              Gentleman&apos;s Side
                            </span>
                            <span className="text-base">🤵</span>
                          </div>
                          <p className="text-[11px] text-cream-400/70 font-sans leading-tight">
                            Khaled&apos;s Family & Friends
                          </p>
                        </button>

                        <button
                          type="button"
                          onClick={() => setGuestSide("both")}
                          className={`p-3.5 rounded-lg border text-left transition-all ${
                            guestSide === "both"
                              ? "bg-gold-500/20 border-gold-400 shadow-md shadow-gold-500/10 text-gold-200"
                              : "bg-noir-900/60 border-gold-500/20 text-cream-300 hover:border-gold-500/40"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-serif uppercase tracking-wider font-semibold">
                              Both / Mutual
                            </span>
                            <span className="text-base">✨</span>
                          </div>
                          <p className="text-[11px] text-cream-400/70 font-sans leading-tight">
                            Friends of Both
                          </p>
                        </button>
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest text-gold-400 font-serif mb-2">
                        Total Number of Guests Attending
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded bg-noir-900/90 border border-gold-500/30 overflow-hidden">
                          <button
                            type="button"
                            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                            className="w-10 h-10 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 text-lg transition-colors"
                          >
                            -
                          </button>
                          <span className="w-12 text-center text-sm font-serif font-bold text-cream-100">
                            {guestCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => setGuestCount(Math.min(10, guestCount + 1))}
                            className="w-10 h-10 flex items-center justify-center text-gold-400 hover:bg-gold-500/10 text-lg transition-colors"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs text-cream-400/70 font-sans">
                          {guestCount === 1 ? "1 guest (Just you)" : `${guestCount} guests (Including you)`}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 4. Warm Wishes / Message */}
              <div>
                <label className="block text-xs uppercase tracking-widest text-gold-400 font-serif mb-2">
                  Message or Warm Wishes for Lina & Khaled
                </label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share a sweet memory, congratulations, or warm blessings..."
                  className="w-full px-4 py-3 rounded bg-noir-900/90 border border-gold-500/30 text-cream-100 placeholder:text-cream-400/40 focus:outline-none focus:border-gold-400 text-sm font-sans transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-400 hover:from-gold-400 hover:to-gold-300 text-noir-900 font-medium text-xs font-serif uppercase tracking-widest shadow-lg shadow-gold-500/25 transition-all active:scale-95 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-noir-900 border-t-transparent rounded-full animate-spin" />
                      Recording RSVP...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Send className="w-3.5 h-3.5" />
                      Send RSVP Response
                    </span>
                  )}
                </button>

                <Link
                  href="/responses"
                  className="text-xs text-gold-400/80 hover:text-gold-300 flex items-center gap-1.5 font-sans transition-colors"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View guest attendance list</span>
                </Link>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
