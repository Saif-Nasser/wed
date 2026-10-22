"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Users,
  CheckCircle2,
  XCircle,
  Download,
  Search,
  Filter,
  RefreshCw,
  Heart,
  CalendarCheck,
  Wine,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { fetchRsvps, RsvpRecord, isSupabaseConfigured } from "@/lib/supabase";
import { INVITATION_CONFIG } from "@/config/invitation";

export default function ResponsesPage() {
  const [rsvps, setRsvps] = useState<RsvpRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "attending" | "declining">("all");
  const [eventFilter, setEventFilter] = useState<"all" | "ceremony" | "reception" | "both">("all");
  const [isLocal, setIsLocal] = useState(false);

  const loadData = async () => {
    setLoading(true);
    const result = await fetchRsvps();
    setRsvps(result.data);
    setIsLocal(result.isLocal);
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filtered RSVPs
  const filteredRsvps = rsvps.filter((item) => {
    // Search
    const matchesSearch =
      item.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all"
        ? true
        : statusFilter === "attending"
        ? item.is_attending
        : !item.is_attending;

    // Event filter
    const matchesEvent =
      eventFilter === "all"
        ? true
        : !item.is_attending
        ? false
        : item.attending_events === eventFilter || item.attending_events === "both";

    return matchesSearch && matchesStatus && matchesEvent;
  });

  // KPI Calculations
  const totalResponses = rsvps.length;
  const attendingCount = rsvps.filter((r) => r.is_attending).length;
  const decliningCount = rsvps.filter((r) => !r.is_attending).length;
  const totalHeadcount = rsvps
    .filter((r) => r.is_attending)
    .reduce((sum, r) => sum + (r.guest_count || 1), 0);
  const ceremonyCount = rsvps.filter(
    (r) => r.is_attending && (r.attending_events === "ceremony" || r.attending_events === "both")
  ).length;
  const receptionCount = rsvps.filter(
    (r) => r.is_attending && (r.attending_events === "reception" || r.attending_events === "both")
  ).length;

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      "Full Name",
      "Email",
      "Phone",
      "Attending",
      "Events",
      "Guest Count",
      "Dietary Preferences",
      "Message to Couple",
      "Date Submitted",
    ];

    const rows = filteredRsvps.map((r) => [
      `"${r.full_name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${(r.phone || "").replace(/"/g, '""')}"`,
      r.is_attending ? "Yes" : "No",
      r.is_attending ? r.attending_events : "N/A",
      r.is_attending ? r.guest_count : 0,
      `"${(r.dietary_preferences || "").replace(/"/g, '""')}"`,
      `"${(r.message_to_couple || "").replace(/"/g, '""')}"`,
      new Date(r.created_at).toLocaleDateString(),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `RSVP_Responses_${INVITATION_CONFIG.couple.shortNames.replace(/\s+/g, "_")}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#0B0D0F] text-[#F7F3EB] px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Top Navigation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gold-500/20 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-gold-400 hover:text-gold-200 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Invitation</span>
          </Link>

          <div className="flex items-center gap-3">
            <span
              className={`text-xs px-3 py-1 rounded-full font-sans border ${
                isSupabaseConfigured
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-gold-500/10 text-gold-400 border-gold-500/30"
              }`}
            >
              {isSupabaseConfigured ? "Connected to Supabase" : "Local Demo Storage"}
            </span>

            <button
              onClick={loadData}
              disabled={loading}
              className="p-2 rounded-lg bg-noir-800 border border-gold-500/30 text-gold-400 hover:text-gold-200 hover:border-gold-400 transition-all"
              title="Refresh Responses"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center sm:text-left">
          <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-serif">
            Guest List Management
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-cream-50 font-normal gold-gradient-text mt-1">
            RSVP Responses & Attendance
          </h1>
          <p className="text-xs sm:text-sm text-cream-300/70 font-sans mt-1">
            Showing all confirmed guests and responses for {INVITATION_CONFIG.couple.shortNames}&apos;s engagement ceremony.
          </p>
        </div>

        {/* KPI Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-5 rounded-lg bg-noir-800/80 gold-card-border">
            <div className="flex items-center justify-between text-xs text-cream-400 font-sans mb-1">
              <span>Total Responses</span>
              <Users className="w-4 h-4 text-gold-400" />
            </div>
            <p className="font-serif text-3xl text-cream-50 font-light">{totalResponses}</p>
            <span className="text-[11px] text-cream-400/60 font-sans">Individual submissions</span>
          </div>

          <div className="p-5 rounded-lg bg-noir-800/80 gold-card-border">
            <div className="flex items-center justify-between text-xs text-emerald-400 font-sans mb-1">
              <span>Attending</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="font-serif text-3xl text-emerald-300 font-light">{attendingCount}</p>
            <span className="text-[11px] text-emerald-400/80 font-sans">
              Total Seats: <strong className="text-cream-100">{totalHeadcount}</strong>
            </span>
          </div>

          <div className="p-5 rounded-lg bg-noir-800/80 gold-card-border">
            <div className="flex items-center justify-between text-xs text-red-400 font-sans mb-1">
              <span>Declining</span>
              <XCircle className="w-4 h-4 text-red-400" />
            </div>
            <p className="font-serif text-3xl text-red-300 font-light">{decliningCount}</p>
            <span className="text-[11px] text-cream-400/60 font-sans">Unable to attend</span>
          </div>

          <div className="p-5 rounded-lg bg-noir-800/80 gold-card-border">
            <div className="flex items-center justify-between text-xs text-gold-400 font-sans mb-1">
              <span>Ceremony / Reception</span>
              <Wine className="w-4 h-4 text-gold-400" />
            </div>
            <p className="font-serif text-xl sm:text-2xl text-gold-300 font-light mt-1">
              {ceremonyCount} <span className="text-xs text-cream-400">cerm.</span> / {receptionCount} <span className="text-xs text-cream-400">recp.</span>
            </p>
            <span className="text-[11px] text-cream-400/60 font-sans">Event distribution</span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl bg-noir-800/80 gold-card-border flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gold-500/60 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded bg-noir-900 border border-gold-500/30 text-cream-100 placeholder:text-cream-400/40 text-xs font-sans focus:outline-none focus:border-gold-400"
            />
          </div>

          {/* Filters & Export */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs text-cream-300 font-sans">
              <Filter className="w-3.5 h-3.5 text-gold-400" />
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "attending" | "declining")}
                className="px-2.5 py-1.5 rounded bg-noir-900 border border-gold-500/30 text-cream-100 text-xs font-sans focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="attending">Attending Only</option>
                <option value="declining">Declining Only</option>
              </select>
            </div>

            {/* Event Filter */}
            <div className="flex items-center gap-1.5 text-xs text-cream-300 font-sans">
              <span>Event:</span>
              <select
                value={eventFilter}
                onChange={(e) => setEventFilter(e.target.value as "all" | "ceremony" | "reception" | "both")}
                className="px-2.5 py-1.5 rounded bg-noir-900 border border-gold-500/30 text-cream-100 text-xs font-sans focus:outline-none"
              >
                <option value="all">All Events</option>
                <option value="ceremony">Ceremony</option>
                <option value="reception">Reception</option>
                <option value="both">Both Events</option>
              </select>
            </div>

            {/* Export CSV button */}
            <button
              onClick={handleExportCsv}
              disabled={filteredRsvps.length === 0}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-gold-500/20 hover:bg-gold-500 border border-gold-400/60 hover:text-noir-900 text-gold-300 text-xs font-sans transition-all disabled:opacity-40"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>
          </div>
        </div>

        {/* Responses Table */}
        <div className="rounded-xl bg-noir-800/90 gold-card-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-noir-900/90 border-b border-gold-500/30 text-gold-400 font-serif uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Guest Name</th>
                  <th className="py-3.5 px-4">Attendance</th>
                  <th className="py-3.5 px-4">Selected Event</th>
                  <th className="py-3.5 px-4 text-center">Party Size</th>
                  <th className="py-3.5 px-4">Dietary Notes</th>
                  <th className="py-3.5 px-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gold-500/10 text-cream-200">
                {filteredRsvps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-12 text-cream-400/60 font-serif italic text-sm">
                      No matching RSVP responses found.
                    </td>
                  </tr>
                ) : (
                  filteredRsvps.map((rsvp) => (
                    <tr key={rsvp.id} className="hover:bg-gold-500/5 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-cream-50">
                        <div>{rsvp.full_name}</div>
                        <div className="text-[11px] text-cream-400/70 flex items-center gap-2 mt-0.5">
                          <span className="flex items-center gap-1">
                            <Mail className="w-3 h-3 text-gold-500/60" />
                            {rsvp.email}
                          </span>
                          {rsvp.phone && (
                            <span className="flex items-center gap-1">
                              <Phone className="w-3 h-3 text-gold-500/60" />
                              {rsvp.phone}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        {rsvp.is_attending ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            <CheckCircle2 className="w-3 h-3" />
                            Attending
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] bg-red-500/20 text-red-300 border border-red-500/40">
                            <XCircle className="w-3 h-3" />
                            Declining
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        {rsvp.is_attending ? (
                          <span className="capitalize px-2 py-0.5 rounded bg-noir-900 border border-gold-500/30 text-gold-300 text-[11px]">
                            {rsvp.attending_events === "both"
                              ? "✨ Both Events"
                              : rsvp.attending_events === "ceremony"
                              ? "💍 Ceremony Only"
                              : "🥂 Reception Only"}
                          </span>
                        ) : (
                          <span className="text-cream-500/50">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 text-center font-serif text-sm">
                        {rsvp.is_attending ? rsvp.guest_count : 0}
                      </td>

                      <td className="py-3.5 px-4 text-cream-300/80 max-w-[200px] truncate">
                        {rsvp.dietary_preferences || <span className="text-cream-500/50">None specified</span>}
                      </td>

                      <td className="py-3.5 px-4 text-cream-400/60 whitespace-nowrap">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Wishes & Warm Messages Wall */}
        <div className="pt-6">
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="w-5 h-5 text-gold-400" />
            <h2 className="font-serif text-2xl text-cream-100 font-normal">
              Heartfelt Wishes & Messages from Guests
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rsvps
              .filter((r) => Boolean(r.message_to_couple))
              .map((rsvp) => (
                <div
                  key={"msg-" + rsvp.id}
                  className="p-5 rounded-lg bg-noir-800/80 gold-card-border relative flex flex-col justify-between"
                >
                  <div className="mb-4">
                    <p className="font-serif italic text-cream-200/90 text-sm leading-relaxed mb-3">
                      &ldquo;{rsvp.message_to_couple}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gold-500/20 pt-3 text-xs">
                    <span className="font-serif text-gold-300 font-medium">
                      — {rsvp.full_name}
                    </span>
                    <Heart className="w-3.5 h-3.5 text-gold-400 fill-gold-400/20" />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
