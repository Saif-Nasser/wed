import { createClient } from "@supabase/supabase-js";

export interface RsvpRecord {
  id: string;
  created_at: string;
  full_name: string;
  email?: string;
  phone?: string;
  is_attending: boolean;
  guest_side: "lady" | "gentleman" | "both";
  attending_events?: string;
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

// Initial starter mock data matching Lina & Khaled
const INITIAL_DEMO_RECORDS: RsvpRecord[] = [
  {
    id: "demo-1",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    full_name: "Nour & Tarek Al-Mansoor",
    is_attending: true,
    guest_side: "lady",
    guest_count: 2,
    message_to_couple: "Dearest Lina and Khaled, we could not be happier for you! Wishing you a lifetime of endless joy and love.",
  },
  {
    id: "demo-2",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    full_name: "Youssef Ibrahim",
    is_attending: true,
    guest_side: "gentleman",
    guest_count: 1,
    message_to_couple: "Alf Mabrouk to my brother Khaled! You and Lina are truly made for each other.",
  },
  {
    id: "demo-3",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    full_name: "Hala & Omar Haddad",
    is_attending: true,
    guest_side: "both",
    guest_count: 2,
    message_to_couple: "Celebrating both of our dearest friends! Cannot wait to dance the night away.",
  },
  {
    id: "demo-4",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    full_name: "Dr. Karim Zaid",
    is_attending: false,
    guest_side: "gentleman",
    guest_count: 0,
    message_to_couple: "Warmest congratulations Khaled and Lina from abroad! Devastated to miss it in person, celebrating in heart.",
  },
];

const LOCAL_STORAGE_KEY = "engagement_rsvps_data";

export async function submitRsvp(
  data: Omit<RsvpRecord, "id" | "created_at">
): Promise<{ success: boolean; error?: string; isLocal: boolean }> {
  // Safe generated fallback email to satisfy DB non-null constraints if present
  const slug = data.full_name.toLowerCase().replace(/[^a-z0-9]/g, "") || "guest";
  const safeEmail = data.email || `${slug}-${Date.now().toString().slice(-4)}@rsvp.local`;

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from("rsvps").insert([
        {
          full_name: data.full_name,
          email: safeEmail,
          phone: null,
          is_attending: data.is_attending,
          attending_events: data.guest_side, // saves 'lady', 'gentleman', or 'both'
          guest_count: data.guest_count,
          dietary_preferences: null,
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
        return getLocalRsvps();
      }

      // Normalize attending_events to guest_side
      const normalized: RsvpRecord[] = ((data as Record<string, unknown>[]) || []).map((row) => {
        const eventsVal = String(row.attending_events || "").toLowerCase();
        let side: "lady" | "gentleman" | "both" = "both";
        if (eventsVal.includes("lady") || eventsVal.includes("bride")) side = "lady";
        else if (eventsVal.includes("gentleman") || eventsVal.includes("groom")) side = "gentleman";

        return {
          id: String(row.id),
          created_at: String(row.created_at),
          full_name: String(row.full_name || ""),
          email: row.email ? String(row.email) : undefined,
          phone: row.phone ? String(row.phone) : undefined,
          is_attending: Boolean(row.is_attending),
          guest_side: side,
          attending_events: String(row.attending_events || ""),
          guest_count: Number(row.guest_count || 1),
          dietary_preferences: row.dietary_preferences ? String(row.dietary_preferences) : undefined,
          message_to_couple: row.message_to_couple ? String(row.message_to_couple) : undefined,
        };
      });

      return { data: normalized, isLocal: false };
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
