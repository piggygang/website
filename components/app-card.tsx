import type { CSSProperties } from "react";
import type { App } from "@/lib/apps.config";

const CARD = "flex w-full flex-col gap-4 rounded-card p-5";
const TILE = "flex h-11 w-11 items-center justify-center rounded-full border";
const BADGE = "rounded-full px-2 py-0.5 font-mono text-[11px]";

function Icon({ d }: { d: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

export function AppCard({ app }: { app: App }) {
  const accent = { "--accent": app.accent } as CSSProperties;

  if (app.status === "coming-soon") {
    // Not a link: hover brightens the border only, without promising
    // navigation the card cannot deliver.
    return (
      <div
        style={accent}
        className={`${CARD} border border-dashed border-line bg-surface/50 transition-colors hover:border-ink-muted`}
      >
        <div className="flex items-center justify-between gap-3">
          <span
            aria-hidden="true"
            className={`${TILE} border-line bg-[var(--accent)]/5 text-ink-muted`}
          >
            <Icon d={app.icon} />
          </span>
          <span className={`${BADGE} border border-line text-ink-muted`}>
            Coming soon
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-base font-semibold tracking-tight text-ink-muted">
            {app.name}
          </h3>
          <p className="text-sm text-ink-muted">{app.blurb}</p>
        </div>
      </div>
    );
  }

  return (
    <a
      href={app.url}
      target="_blank"
      rel="noreferrer"
      style={accent}
      className={`group ${CARD} border border-line bg-surface transition-colors hover:border-[var(--accent)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]`}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          aria-hidden="true"
          className={`${TILE} border-line bg-surface-raised text-[var(--accent)]`}
        >
          <Icon d={app.icon} />
        </span>
        <span
          className={`inline-flex items-center gap-1.5 ${BADGE} bg-[var(--accent)]/15 text-[var(--accent)]`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
          Live
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1.5">
        <h3 className="text-base font-semibold tracking-tight">{app.name}</h3>
        <p className="text-sm text-ink-muted">{app.blurb}</p>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm font-medium text-[var(--accent)]">
          Open app
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
