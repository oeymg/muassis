import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { getSpotlightSummaries } from '@/lib/spotlight';

export const metadata = createPageMetadata('spotlight');
export const dynamic = 'force-static';

export default async function SpotlightIndexPage() {
  const spotlights = await getSpotlightSummaries();

  return (
    <section className="section spotlight-index" data-reveal-skip="true">
      <header className="spotlight-header">
        <span className="spotlight-kicker">Founder Spotlight</span>
        <h1>Stories of builders shaping the ummah</h1>
        <p>
          Founder journeys, breakthroughs, and the principles guiding how Mu’assis companies give back,
          lead with hikmah, and design for mutual respect.
        </p>
      </header>

      {spotlights.length === 0 ? (
        <p className="spotlight-empty">Spotlight features are being prepared. Check back soon.</p>
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
                <h2>
                  {spotlight.founder} – {spotlight.company}
                </h2>
                {spotlight.tagline ? (
                  <p className="spotlight-card-tagline">{spotlight.tagline}</p>
                ) : null}
                <p className="spotlight-card-summary">{spotlight.description}</p>
                <span className="spotlight-card-link">Read the spotlight →</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
