import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { HomeNewsletterModal } from '@/components/HomeNewsletterModal';
import { getSpotlightSummaries } from '@/lib/spotlight';
import { getUpcomingEvents } from '@/lib/events';

export const metadata = createPageMetadata('home');

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
  const events = await getUpcomingEvents();
  const featuredEvent = events[0];
  const upcomingEvents = events.slice(0, 3);
  const eventBadgeLabel =
    featuredEvent
      ? new Intl.DateTimeFormat('en-AU', { day: '2-digit', month: 'short' }).format(
          new Date(featuredEvent.startDate)
        ).toUpperCase()
      : null;

  return (
    <>
      <section className="section hero hero-grid">
        <div className="hero-content">
          <span className="hero-tagline">Mu’assis: Muslim Founders Australia</span>
          <h1>Uniting Muslims to Shape Futures.</h1>
        </div>
        <div className="hero-cta">
          <div className="hero-actions">
            <Link className="cta-button" href="/join">
              Join the Network
            </Link>
            <Link className="link-ghost" href="/pathways">
              Explore Pathways
            </Link>
          </div>
        </div>
      </section>

      {featuredEvent ? (
        <section className="section events-teaser">
          <div className="events-teaser-header">
            <span className="events-teaser-kicker">Upcoming Event</span>
            <h2>Build with Mu’assis</h2>
            <p>
              Join our next community sprint to connect with mentors, collaborate on solutions, and pitch
              what you build.
            </p>
          </div>
          <Link className="events-teaser-card" href="/events">
            <span className="events-teaser-icon" aria-hidden="true">
              <span className="events-teaser-icon-inner">{eventBadgeLabel}</span>
            </span>
            <span className="events-teaser-copy">
              <strong>{featuredEvent.title}</strong>
              <span>
                {featuredEvent.dateLabel} · {featuredEvent.timeLabel}
              </span>
              <span>{featuredEvent.location}</span>
            </span>
            <span className="events-teaser-cta">See details →</span>
          </Link>
        </section>
      ) : null}

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
              <Link className="link-ghost" href="/events">
                View all events
              </Link>
            </div>
          </div>
        </div>
        {upcomingEvents.length > 0 ? (
          <div className="cta-grid events-cta-grid" role="list">
            {upcomingEvents.map((event) => {
              const badge = new Intl.DateTimeFormat('en-AU', {
                day: '2-digit',
                month: 'short'
              })
                .format(new Date(event.startDate))
                .toUpperCase();

              return (
                <article key={event.slug} className="cta-card events-card" role="listitem">
                  <header className="events-card-header">
                    <span className="events-card-badge" aria-hidden="true">
                      {badge}
                    </span>
                    <div>
                      <h3>{event.title}</h3>
                      {event.hosts ? <p className="events-card-host">{event.hosts}</p> : null}
                      <p className="events-card-tagline">{event.tagline}</p>
                    </div>
                  </header>
                  <dl className="events-card-meta">
                    <div>
                      <dt>Date</dt>
                      <dd>{event.dateLabel}</dd>
                    </div>
                    <div>
                      <dt>Time</dt>
                      <dd>{event.timeLabel}</dd>
                    </div>
                    <div>
                      <dt>Location</dt>
                      <dd>{event.location}</dd>
                    </div>
                    {event.ticketPrice ? (
                      <div>
                        <dt>Ticket</dt>
                        <dd>{event.ticketPrice}</dd>
                      </div>
                    ) : null}
                  </dl>
                  <p className="events-card-summary">{event.summary}</p>
                  <Link
                    className="events-card-link"
                    href={event.registrationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Get tickets →
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="events-calendar-embed" role="region" aria-label="Mu’assis events calendar">
            <iframe
              className="events-calendar-frame"
              src="https://luma.com/embed/calendar/cal-b1QvtkB46zl3Rj6/events"
              title="Mu’assis events calendar"
              loading="lazy"
              allow="payment *; clipboard-write *; fullscreen"
            />
          </div>
        )}
      </section>

      <HomeNewsletterModal />
    </>
  );
}
