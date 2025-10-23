import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { NewsletterForm } from '@/components/NewsletterForm';

export const metadata = createPageMetadata('join');

const slackHighlights = [
  'Join real-time channels for venture updates, intros, and resource swaps.',
  'Drop questions and receive direction from fellow founders and operators.',
  'Gather for async stand-ups and keep momentum between live sessions.'
];

const followLinks = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/muassis.au/',
    handle: '@muassis.au',
    variant: 'instagram',
    cta: 'Follow on Instagram'
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/muassis/',
    handle: 'Mu’assis',
    variant: 'linkedin',
    cta: 'Follow on LinkedIn'
  },
  {
    label: 'Newsletter',
    url: 'https://muassis.substack.com/',
    handle: 'muassis.substack.com',
    variant: 'newsletter',
    cta: 'Read the Newsletter'
  }
] as const;

export default function JoinPage() {
  return (
    <section className="section join-section">
      <h1>Join the Muslim Founders Network</h1>

      <div className="slack-banner">
        <div className="slack-copy">
          <h2>Step inside our Slack community</h2>
          <p>
            We are building a community on Slack and WhatsApp where Mu’assis members exchange insights,
            open doors, and stand shoulder to shoulder as they build.
          </p>
          <ul className="slack-highlights">
            {slackHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="slack-cta-buttons">
          <Link
            className="slack-button"
            href="https://join.slack.com/t/muassismuslim-2ea1047/shared_invite/zt-3dwd96j79-eERof5OJlSwL02mjbkGhYQ"
            target="_blank"
            rel="noreferrer"
          >
            Enter the Slack Community
          </Link>
          <Link
            className="slack-button slack-button--whatsapp"
            href="https://chat.whatsapp.com/GCckr3Gcgvo8C0WkwU66hc"
            target="_blank"
            rel="noreferrer"
          >
            Join the WhatsApp Group
          </Link>
        </div>
      </div>

      <div className="join-overview">
        <div className="join-guidance">
          <h2>How to introduce yourself</h2>
          <p>
            When you arrive in Slack, share a short intro in the <code>#introductions</code> channel:
          </p>
          <ol>
            <li>Your name, venture, and where you are based.</li>
            <li>The problem you are solving and who you serve.</li>
            <li>The kind of support or collaborators you hope to find.</li>
          </ol>
        </div>
      </div>

      <section className="join-follow" aria-labelledby="join-follow-heading">
        <h2 id="join-follow-heading">Follow Mu’assis</h2>
        <p>Stay close to every drop, from build sprints to founder spotlights and hiring calls.</p>
        <div className="join-follow-grid">
          {followLinks.map(({ label, url, handle, variant, cta }) => (
            <article key={label} className={`join-follow-tile join-follow-tile--${variant}`}>
              <div className="join-follow-tile-body">
                <span className="join-follow-tag">{label}</span>
                <h3>{handle}</h3>
              </div>
              <Link className="join-follow-button" href={url} target="_blank" rel="noreferrer">
                {cta}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="join-newsletter" aria-labelledby="join-newsletter-heading">
        <h2 id="join-newsletter-heading">Subscribe to the Mu’assis Newsletter</h2>
        <p>
          Stay close to the founders, stories, and tools we are crafting together. Get occasional updates
          on upcoming builds, community happenings, and ways to contribute.
        </p>
        <NewsletterForm className="newsletter-form" />
      </section>
    </section>
  );
}
