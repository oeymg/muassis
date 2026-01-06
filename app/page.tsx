import Image from 'next/image';
import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { getSpotlightSummaries } from '@/lib/spotlight';
import { getUpcomingEvents } from '@/lib/events';
import { HomeNewsletterModal } from '@/components/HomeNewsletterModal';
import { Reveal } from '@/components/Reveal';
import { HeroHeadline } from '@/components/HeroHeadline';
import { HeroFocusSection } from '@/components/HeroFocusSection';
import { AnnouncementBanner } from '@/components/AnnouncementBanner';

export const metadata = createPageMetadata('home');

const visionHighlights = [
  {
    title: 'Principled Foundations',
    copy: 'We build every venture with ethical clarity and conviction, so growth never requires compromising our values.'
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

const scaleHighlights = [
  {
    title: 'Provide Mentorship',
    copy: 'Access experienced founders who guide you through real challenges with wisdom grounded in faith and experience.'
  },
  {
    title: 'Find Talent',
    copy: 'Connect with skilled professionals and builders who share your values and vision for impact.'
  },
  {
    title: 'Raise Capital',
    copy: 'Unlock funding opportunities through investors who understand both your mission and your market.'
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
      <AnnouncementBanner text="ANNOUNCEMENT. JAN 16." />
      <Reveal as={HeroFocusSection} variant="fade">
        <div className="hero-content">
          <HeroHeadline>
            Scaling for generations
            <br />
            <span className="hero-subhead">the ethical ecosystem in Australia</span>
          </HeroHeadline>
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
      </Reveal>

      {featuredEvent ? (
        <Reveal as="section" className="section events-teaser" variant="rise">
          <div className="events-teaser-header">
            <span className="events-teaser-kicker">Upcoming Event</span>
            <h2>Build with Mu’assis</h2>
            <p>
              Join our next community sprint to connect with mentors, collaborate on solutions, and pitch
              what you build.
            </p>
          </div>
          <Reveal as={Link} className="events-teaser-card" href="/events" variant="scale" delay={60}>
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
          </Reveal>
        </Reveal>
      ) : null}

      <Reveal as="section" className="section vision" variant="rise">
        <div className="vision-header">
          <span className="vision-kicker">Why we build</span>
          <h2>Our Vision</h2>
          <p className="vision-lede">
            Mu&apos;assis means &quot;the establisher&quot;. We believe every founder carries that calling —
            to lay enduring foundations for our ummah, to activate collective resources, and to leave a
            blueprint the next generation can advance.
          </p>
        </div>
        <div className="vision-grid" role="list">
          {visionHighlights.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              as="article"
              className="vision-card"
              role="listitem"
              variant="scale"
              delay={index * 90}
            >
              <h3>{highlight.title}</h3>
              <p>{highlight.copy}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      <Reveal as="section" className="section scale-section" variant="rise">
        <div className="scale-header">
          <span className="scale-kicker">More than a network</span>
          <h2 className="scale-headline">This is how we scale</h2>
          <p className="scale-lede">
            We&apos;re not just connecting founders — we&apos;re building the infrastructure that makes ventures
            sustainable, scalable, and anchored in purpose.
          </p>
        </div>
        <div className="scale-grid" role="list">
          {scaleHighlights.map((highlight, index) => (
            <Reveal
              key={highlight.title}
              as="article"
              className="scale-card"
              role="listitem"
              variant="scale"
              delay={index * 90}
            >
              <span className="scale-card-number">0{index + 1}</span>
              <div className="scale-card-content">
                <h3>{highlight.title}</h3>
                <p>{highlight.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {featuredSpotlights.length > 0 ? (
        <Reveal as="section" className="section spotlight-teaser" variant="fade">
          <div className="spotlight-teaser-header">
            <span className="spotlight-kicker">Founder Spotlight</span>
            <h2>Discover Mu’assis Journeys</h2>
            <p>Find the journeys of Mu&apos;assis across Australia.</p>
          </div>
          <div className="spotlight-teaser-grid" role="list">
            {featuredSpotlights.map((spotlight, index) => (
              <Reveal
                key={spotlight.slug}
                role="listitem"
                as={Link}
                href={spotlight.href}
                className="spotlight-teaser-item"
                variant="scale"
                delay={index * 60}
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
              </Reveal>
            ))}
          </div>
          <Reveal
            as={Link}
            className="spotlight-teaser-link"
            href="/Spotlight"
            variant="rise"
            delay={200}
          >
            Explore all spotlights →
          </Reveal>
        </Reveal>
      ) : null}

      <Reveal as="section" className="section cta-section" variant="rise">
        <div className="cta-hero">
          <span className="cta-kicker">Collective Blueprint</span>
          <div className="cta-heading-row">
            <h2>Build with us</h2>
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
            {upcomingEvents.map((event, index) => {
              const badge = new Intl.DateTimeFormat('en-AU', {
                day: '2-digit',
                month: 'short'
              })
                .format(new Date(event.startDate))
                .toUpperCase();

              return (
                <Reveal
                  key={event.slug}
                  as="article"
                  className="cta-card events-card"
                  variant="scale"
                  role="listitem"
                  delay={index * 80}
                >
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
                </Reveal>
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
      </Reveal>

      <HomeNewsletterModal />
    </>
  );
}
