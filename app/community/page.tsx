import Image from "next/image";
import Link from "next/link";
import { createPageMetadata } from "@/lib/seo";
import { getSpotlightSummaries } from "@/lib/spotlight";

export const metadata = createPageMetadata("community");
export const dynamic = "force-static";

export default async function CommunityPage() {
  const futures = [
    {
      title: "Business",
      description:
        "Founders, startups, and operators building ventures that honour faith and deliver sustainable growth."
    },
    {
      title: "Ummah",
      description:
        "Community-first collaborations that strengthen collective resilience, shared resources, and belonging."
    },
    {
      title: "Next Generation",
      description:
        "Mentorship pipelines, visible role models, and clear pathways for Muslim youth to build and lead."
    }
  ];
  const spotlights = await getSpotlightSummaries();

  return (
    <>
      <section className="section community community-hero" style={{ paddingBottom: "clamp(0.6rem, 2vw, 1.2rem)" }}>
        <h1>The Futures We’re Building</h1>
        <p className="community-lede">
          Each layer of Mu’assis is designed to compound impact — from the ventures we launch, to the
          community we fortify, to the young Muslims who will inherit every blueprint we draft today.
        </p>

        <div className="community-grid" role="list">
          {futures.map((future) => (
            <article key={future.title} className="community-card" role="listitem">
              <h3>{future.title}</h3>
              <p>{future.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section spotlight-index community-spotlights" style={{ marginTop: "-1.2rem" }}>
        <header className="spotlight-header">
          <h2>Founder Spotlight Series</h2>
          <p>Read the stories of Muslim Mu’assis across Australia.</p>
        </header>

        {spotlights.length === 0 ? (
          <p className="spotlight-empty">Founder spotlights are coming soon. Check back shortly.</p>
        ) : (
          <div className="spotlight-grid" role="list">
            {spotlights.map((spotlight, index) => (
              <Link
                key={spotlight.slug}
                href={spotlight.href}
                className="spotlight-card"
                role="listitem"
              >
                <div className="spotlight-card-media">
                  <Image
                    src={spotlight.heroImage.src}
                    alt={spotlight.heroImage.alt}
                    width={spotlight.heroImage.width}
                    height={spotlight.heroImage.height}
                    sizes="(min-width: 960px) 320px, (min-width: 640px) 45vw, 90vw"
                    className="spotlight-card-image"
                    priority={index === 0}
                  />
                </div>
                <div className="spotlight-card-body">
                  <h3>
                    {spotlight.founder} – {spotlight.company}
                  </h3>
                  {spotlight.tagline ? (
                    <p className="spotlight-card-tagline">{spotlight.tagline}</p>
                  ) : null}
                  <span className="spotlight-card-link">Read the spotlight →</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
