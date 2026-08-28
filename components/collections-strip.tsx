import type { CSSProperties } from "react";
import { CollectionArt } from "@/components/collection-art";
import { COLLECTIONS, type Collection } from "@/lib/collections";

const CELL = "flex h-full gap-3 rounded-xl p-3";
const WELL = "h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line";
const META = "flex min-w-0 flex-1 flex-col gap-1.5";
const ROW = "flex items-baseline justify-between gap-3";

function Cell({ collection }: { collection: Collection }) {
  if (collection.status === "coming-soon") {
    return (
      <div className={CELL}>
        {/* Decorative — the name beside it names the collection. */}
        <div aria-hidden="true" className={`${WELL} bg-surface`}>
          <CollectionArt art={collection.art} alt="" className="opacity-75" />
        </div>
        <div className={META}>
          <div className={ROW}>
            <h3 className="text-base font-semibold tracking-tight text-ink-muted">
              {collection.name}
            </h3>
            <span className="shrink-0 rounded-full border border-line px-2 py-0.5 font-mono text-[11px] text-ink-muted">
              Coming soon
            </span>
          </div>
          <p className="text-sm text-ink-muted">{collection.tagline}</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={collection.marketplaceUrl}
      target="_blank"
      rel="noreferrer"
      className={`group ${CELL} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      {/* Decorative — the name beside it names the collection. */}
      <div aria-hidden="true" className={`${WELL} bg-surface-raised`}>
        <CollectionArt
          art={collection.art}
          alt=""
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className={META}>
        <div className={ROW}>
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
  );
}

export function CollectionsStrip() {
  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
      {COLLECTIONS.map((collection) => (
        // The 1px grid gutter over bg-line is the divider, so any cell count
        // and wrap works; the p-2 wrapper keeps the link's focus ring clear
        // of the band's overflow-hidden corner clip.
        <div
          key={collection.slug}
          style={{ "--accent": collection.accent } as CSSProperties}
          className="bg-surface p-2"
        >
          <Cell collection={collection} />
        </div>
      ))}
    </div>
  );
}
