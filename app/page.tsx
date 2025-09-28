import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { HomeNewsletterModal } from '@/components/HomeNewsletterModal';
import { getSpotlightSummaries } from '@/lib/spotlight';

export const metadata = createPageMetadata('home');

const heroFutures = [
  {
    title: 'Business',
    copy:
      'Accountability circles, shared playbooks, and faith-centred governance so every venture compounds value.'
  },
  {
    title: 'Ummah',
    copy:
      'Collaborative builds that channel capital, talent, and dua into solutions our communities urgently need.'
  },
  {
    title: 'Next Generation',
    copy:
      'Role models, mentorship, and pathways that invite young Muslims to found, lead, and inherit with confidence.'
  }
];

const visionHighlights = [
  {
    title: 'Faith-Led Foundations',
    copy: 'We blueprint every venture with prophetic principles so momentum never asks us to compromise our deen.'
  },
  {
    title: 'Collective Intelligence',
    copy: 'We listen to founders, families, and investors across the Ummah, focusing our builds where impact compounds.'
  },
  {
    title: 'Generational Continuity',
    copy: 'We design systems the next generation can inherit — ventures with governance and culture that endure beyond us.'
  }
];

export default async function HomePage() {
  const spotlights = await getSpotlightSummaries();
  const featuredSpotlights = spotlights.slice(0, 4);

  return (
    <>
      <section className="section hero hero-grid">
        <div className="hero-intro">
          <h1>Uniting Muslims to Shape Futures.</h1>
          <p className="hero-subhead">
            Not just futures in business — but the future of our ummah, and the next generation who will
            inherit it.
          </p>
          <div className="hero-actions">
            <Link className="cta-button" href="/join">
              Join Mu’assis →
            </Link>
            <Link className="link-ghost" href="/community">
              Explore the community
            </Link>
          </div>
        </div>

        <div className="hero-panels" role="list">
          {heroFutures.map((future) => (
            <article key={future.title} className="hero-panel" role="listitem">
              <h2>{future.title}</h2>
              <p>{future.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section vision">
        <div className="vision-header">
          <span className="vision-kicker">Why we build</span>
          <h2>Our Vision</h2>
          <p className="vision-lede">
            Mu’assis (مؤسس) means “the establisher”. We believe every Muslim founder carries that calling —
            to lay enduring foundations for our ummah, to activate collective resources, and to leave a
            blueprint the next generation can advance.
          </p>
        </div>
        <div className="vision-grid" role="list">
          {visionHighlights.map((highlight) => (
            <article key={highlight.title} className="vision-card" role="listitem">
              <h3>{highlight.title}</h3>
              <p>{highlight.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {featuredSpotlights.length > 0 ? (
        <section className="section spotlight-teaser">
          <div className="spotlight-teaser-header">
            <span className="spotlight-kicker">Founder Spotlight</span>
            <h2>Discover Mu’assis Journeys</h2>
            <p>Find the journeys of Muslim Mu’assis across Australia.</p>
          </div>
          <div className="spotlight-teaser-grid" role="list">
            {featuredSpotlights.map((spotlight) => (
              <Link
                key={spotlight.slug}
                href={spotlight.href}
                className="spotlight-teaser-item"
                role="listitem"
              >
                <span className="spotlight-teaser-avatar">
                  <Image
                    src={spotlight.heroImage.src}
                    alt={spotlight.heroImage.alt}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="spotlight-teaser-image"
                  />
                </span>
                <span className="spotlight-teaser-copy">
                  <strong>{spotlight.founder}</strong>
                  <span>{spotlight.company}</span>
                </span>
              </Link>
            ))}
          </div>
          <Link className="spotlight-teaser-link" href="/Spotlight">
            Explore all spotlights →
          </Link>
        </section>
      ) : null}

      <section className="section cta-section">
        <div className="cta-hero">
          <span className="cta-kicker">Collective Blueprint</span>
          <div className="cta-heading-row">
            <h2>Build with the Ummah</h2>
            <div className="cta-actions">
              <Link className="cta-button" href="/join">
                Join Mu’assis →
              </Link>
              <Link className="link-ghost" href="/community">
                Explore the community
              </Link>
            </div>
          </div>
        </div>
        <div className="cta-grid" role="list">
          <article className="cta-card accelerator-card" role="listitem">
            <h3>Muslim founders don’t build alone.</h3>
            <p>
              The Mu’assis Accelerator will connect mentors, playbooks, and peers who share intros, talent, and dua —
              so every win multiplies across the ummah.
            </p>
            <p className="accelerator-note">→ Launching soon.</p>
          </article>
        </div>
      </section>

      <HomeNewsletterModal />
    </>
  );
}
