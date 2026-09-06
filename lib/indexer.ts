/**
 * The hub's only network call: the indexer's collection registry.
 *
 * Contract: ../indexer/openapi/v1.yaml, `GET /v1/collections`. Hand-typed rather
 * than generated — ../explorer's openapi-fetch + openapi-typescript toolchain is
 * ~155KB of committed spec and schema, and this page reads two numbers out of it.
 * Generated types would also only stay honest with the CI job that regenerates
 * and diffs them, which the Explorer has and this repo does not; a runtime guard
 * is worth more here than a compile-time one.
 */

const DEFAULT_ORIGIN = "https://api.indexer.piggygang.net";

/**
 * `next build` blocks on this call, so a host that accepts the connection and
 * then hangs would stall a deploy until the platform's own limit. Sized for a
 * cold start rather than the warm p50 — measured TTFB is 124–290ms — because a
 * cap that is too tight costs a numberless deploy, and one that is too loose
 * only costs a slower failed build.
 */
const TIMEOUT_MS = 8_000;

export type Stats = {
  /** Member assets, excluding burned. */
  supply: number | null;
  /** Distinct current owners. */
  holders: number | null;
};

/**
 * The version prefix belongs to the request path, not the origin. A configured
 * value ending in /v1 would request /v1/v1/collections, which 404s into the
 * catch below and ships a permanently numberless page — a failure invisible
 * unless it is loud right here. Same fix as ../explorer/lib/api/client.ts.
 */
function origin(): string {
  const configured = (process.env.INDEXER_API_URL ?? DEFAULT_ORIGIN).replace(/\/+$/, "");
  if (!/\/v1$/.test(configured)) return configured;
  console.warn(
    "INDEXER_API_URL ends in /v1. The version prefix is part of the request path — using the origin instead.",
  );
  return configured.slice(0, -"/v1".length);
}

/**
 * A count, or null for anything that is not one. `stats` is nullable in the
 * contract — "short-TTL cached aggregates" the server may answer without — so a
 * missing number is normal rather than exceptional, and a field that changes
 * type in a later contract degrades to a missing number instead of throwing
 * inside render.
 */
function count(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

type Row = { slug?: unknown; stats?: { supply?: unknown; holders?: unknown } | null };

/**
 * Slug → stats for every collection the indexer serves.
 *
 * Total by construction: a refused connection, a timeout, a non-200, malformed
 * JSON and an unexpected shape all resolve to an empty map. The strip drops the
 * numbers; the page still builds and still renders every card.
 */
export async function collectionStats(): Promise<ReadonlyMap<string, Stats>> {
  const stats = new Map<string, Stats>();

  try {
    // No `?limit`. The registry is four rows, the endpoint ignores the parameter
    // today, and its maximum of 100 answers 400 rather than clamping — one
    // careless edit from a hard failure, for nothing. `hasMore` below is the
    // half that actually guards against a truncated registry.
    const response = await fetch(`${origin()}/v1/collections`, {
      signal: AbortSignal.timeout(TIMEOUT_MS),
      headers: { accept: "application/json" },
    });

    if (!response.ok) {
      console.warn(`indexer: GET /v1/collections answered ${response.status}`);
      return stats;
    }

    const page = (await response.json()) as { data?: unknown; hasMore?: unknown } | null;
    if (!Array.isArray(page?.data)) {
      console.warn("indexer: GET /v1/collections carried no data array");
      return stats;
    }
    if (page.hasMore === true) {
      console.warn("indexer: the collection registry outgrew a single page.");
    }

    for (const row of page.data as Row[]) {
      if (typeof row?.slug !== "string") continue;
      stats.set(row.slug, {
        supply: count(row.stats?.supply),
        holders: count(row.stats?.holders),
      });
    }
  } catch (error) {
    console.warn("indexer: GET /v1/collections failed", error);
  }

  return stats;
}
