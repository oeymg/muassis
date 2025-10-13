import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { getUpcomingEvents } from '@/lib/events';

function getLumaEmbedUrl(registrationUrl: string): string | null {
  try {
    const url = new URL(registrationUrl);
    const hostname = url.hostname.toLowerCase();

    const isLumaHost = hostname.endsWith('lu.ma') || hostname.endsWith('luma.com');

    if (!isLumaHost) {
      return null;
    }

    const slug = url.pathname.replace(/^\/|\/$/g, '').split('/').pop();

    if (!slug) {
      return null;
    }

    return `https://lu.ma/embed-checkout/${slug}`;
  } catch (error) {
    return null;
  }
}

export const metadata = createPageMetadata('events');
export const dynamic = 'force-static';

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  if (events.length === 0) {
    return (
      <section className="section events-page">
        <header className="events-hero">
          <span className="events-kicker">Mu’assis Events</span>
          <h1>More gatherings coming soon</h1>
          <p>
            We are lining up collaborative builds, mentorship sessions, and community pitch circles. Join the
            Mu’assis list so you are first to know when registrations open.
          </p>
          <Link className="cta-button" href="/join">
            Join Mu’assis →
          </Link>
        </header>
      </section>
    );
  }

  const [nextEvent, ...otherEvents] = events;
  const lumaEmbedUrl = getLumaEmbedUrl(nextEvent.registrationUrl);

  return (
    <section className="section events-page">
      <header className="events-hero">
        <span className="events-kicker">Mu’assis Events</span>
        <h1>{nextEvent.title}</h1>
        <p>{nextEvent.tagline}</p>
        {nextEvent.hosts ? <p className="events-host">{nextEvent.hosts}</p> : null}
        <dl className="events-meta">
          <div className="events-meta-item">
            <dt>Date</dt>
            <dd>{nextEvent.dateLabel}</dd>
          </div>
          <div className="events-meta-item">
            <dt>Time</dt>
            <dd>{nextEvent.timeLabel}</dd>
          </div>
          <div className="events-meta-item">
            <dt>Location</dt>
            <dd>{nextEvent.location}</dd>
          </div>
          {nextEvent.ticketPrice ? (
            <div className="events-meta-item">
              <dt>Ticket</dt>
              <dd>{nextEvent.ticketPrice}</dd>
            </div>
          ) : null}
        </dl>
        {nextEvent.contactEmail ? (
          <p className="events-contact">
            <span>Questions?</span>{' '}
            <a href={`mailto:${nextEvent.contactEmail}`}>{nextEvent.contactEmail}</a>
          </p>
        ) : null}
        <Link
          className="cta-button"
          href={nextEvent.registrationUrl}
          target="_blank"
          rel="noreferrer"
        >
          Get tickets →
        </Link>
      </header>

      {lumaEmbedUrl ? (
        <section className="events-embed">
          <iframe
            className="events-embed-frame"
            title={`${nextEvent.title} registration`}
            src={lumaEmbedUrl}
            loading="lazy"
            allow="payment *; clipboard-write *; fullscreen"
          />
        </section>
      ) : null}

      <section className="events-calendar-embed" role="region" aria-label="Mu’assis events calendar">
        <iframe
          className="events-calendar-frame"
          src="https://luma.com/embed/calendar/cal-b1QvtkB46zl3Rj6/events"
          title="Mu’assis events calendar"
          loading="lazy"
          allow="payment *; clipboard-write *; fullscreen"
        />
      </section>

      <article className="events-overview">
        <h2>Why this sprint matters</h2>
        <p className="events-summary">{nextEvent.summary}</p>
        <ul className="events-highlights" role="list">
          {nextEvent.highlights.map((highlight) => (
            <li key={highlight.title} className="events-highlight">
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </li>
          ))}
        </ul>
      </article>

      <aside className="events-partners">
        <h2>Community partners</h2>
        <ul role="list" className="events-partner-list">
          {nextEvent.partners.map((partner) => (
            <li key={partner.name}>{partner.name}</li>
          ))}
        </ul>
      </aside>

      {otherEvents.length > 0 ? (
        <section className="events-future">
          <h2>Looking ahead</h2>
          <ul role="list" className="events-future-list">
            {otherEvents.map((event) => (
              <li key={event.slug}>
                <strong>{event.title}</strong>
                <span>{event.dateLabel}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </section>
  );
}
