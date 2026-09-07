import type { Stats } from "@/lib/indexer";

export type Artwork =
  /** DressMe trait layers, stacked in paint order by components/piggy-art.tsx. */
  | { kind: "layers"; lookCode: string; layers: string[] }
  /** One opaque cover image. */
  | { kind: "image"; src: string };

type CollectionBase = {
  /** Also the join key into the indexer's registry — see lib/indexer.ts. */
  slug: string;
  name: string;
  tagline: string;
  /** Set as --accent, matching DressMe's per-collection accents. */
  accent: string;
  art: Artwork;
};

/**
 * `supply` used to live here. Counts are the indexer's now; what stays is what
 * the API has no column for — copy, accent, art, where to buy.
 *
 * `status` stays local and editorial too. The indexer registers a collection as
 * soon as its mints exist, which can be long before it is announced, so whether
 * this page presents one as live remains a one-line edit in this file.
 */
export type LiveCollection = CollectionBase & {
  status: "live";
  /**
   * Where to buy, when there is anywhere: the collection's Magic Eden page.
   * Optional because a collection can be minted, indexed and held before it has
   * a listing page — Pig Mud has none today. Same link-or-inert shape as
   * ComingSoonApp.url in lib/apps.config.ts.
   */
  marketplaceUrl?: string;
};
/**
 * Announced but not yet minted. Nothing carries this today — Pig Mud was the
 * last one and it has arrived — but it is the extension point the next
 * collection lands on, and the strip still renders it.
 */
export type ComingSoonCollection = CollectionBase & { status: "coming-soon" };
export type Collection = LiveCollection | ComingSoonCollection;

/**
 * The strip renders this array in order. Layer stacks are DressMe's hero looks,
 * decoded from the look codes against its generated manifest — do not reorder a
 * stack: derived body-head and ear layers interleave around clothes, hair and
 * hats. Background layers are omitted so the art sits transparent on the card
 * surface.
 *
 * This array, not the indexer, decides what the hub shows. A collection added to
 * ../indexer/config/collections.toml needs a second step here before it appears
 * (withStats warns when the API returns a slug this file does not know).
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
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_sol_gang",
    art: { kind: "image", src: "/piggy/covers/piggy-sol-gang.png" },
  },
  {
    status: "live",
    slug: "piggy-girl-gang",
    name: "Piggy Girl Gang",
    tagline: "Pretty, fierce and dressed for it.",
    accent: "#ff8ec4",
    marketplaceUrl: "https://magiceden.io/marketplace/piggy_girl_gang",
    art: { kind: "image", src: "/piggy/covers/piggy-girl-gang.png" },
  },
  {
    status: "live",
    slug: "piggy-gang",
    name: "Piggy Gang",
    // Placeholder until the ALG-641 copy doc is approved. The old line claimed
    // ten thousand; migration into this Core collection is still running, so the
    // card now prints 745 beside it. The claim had to go, not the number.
    tagline: "Meaner art, one migration at a time.",
    accent: "#3ddad7",
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
    status: "live",
    slug: "pig-mud",
    name: "Pig Mud",
    // Placeholder until the ALG-641 copy doc is approved. It replaces
    // "Something’s coming." — 2,073 are minted and held, so the teaser had
    // outlived itself.
    tagline: "Straight out of the mud.",
    accent: "#d9a066",
    // No marketplaceUrl: no listing page exists for this collection yet, so the
    // cell renders live and inert rather than promising a destination.
    art: { kind: "image", src: "/piggy/covers/pig-mud.png" },
  },
];

/**
 * Named lookup for the hero fan, which used to destructure COLLECTIONS[0..2]
 * positionally. Undefined rather than a throw: the fan is decorative, and this
 * repo has no error boundary to catch a render-time throw.
 */
export function bySlug(slug: string): Collection | undefined {
  return COLLECTIONS.find((collection) => collection.slug === slug);
}

/** A live collection with the indexer's counts merged in. */
export type LiveDisplayCollection = LiveCollection & Stats;

/**
 * What the strip renders. Counts are nullable because the indexer's `stats` is:
 * a cell omits a missing number rather than printing 0, which would be a claim
 * about the chain.
 */
export type DisplayCollection = LiveDisplayCollection | ComingSoonCollection;

export function withStats(stats: ReadonlyMap<string, Stats>): DisplayCollection[] {
  const known = new Set(COLLECTIONS.map((collection) => collection.slug));
  for (const slug of stats.keys()) {
    if (!known.has(slug)) {
      console.warn(`indexer: serves a collection this site does not list — ${slug}`);
    }
  }

  return COLLECTIONS.map((collection) =>
    collection.status === "live"
      ? { ...collection, ...(stats.get(collection.slug) ?? { supply: null, holders: null }) }
      : collection,
  );
}
