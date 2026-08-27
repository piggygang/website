import type { CSSProperties } from "react";
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
            className="group flex h-full flex-col gap-1.5 rounded-xl p-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="flex items-center gap-2 text-base font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full bg-[var(--accent)]"
                />
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
          </a>
        </div>
      ))}
    </div>
  );
}
