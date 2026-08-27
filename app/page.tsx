import { AppCard } from "@/components/app-card";
import { CollectionsStrip } from "@/components/collections-strip";
import { Hero } from "@/components/hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { APPS } from "@/lib/apps.config";

const NAV_LINK =
  "rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

export default function Home() {
  return (
    <>
      <SiteHeader>
        <nav aria-label="Sections" className="flex items-center gap-1">
          <a href="#apps" className={NAV_LINK}>
            Apps
          </a>
          <a href="#collections" className={NAV_LINK}>
            Collections
          </a>
        </nav>
      </SiteHeader>

      <main className="flex-1">
        <Hero />

        <section
          id="apps"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-16"
        >
          <h2 className="mb-4 text-sm font-medium tracking-[0.14em] text-ink-muted uppercase">
            Apps
          </h2>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {APPS.map((app) => (
              <li key={app.name} className="flex">
                <AppCard app={app} />
              </li>
            ))}
          </ul>
        </section>

        <section
          id="collections"
          className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 pb-16"
        >
          <h2 className="mb-4 text-sm font-medium tracking-[0.14em] text-ink-muted uppercase">
            Collections
          </h2>
          <CollectionsStrip />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
