import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('pathways');

const pathwaysCards = [
  {
    id: 'hiring',
    label: 'Hiring',
    summary: 'You are hiring and want values-aligned talent.',
    heading: 'Why bring your role to Mu’assis Pathways?',
    points: [
      'Unlock a pool of Muslim founders, operators, and builders who lead with ihsan.',
      'Share your brief with a team that filters for mission, craft, and cultural alignment.',
      'Receive curated intros and support so you can hire with clarity and speed.'
    ],
    cta: {
      label: 'I am ready to hire',
      href: '/pathways/hire',
      variant: 'primary' as const
    }
  },
  {
    id: 'applying',
    label: 'Looking for a Job',
    summary: 'You are exploring your next role or contract.',
    heading: 'Why apply to the Mu’assis Pathway?',
    points: [
      'Tell your story to founders investing in faith-driven, high-impact work.',
      'Receive personalised role matches and warm intros into live opportunities.',
      'Grow with a community that champions your journey beyond the first offer.'
    ],
    cta: {
      label: 'I am ready to apply',
      href: '/pathways/apply',
      variant: 'secondary' as const
    }
  }
];

export default function PathwaysPage() {
  return (
    <section className="section pathways-section">
      <h1 className="pathways-kicker">Looking for another pathway into your dream role?</h1>
      <p className="pathways-intro">
        Choose the Mu’assis Pathway and tell us whether you are hiring or exploring your next move.
      </p>

      <div className="pathways-card-grid" role="list">
        {pathwaysCards.map(({ id, label, summary, heading, points, cta }) => (
          <article key={id} className="pathways-card" tabIndex={0} aria-label={label} role="listitem">
            <div className="pathways-card-inner">
              <div className="pathways-card-face pathways-card-front">
                <span className="pathways-card-tag">Are you</span>
                <h3>{label}</h3>
                <p>{summary}</p>
                <span className="pathways-card-hint" aria-hidden="true">
                  Flip to learn more
                </span>
              </div>
              <div className="pathways-card-face pathways-card-back">
                <h3>{heading}</h3>
                <ul>
                  {points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
            <Link
              className={`pathways-button pathways-card-cta${
                cta.variant === 'secondary' ? ' pathways-button--secondary' : ''
              }`}
              href={cta.href}
              target="_blank"
              rel="noreferrer"
            >
              {cta.label}
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
