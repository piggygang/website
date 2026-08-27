export type AppStatus = "live" | "preview" | "coming-soon";

type AppBase = {
  name: string;
  blurb: string;
  /** 24×24 currentColor glyph path, hand-drawn on the footer ICONS grid. */
  icon: string;
  /** Set as --accent on the card, DressMe's per-collection accent pattern. */
  accent: string;
};

export type LiveApp = AppBase & { status: "live"; url: string };
/** Browsable while it is being built — links out like a live app. */
export type PreviewApp = AppBase & { status: "preview"; url: string };
export type ComingSoonApp = AppBase & { status: "coming-soon"; url?: string };
export type App = LiveApp | PreviewApp | ComingSoonApp;

/**
 * The app grid renders this array in order — shipping an app, or flipping
 * one live, is a single self-contained entry here.
 *
 * Accents stay inside the DressMe palette: the flagship wears the brand
 * pink, Explorer the gold token (the Mythic badge that owns gold in DressMe
 * never renders on this page), Alpha.art the Solana purple it shares with
 * Piggy SOL Gang — apps and collections never sit in the same section, so
 * the two purples cannot be confused.
 */
export const APPS: App[] = [
  {
    status: "live",
    name: "DressMe",
    blurb: "Dress your piggy for any occasion.",
    url: "https://dressme.piggygang.net",
    icon: "M8 3 3 6.5l2 3.5 2-1V21h10V9l2 1 2-3.5L16 3a4.7 4.7 0 0 1-8 0Z",
    accent: "var(--brand)",
  },
  {
    status: "preview",
    name: "Explorer",
    blurb: "Browse the gang — traits, owners & history.",
    url: "https://explorer.piggygang.net",
    icon: "M10.5 3a7.5 7.5 0 1 0 4.55 13.46l4.24 4.24 1.42-1.42-4.24-4.24A7.5 7.5 0 0 0 10.5 3Zm0 2a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Z",
    accent: "var(--gold)",
  },
  {
    status: "preview",
    name: "Alpha.art",
    blurb: "The exchange returns.",
    url: "https://alpha.art",
    icon: "M12.6 2.6 21 11a2 2 0 0 1 0 2.8l-7.2 7.2a2 2 0 0 1-2.8 0L2.6 12.6A2 2 0 0 1 2 11.2V4a2 2 0 0 1 2-2h7.2a2 2 0 0 1 1.4.6ZM7 5.5A1.5 1.5 0 1 0 7 8.5 1.5 1.5 0 0 0 7 5.5Z",
    // Solana purple lightened from #9945ff: the brand value is 4.11:1 on
    // --surface, under the 4.5:1 AA floor for text-sm accent labels.
    accent: "#a866ff",
  },
  {
    status: "preview",
    name: "Raffles",
    blurb: "Tickets in, piggies out.",
    url: "https://raffles.piggygang.net",
    icon: "M5 6h14a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8a2 2 0 0 1 2-2Z",
    accent: "#3ddad7",
  },
  {
    status: "coming-soon",
    name: "Migration",
    blurb: "Swap your piggy to the new art.",
    icon: "M15 4l6 4-6 4v-2H3V6h12Zm-6 8-6 4 6 4v-2h12v-4H9Z",
    accent: "#ff8ec4",
  },
];
