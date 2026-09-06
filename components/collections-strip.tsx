import type { CSSProperties } from "react";
import { CollectionArt } from "@/components/collection-art";
import type { DisplayCollection, LiveDisplayCollection } from "@/lib/collections";

const CELL = "flex h-full gap-3 rounded-xl p-3";
const WELL = "h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-line";
const META = "flex min-w-0 flex-1 flex-col gap-1.5";
const ROW = "flex items-baseline justify-between gap-3";
// Label over value, matching ../explorer/components/collection-card.tsx so the
// same two numbers read the same way on both sites. A bare figure used to sit in
// the title row saying nothing about what it counted.
//
// A flex row rather than that card's grid: this cell is much wider than it is
// tall, and equal grid columns would strand Holders against the far edge instead
// of pairing it with Supply.
const STATS = "mt-1 flex flex-wrap gap-x-8 gap-y-1";
const STAT_LABEL = "text-xs text-ink-muted";
const STAT_VALUE = "font-mono text-sm";
const CTA = "mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--accent)]";

/**
 * The indexer's counts. Both are nullable — `stats` is a short-TTL cached
 * aggregate the server may answer without, and lib/indexer.ts also reports a
 * missing indexer this way — so a null column disappears and an entirely
 * unanswered collection loses the band, rather than either printing 0.
 */
function Counts({ collection }: { collection: LiveDisplayCollection }) {
  const stats = (
    [
      ["Supply", collection.supply],
      ["Holders", collection.holders],
    ] as const
  ).flatMap(([label, value]) => (value === null ? [] : [[label, value] as [string, number]]));

  if (stats.length === 0) return null;

  return (
    <dl className={STATS}>
      {stats.map(([label, value]) => (
        <div key={label}>
          <dt className={STAT_LABEL}>{label}</dt>
          <dd className={STAT_VALUE}>{value.toLocaleString("en-US")}</dd>
        </div>
      ))}
    </dl>
  );
}

function Cell({ collection }: { collection: DisplayCollection }) {
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

  const inner = (
    <>
      {/* Decorative — the name beside it names the collection. */}
      <div aria-hidden="true" className={`${WELL} bg-surface-raised`}>
        <CollectionArt
          art={collection.art}
          alt=""
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className={META}>
        <h3 className="text-base font-semibold tracking-tight transition-colors group-hover:text-[var(--accent)]">
          {collection.name}
        </h3>
        <p className="text-sm text-ink-muted">{collection.tagline}</p>
        <Counts collection={collection} />
        {collection.marketplaceUrl && (
          <span className={CTA}>
            Marketplace
            <span
              aria-hidden="true"
              className="transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </span>
        )}
      </div>
    </>
  );

  // Minted and held, but with nowhere to send anyone yet: inert on purpose,
  // the way an app card with no url is.
  if (!collection.marketplaceUrl) {
    return <div className={CELL}>{inner}</div>;
  }

  return (
    <a
      href={collection.marketplaceUrl}
      target="_blank"
      rel="noreferrer"
      // The whole cell is the target, so without this the link's accessible name
      // would be the tagline plus two figures that change on every revalidation
      // — and change shape when the indexer is silent. The content still reads
      // in browse mode.
      aria-label={`${collection.name} — Marketplace`}
      className={`group ${CELL} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      {inner}
    </a>
  );
}

export function CollectionsStrip({ collections }: { collections: DisplayCollection[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
      {collections.map((collection) => (
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
