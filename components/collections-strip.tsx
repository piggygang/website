import type { CSSProperties } from "react";
import { PiggyArt } from "@/components/piggy-art";
import { COLLECTIONS } from "@/lib/collections";

export function CollectionsStrip() {
  return (
    <div className="grid divide-y divide-line overflow-hidden rounded-card border border-line bg-surface sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {COLLECTIONS.map((collection) => (
        // The p-2 wrapper carries the divide lines full-bleed and keeps the
        // anchor's rounded focus ring clear of the band's overflow-hidden
        // corner clip.
        <div
          key={collection.slug}
          style={{ "--accent": collection.accent } as CSSProperties}
          className="p-2"
        >
          <a
            href={collection.marketplaceUrl}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full gap-3 rounded-xl p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            {/* Decorative — the name beside it names the collection. */}
            <div
              aria-hidden="true"
              className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line bg-surface-raised"
            >
              <PiggyArt
                layers={collection.layers}
                alt=""
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-1.5">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                  {collection.name}
                </h3>
                <span className="font-mono text-xs text-ink-muted">
                  {collection.supply.toLocaleString("en-US")}
                </span>
              </div>
              <p className="text-sm text-ink-muted">{collection.tagline}</p>
              <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]">
                Marketplace
                <span
                  aria-hidden="true"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>
            </div>
          </a>
        </div>
      ))}
    </div>
  );
}
