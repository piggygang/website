import type { CSSProperties } from "react";
import { CollectionArt } from "@/components/collection-art";
import { COLLECTIONS } from "@/lib/collections";
import { SITE } from "@/lib/site";

const FRAME = "overflow-hidden rounded-card border border-[var(--accent)] bg-surface";
const SIDE = `h-28 w-28 translate-y-2 sm:h-44 sm:w-44 sm:translate-y-3 ${FRAME}`;

export function Hero() {
  // The two logo covers flank the namesake composite; lib/collections.ts
  // keeps these three first.
  const [sol, girl, gang] = COLLECTIONS;

  return (
    <section className="mx-auto w-full max-w-6xl px-5 pt-14 pb-12 text-center sm:pt-20">
      {/* Decorative — the collections band below is the linked, labelled
          version of the same trio. Depth is opaque surfaces overlapping
          behind the z-10 centre card; no shadows anywhere in this system. */}
      <div aria-hidden="true" className="flex items-center justify-center">
        <div
          style={{ "--accent": sol.accent } as CSSProperties}
          className={`-rotate-6 ${SIDE}`}
        >
          <CollectionArt art={sol.art} alt="" eager />
        </div>
        <div
          style={{ "--accent": gang.accent } as CSSProperties}
          className={`z-10 -mx-8 h-36 w-36 sm:-mx-10 sm:h-56 sm:w-56 ${FRAME}`}
        >
          <CollectionArt art={gang.art} alt="" eager />
        </div>
        <div
          style={{ "--accent": girl.accent } as CSSProperties}
          className={`rotate-6 ${SIDE}`}
        >
          <CollectionArt art={girl.art} alt="" eager />
        </div>
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
