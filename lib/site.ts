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
  icon: "x" | "discord" | "github";
};

// X handle still pending ALG-641 confirmation.
export const SOCIALS: Social[] = [
  { label: "X", href: "https://x.com/PiggySolGang", icon: "x" },
  { label: "Discord", href: "https://discord.gg/8SjGR8Srvz", icon: "discord" },
  { label: "GitHub", href: "https://github.com/piggygang", icon: "github" },
];
