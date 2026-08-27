export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  /** Set as --accent, matching DressMe's per-collection accents. */
  accent: string;
  supply: number;
  /** Where to buy: the collection's Magic Eden marketplace page. */
  marketplaceUrl: string;
  /** The DressMe look this portrait reproduces. */
  lookCode: string;
  /** Ordered paint stack, bottom first. */
  layers: string[];
};

/**
 * Portraits are DressMe's hero looks, decoded from the look codes against its
 * generated manifest. Do not reorder a stack: the derived body-head and ear
 * layers interleave around clothes, hair and hats. Background layers are
 * omitted so the art sits transparent on the card surface.
 */
export const COLLECTIONS: Collection[] = [
  {
    slug: "piggy-sol-gang",
    name: "Piggy SOL Gang",
    tagline: "Ten thousand piggies, straight off the chain.",
    // Solana purple lightened from DressMe's #9945ff: the brand value is
    // 4.11:1 on --surface, under the 4.5:1 AA floor for the text-sm
    // Marketplace label this accent colours.
    accent: "#a866ff",
    supply: 10_000,
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_sol_gang",
    lookCode: "56D97JB",
    layers: [
      "/piggy/piggy-sol-gang/thumb/body/solana.png",
      "/piggy/piggy-sol-gang/thumb/clothes/solana-tee.png",
      "/piggy/piggy-sol-gang/thumb/body-right-ear/solana.png",
      "/piggy/piggy-sol-gang/thumb/body-head/solana.png",
      "/piggy/piggy-sol-gang/thumb/head/propeller-hat.png",
      "/piggy/piggy-sol-gang/thumb/body-left-ear/solana.png",
      "/piggy/piggy-sol-gang/thumb/eyes/focused.png",
      "/piggy/piggy-sol-gang/thumb/earring/red-diamond.png",
      "/piggy/piggy-sol-gang/thumb/mouth/golden-teeth.png",
    ],
  },
  {
    slug: "piggy-girl-gang",
    name: "Piggy Girl Gang",
    tagline: "Pretty, fierce and dressed for it.",
    accent: "#ff8ec4",
    supply: 5_000,
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_girl_gang",
    lookCode: "65IB5219",
    layers: [
      "/piggy/piggy-girl-gang/thumb/body/alien.png",
      "/piggy/piggy-girl-gang/thumb/clothes/solana-tshirt.png",
      "/piggy/piggy-girl-gang/thumb/body-right-ear/alien.png",
      "/piggy/piggy-girl-gang/thumb/body-head/alien.png",
      "/piggy/piggy-girl-gang/thumb/hair/yellow-hair.png",
      "/piggy/piggy-girl-gang/thumb/hats/green-hat.png",
      "/piggy/piggy-girl-gang/thumb/body-left-ear/alien.png",
      "/piggy/piggy-girl-gang/thumb/eyes/hypnotize.png",
      "/piggy/piggy-girl-gang/thumb/earring/diamond.png",
      "/piggy/piggy-girl-gang/thumb/mouth/braces.png",
    ],
  },
  {
    slug: "piggy-gang",
    name: "Piggy Gang",
    tagline: "Same ten thousand piggies. Meaner art.",
    accent: "#3ddad7",
    supply: 10_000,
    marketplaceUrl: "https://magiceden.io/marketplace/pig_gang",
    lookCode: "58D47JB0",
    layers: [
      "/piggy/piggy-gang/thumb/body/solana.png",
      "/piggy/piggy-gang/thumb/clothes/solana-tee.png",
      "/piggy/piggy-gang/thumb/head/propeller-hat.png",
      "/piggy/piggy-gang/thumb/eyes/focused.png",
      "/piggy/piggy-gang/thumb/earring/pink-diamond.png",
      "/piggy/piggy-gang/thumb/mouth/golden-teeth.png",
    ],
  },
];
