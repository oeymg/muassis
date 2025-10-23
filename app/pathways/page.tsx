import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('pathways');

const whatWeDo = [
  {
    title: 'Apply to the Network',
    description:
      'Join a curated pool of Muslim students, graduates, and professionals. Tell us your skills and interests—we’ll match you to relevant roles.'
  },
  {
    title: 'List a Role',
    description:
      'Hiring for a project or team? Share your opportunity and reach talent who value excellence, integrity, and impact.'
  },
  {
    title: 'Get Matched',
    description:
      'We combine your preferences with our network insights to introduce you to high-fit candidates or roles.'
  }
] as const;

const howItWorks = [
  {
    track: 'For candidates',
    steps: [
      {
        title: 'Apply',
        detail: 'Share your skills, interests, and availability.'
      },
      {
        title: 'Verify',
        detail: 'We review your profile and add you to our talent pool.'
      },
      {
        title: 'Match',
        detail: 'Get notified when roles align with your goals.'
      }
    ]
  },
  {
    track: 'For employers',
    steps: [
      {
        title: 'Submit a role',
        detail: 'Tell us about the role, scope, and timelines.'
      },
      {
        title: 'Review',
        detail: 'We shortlist values-aligned candidates.'
      },
      {
        title: 'Hire',
        detail: 'Connect, interview, and build your team.'
      }
    ]
  }
] as const;

const trustPoints = [
  {
    title: 'Values-aligned',
    detail: 'We prioritise excellence (ihsan), impact, and integrity (amanah).'
  },
  {
    title: 'Privacy-first',
    detail: 'Your details are only shared with vetted opportunities.'
  },
  {
    title: 'Human review',
    detail: 'Submissions are checked before going live or matched.'
  }
] as const;

const faqs = [
  {
    question: 'Who can apply to Pathways?',
    answer: 'Students, graduates, and professionals across Australia. We welcome all disciplines and experience levels.'
  },
  {
    question: 'Does my opportunity have to be paid?',
    answer:
      'Paid roles are preferred. If you’re listing a volunteer role, please be clear about expectations and benefits.'
  },
  {
    question: 'Is Pathways only for Muslim-led organisations?',
    answer:
      'We prioritise Muslim-led and values-aligned organisations. If your culture aligns with our values, you’re welcome to hire through Pathways.'
  },
  {
    question: 'How do you handle my data?',
    answer: 'We only share candidate details with vetted opportunities. You can request removal anytime.'
  }
] as const;

export default function PathwaysPage() {
  return (
    <div className="pathways-layout">
      <section className="section pathways-hero">
        <span className="pathways-kicker">Pathways by Mu&apos;assis</span>
      </section>

      <section className="section pathways-section" aria-labelledby="pathways-what">
        <h2 id="pathways-what">Build careers and teams anchored in ihsan</h2>
        <div className="pathways-card-grid" role="list">
          {whatWeDo.map(({ title, description }) => (
            <article key={title} className="pathways-card" role="listitem">
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section pathways-section" aria-label="Call to action">
        <div className="pathways-cta-grid">
          <article id="apply" className="pathways-cta-card">
            <h3>Ready to take the next step?</h3>
            <p>Join the network and get matched with roles that fit your skills and values.</p>
            <Link className="pathways-button" href="/pathways/apply">
              Apply to Pathways
            </Link>
          </article>
          <article id="hire" className="pathways-cta-card">
            <h3>Hiring? List your opportunity.</h3>
            <p>Reach talented Muslims who care about craft and character.</p>
            <Link className="pathways-button pathways-button--secondary" href="/pathways/hire">
              Hire through Pathways
            </Link>
          </article>
        </div>
      </section>

      <section className="section pathways-section" aria-labelledby="pathways-how">
        <h2 id="pathways-how">How it works</h2>
        <div className="pathways-flip-grid" role="list">
          {howItWorks.map(({ track, steps }) => {
            const baseId = track.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '');

            return (
              <article key={track} className="pathways-flip-card" role="listitem">
                <div
                  className="pathways-flip-inner"
                  tabIndex={0}
                  aria-labelledby={`${baseId}-title`}
                  aria-describedby={`${baseId}-hint`}
                >
                  <div className="pathways-flip-face pathways-flip-front">
                    <span className="pathways-card-tag">{track}</span>
                    <h3 id={`${baseId}-title`}>Steps at a glance</h3>
                    <ul className="pathways-flip-steps" aria-label={`${track} steps`}>
                      {steps.map(({ title }, index) => (
                        <li key={title}>
                          <span className="pathways-step-index">{String(index + 1).padStart(2, '0')}</span>
                          <span>{title}</span>
                        </li>
                      ))}
                    </ul>
                    <span id={`${baseId}-hint`} className="pathways-flip-hint">
                      Hover or focus to see the full process
                    </span>
                  </div>
                  <div className="pathways-flip-face pathways-flip-back">
                    <h3>How it works</h3>
                    <ol>
                      {steps.map(({ title, detail }) => (
                        <li key={title}>
                          <strong>{title}</strong>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section pathways-section" aria-labelledby="pathways-trust">
        <h2 id="pathways-trust">Built on trust</h2>
        <ul className="pathways-list">
          {trustPoints.map(({ title, detail }) => (
            <li key={title}>
              <strong>{title} —</strong> {detail}
            </li>
          ))}
        </ul>
      </section>

      <section className="section pathways-section" aria-labelledby="pathways-faqs">
        <h2 id="pathways-faqs">FAQs</h2>
        <div className="pathways-faq-list">
          {faqs.map(({ question, answer }) => (
            <details key={question} className="pathways-faq">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="section pathways-section" aria-label="Next steps">
        <div className="pathways-cta-grid">
          <article className="pathways-cta-card">
            <h3>Ready to take the next step?</h3>
            <p>Join the network and get matched with roles that fit your skills and values.</p>
            <Link className="pathways-button" href="/pathways/apply">
              Apply to Pathways
            </Link>
          </article>
          <article className="pathways-cta-card">
            <h3>Hiring? List your opportunity.</h3>
            <p>Reach talented Muslims who care about craft and character.</p>
            <Link className="pathways-button pathways-button--secondary" href="/pathways/hire">
              Hire through Pathways
            </Link>
          </article>
          <article className="pathways-cta-card">
            <h3>Have questions?</h3>
            <p>We’re here to help. Reach out and we’ll get back to you with the details you need.</p>
            <Link className="pathways-button pathways-button--ghost" href="mailto:contact@saysalams.com.au">
              Contact Us
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
