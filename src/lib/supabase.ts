import { createClient } from "@supabase/supabase-js";

export interface RsvpRecord {
  id: string;
  created_at: string;
  full_name: string;
  email: string;
  phone?: string;
  is_attending: boolean;
  attending_events: "ceremony" | "reception" | "both";
  guest_count: number;
  dietary_preferences?: string;
  message_to_couple?: string;
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith("https://") &&
    !supabaseUrl.includes("your-project-id")
);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!)
  : null;

// Initial starter mock data so the responses page is immediately rich and demonstrable
const INITIAL_DEMO_RECORDS: RsvpRecord[] = [
  {
    id: "demo-1",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    full_name: "Eleanor & Henry Sterling",
    email: "eleanor.sterling@example.com",
    phone: "+1 555-0192",
    is_attending: true,
    attending_events: "both",
    guest_count: 2,
    dietary_preferences: "Vegetarian for Eleanor",
    message_to_couple: "Could not be happier for you two darlings! Counting down the days to celebrate this beautiful union.",
  },
  {
    id: "demo-2",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    full_name: "Marcus Aurelius Dupont",
    email: "marcus.dupont@example.com",
    phone: "+1 555-0144",
    is_attending: true,
    attending_events: "ceremony",
    guest_count: 1,
    dietary_preferences: "Gluten-free",
    message_to_couple: "Honored to witness your vows and ring exchange. Wishing you a lifetime of joy!",
  },
  {
    id: "demo-3",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    full_name: "Charlotte & Liam Montgomery",
    email: "charlotte.m@example.com",
    phone: "+1 555-0178",
    is_attending: true,
    attending_events: "both",
    guest_count: 2,
    dietary_preferences: "None",
    message_to_couple: "Bringing all the love and champagne toasts! Can't wait for the first dance.",
  },
  {
    id: "demo-4",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    full_name: "Sebastian Blake",
    email: "sebastian.blake@example.com",
    phone: "+1 555-0120",
    is_attending: false,
    attending_events: "both",
    guest_count: 0,
    dietary_preferences: "",
    message_to_couple: "Sending all my warmest blessings from London! Devastated to miss it in person, but celebrating in spirit.",
  },
];

const LOCAL_STORAGE_KEY = "engagement_rsvps_data";

export async function submitRsvp(
  data: Omit<RsvpRecord, "id" | "created_at">
): Promise<{ success: boolean; error?: string; isLocal: boolean }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("rsvps").insert([
        {
          full_name: data.full_name,
          email: data.email,
          phone: data.phone || null,
          is_attending: data.is_attending,
          attending_events: data.attending_events,
          guest_count: data.guest_count,
          dietary_preferences: data.dietary_preferences || null,
          message_to_couple: data.message_to_couple || null,
        },
      ]);
      if (error) {
        console.error("Supabase insert error:", error);
        return { success: false, error: error.message, isLocal: false };
      }
      return { success: true, isLocal: false };
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to connect to Supabase";
      return { success: false, error: message, isLocal: false };
    }
  }

  // Fallback to local storage
  try {
    const existingRaw = typeof window !== "undefined" ? localStorage.getItem(LOCAL_STORAGE_KEY) : null;
    let list: RsvpRecord[] = existingRaw ? JSON.parse(existingRaw) : INITIAL_DEMO_RECORDS;

    const newRecord: RsvpRecord = {
      ...data,
      id: "local-" + Date.now(),
      created_at: new Date().toISOString(),
    };

    list = [newRecord, ...list];
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
    }
    return { success: true, isLocal: true };
  } catch (err) {
    console.error("Local storage error:", err);
    return { success: false, error: "Failed to save locally", isLocal: true };
  }
}

export async function fetchRsvps(): Promise<{ data: RsvpRecord[]; error?: string; isLocal: boolean }> {
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from("rsvps")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase select error:", error);
        // Fall back to local if table does not exist yet
        return getLocalRsvps();
      }
      return { data: (data as RsvpRecord[]) || [], isLocal: false };
    } catch (err: unknown) {
      console.warn("Supabase fetch failed, falling back to local:", err);
      return getLocalRsvps();
    }
  }

  return getLocalRsvps();
}

function getLocalRsvps(): { data: RsvpRecord[]; isLocal: boolean } {
  if (typeof window === "undefined") {
    return { data: INITIAL_DEMO_RECORDS, isLocal: true };
  }
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_RECORDS));
      return { data: INITIAL_DEMO_RECORDS, isLocal: true };
    }
    return { data: JSON.parse(raw), isLocal: true };
  } catch {
    return { data: INITIAL_DEMO_RECORDS, isLocal: true };
  }
}
