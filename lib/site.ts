export const SITE = {
  name: "Piggy Gang",
  // Placeholder until the ALG-641 copy doc is approved. Single source for
  // the hero sub-line, footer line and meta description.
  tagline: "Apps and art for the whole gang — start anywhere.",
} as const;

export type Social = {
  label: string;
  href: string;
  /** Key into ICONS in components/site-footer.tsx */
  icon: "x" | "discord" | "marketplace";
};

// Copied from DressMe; ALG-641 confirms these with the team. The Discord
// invite currently returns "Unknown Invite" and needs a fresh permanent one.
export const SOCIALS: Social[] = [
  { label: "X", href: "https://x.com/PiggySolGang", icon: "x" },
  { label: "Discord", href: "https://discord.gg/QyUHFsZnuJ", icon: "discord" },
  { label: "piggygang.com", href: "https://piggygang.com/", icon: "marketplace" },
];
