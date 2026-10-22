# 💍 Classic Engagement Ceremony Invitation & RSVP Platform

A luxurious, classic one-tall-page invitation website built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, featuring rich animations, romantic ambient music, and a **Supabase** backend for storing RSVPs with an interactive responses dashboard.

---

## ✨ Features

### 🌟 Visual Aesthetics & Motion
- **Super Classic Aesthetic**: Deep charcoal & ivory noir backdrop (`#0B0D0F`), real gold foil highlights (`#D4AF37`), ornate corner filigree, and classic typography (*Playfair Display*, *Cormorant Garamond*, *Great Vibes*, *Montserrat*).
- **Interactive Wax Seal Opening**: Hero section featuring an animated royal monogram crest with a wax seal that visitors click to unseal the invitation.
- **Floating Gold Dust & Petals**: Canvas particle engine creating a gentle, dreamy shower of golden sparkles and floating rose petals.
- **Romantic Background Melodies**: Floating vinyl music player toggle playing a gentle classical harp & piano arpeggio.
- **Live Countdown Timer**: Real-time ticker counting down days, hours, minutes, and seconds until the celebration.
- **Love Story Timeline**: Animated milestone cards chronicling how the couple met, their journey, and the proposal.
- **Order of Events Schedule**: Program cards for welcome drinks, ring exchange ceremony, banquet speeches, and dancing.
- **Attire & Venue Guide**: Interactive dress code palette swatches (*Champagne Gold, Midnight, Royal Emerald, Ivory, Rosewood*), Google Maps link, and 1-click **Add to Google Calendar** and **Apple iCal (.ics)** downloads.

### 📝 RSVP System
- **Attendance Checkbox**: Clear checkbox to indicate if the guest is *Joyfully Attending* or *Regretfully Declining*.
- **Event Selection Toggle**: Interactive toggle for guests to choose which event they will attend:
  - 💍 **Ceremony Only** (5:00 PM)
  - 🥂 **Reception Only** (7:15 PM)
  - ✨ **Both Events** (Full Evening)
- **Plus-Ones / Party Size**: Counter input for additional guests.
- **Dietary Preferences & Wishes**: Text inputs for dietary needs and congratulatory notes.
- **Golden Confetti Blast**: Burst of gold and rose confetti upon RSVP submission.
- **Zero-Config Demo Mode**: Works immediately out-of-the-box using browser local storage even before connecting Supabase!

### 📊 Responses Dashboard (`/responses`)
- **Key Metrics (KPIs)**: Total responses count, confirmed attending guest seats, declining count, and ceremony vs reception breakdown.
- **Search & Filters**: Search guests by name or email, filter by attending status, or filter by ceremony/reception.
- **Responses Table**: Detailed list of all responses with contact info and dietary restrictions.
- **1-Click CSV Export**: Download a formatted `RSVP_Responses.csv` file for caterers and event coordinators.
- **Heartfelt Wishes Wall**: Grid of warm notes and messages left by friends and family.

---

## 🚀 Getting Started

### 1. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.
- **Main Invitation**: `http://localhost:3000`
- **RSVP Responses Dashboard**: `http://localhost:3000/responses`

---

## 🗄️ Supabase Setup (Optional / Quick 2-Minute Setup)

The application works immediately in **Interactive Demo Mode**. When you are ready to connect your live Supabase project:

1. **Create a Free Supabase Project**:
   - Go to [supabase.com](https://supabase.com) and create a project.

2. **Run the Database Schema**:
   - In your Supabase dashboard, go to the **SQL Editor** tab.
   - Open and copy the entire contents of [`supabase-schema.sql`](./supabase-schema.sql).
   - Paste and click **Run**. This creates the `rsvps` table and enables public row-level security (RLS).

3. **Configure Environment Variables**:
   - Create a file named `.env.local` in this project directory (see [`.env.local.example`](./.env.local.example)).
   - Add your Supabase project credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
   ```
   - Restart your Next.js server (`npm run dev`). The status badge will now show **Connected to Supabase**!

---

## 🎨 Customizing Names & Details

All couple names, dates, times, venues, and story milestones are located in a single file:
👉 [`src/config/invitation.ts`](./src/config/invitation.ts)

Simply update the fields in that file to customize the wedding/engagement details.
