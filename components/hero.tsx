import type { CSSProperties } from "react";
import { CollectionArt } from "@/components/collection-art";
import { bySlug, type Collection } from "@/lib/collections";
import { SITE } from "@/lib/site";

const FRAME = "overflow-hidden rounded-card border border-[var(--accent)] bg-surface";
const SIDE = `h-28 w-28 translate-y-2 sm:h-44 sm:w-44 sm:translate-y-3 ${FRAME}`;
const CENTRE = `z-10 -mx-8 h-36 w-36 sm:-mx-10 sm:h-56 sm:w-56 ${FRAME}`;

function Panel({
  collection,
  className,
}: {
  collection: Collection | undefined;
  className: string;
}) {
  if (!collection) return null;
  return (
    <div style={{ "--accent": collection.accent } as CSSProperties} className={className}>
      <CollectionArt art={collection.art} alt="" eager />
    </div>
  );
}

export function Hero() {
  // The two logo covers flank the namesake composite. Looked up by slug rather
  // than by position: this used to destructure COLLECTIONS[0..2], so reordering
  // that array silently rearranged the fan — and slug is a join key into the
  // indexer now (lib/indexer.ts), which puts the array in play.
  const sol = bySlug("piggy-sol-gang");
  const girl = bySlug("piggy-girl-gang");
  const gang = bySlug("piggy-gang");

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-14 pb-12 text-center sm:pt-20">
      {/* Decorative — the collections band below is the linked, labelled
          version of the same trio. Depth is opaque surfaces overlapping
          behind the z-10 centre card; no shadows anywhere in this system. */}
      <div aria-hidden="true" className="flex items-center justify-center">
        <Panel collection={sol} className={`-rotate-6 ${SIDE}`} />
        <Panel collection={gang} className={CENTRE} />
        <Panel collection={girl} className={`rotate-6 ${SIDE}`} />
      </div>

      <h1 className="mt-8 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
        Piggy <span className="text-brand">Gang</span>
      </h1>
      <p className="mx-auto mt-4 max-w-md text-base text-ink-muted text-pretty sm:text-lg">
        {SITE.tagline}
      </p>
    </section>
  );
}
