export type Artwork =
  /** DressMe trait layers, stacked in paint order by components/piggy-art.tsx. */
  | { kind: "layers"; lookCode: string; layers: string[] }
  /** One opaque cover image. */
  | { kind: "image"; src: string };

type CollectionBase = {
  slug: string;
  name: string;
  tagline: string;
  /** Set as --accent, matching DressMe's per-collection accents. */
  accent: string;
  art: Artwork;
};

export type LiveCollection = CollectionBase & {
  status: "live";
  supply: number;
  /** Where to buy: the collection's Magic Eden marketplace page. */
  marketplaceUrl: string;
};
export type ComingSoonCollection = CollectionBase & { status: "coming-soon" };
export type Collection = LiveCollection | ComingSoonCollection;

/**
 * The hero fan takes the first three entries. Layer stacks are DressMe's hero
 * looks, decoded from the look codes against its generated manifest — do not
 * reorder a stack: derived body-head and ear layers interleave around
 * clothes, hair and hats. Background layers are omitted so the art sits
 * transparent on the card surface.
 */
export const COLLECTIONS: Collection[] = [
  {
    status: "live",
    slug: "piggy-sol-gang",
    name: "Piggy SOL Gang",
    tagline: "Ten thousand piggies, straight off the chain.",
    // Solana purple lightened from DressMe's #9945ff: the brand value is
    // 4.11:1 on --surface, under the 4.5:1 AA floor for the text-sm
    // Marketplace label this accent colours.
    accent: "#a866ff",
    supply: 10_000,
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_sol_gang",
    art: { kind: "image", src: "/piggy/covers/piggy-sol-gang.png" },
  },
  {
    status: "live",
    slug: "piggy-girl-gang",
    name: "Piggy Girl Gang",
    tagline: "Pretty, fierce and dressed for it.",
    accent: "#ff8ec4",
    supply: 5_000,
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_girl_gang",
    art: { kind: "image", src: "/piggy/covers/piggy-girl-gang.png" },
  },
  {
    status: "live",
    slug: "piggy-gang",
    name: "Piggy Gang",
    tagline: "Same ten thousand piggies. Meaner art.",
    accent: "#3ddad7",
    supply: 10_000,
    marketplaceUrl: "https://magiceden.io/marketplace/pig_gang",
    art: {
      kind: "layers",
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
  },
  {
    status: "coming-soon",
    slug: "pig-mud",
    name: "Pig Mud",
    tagline: "Something’s coming.",
    // Unused while inert; mud-toned for when the collection goes live.
    accent: "#d9a066",
    art: { kind: "image", src: "/piggy/covers/pig-mud.png" },
  },
];
