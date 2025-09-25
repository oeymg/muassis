import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { HomeNewsletterModal } from '@/components/HomeNewsletterModal';

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

const founderJourney = [
  {
    title: 'Connect',
    description: 'Pair with founders tackling similar missions and surface opportunities to collaborate.'
  },
  {
    title: 'Co-Create',
    description: 'Prototype ventures together, validate hypotheses, and share growth infrastructure.'
  },
  {
    title: 'Compound',
    description: 'Scale with shared customers, talent pipelines, and reinvested returns.'
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

export default function HomePage() {
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

      <section className="section journey">
        <h2>The founder journey</h2>
        <div className="journey-track">
          {founderJourney.map((stage, index) => (
            <article key={stage.title} className="journey-node">
              <span className="journey-index">{index + 1}</span>
              <div className="journey-content">
                <h3>{stage.title}</h3>
                <p>{stage.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

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
