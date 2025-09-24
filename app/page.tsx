import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

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

const pillars = [
  {
    title: 'Faith-Driven Strategy',
    copy:
      'Navigate growth with Islamic principles at the core of every decision, from governance to go-to-market.'
  },
  {
    title: 'Community Intelligence',
    copy:
      'Surface real needs across the Australian Muslim community and build ventures that answer them directly.'
  },
  {
    title: 'Mutual Support',
    copy:
      'Surround every founder with mentors, operators, and investors committed to collective success.'
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
        <h2>Our Vision</h2>
        <p className="vision-lede">
          At Mu’assis, we believe that building businesses is only the beginning. Mu’assis (مؤسس)
          translates to “the establisher” — a reminder that every Muslim carries the qualities needed to
          lay enduring foundations for our ummah. Every venture, every idea, every founder contributes to
          shaping something bigger — the prosperity of our ummah and the future we leave for the next
          generation.
        </p>
      </section>

      <section className="section pillars">
        <h2>Our Pillars</h2>
        <div className="pillars-grid" role="list">
          {pillars.map((pillar) => (
            <article key={pillar.title} className="pillar-card" role="listitem">
              <h3>{pillar.title}</h3>
              <p>{pillar.copy}</p>
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
          <h2>Build with the Ummah</h2>
          <p>
            Partner with Muslim founders who turn conviction into momentum. We share systems, talent,
            and belief so ventures launch sharper and scale with integrity.
          </p>
          <div className="cta-actions">
            <Link className="cta-button" href="/join">
              Join Mu’assis →
            </Link>
            <Link className="link-ghost" href="/community">
              Explore the community
            </Link>
          </div>
        </div>
        <div className="cta-grid" role="list">
          <article className="cta-card" role="listitem">
            <h3>Founder Studio</h3>
            <p>Build alongside venture squads who pair product craft with sharia-aligned governance.</p>
          </article>
          <article className="cta-card" role="listitem">
            <h3>Shared Playbooks</h3>
            <p>Tap into operating rhythms, hiring pipelines, and capital bridges sourced by the network.</p>
          </article>
          <article className="cta-card" role="listitem">
            <h3>Reciprocal Support</h3>
            <p>Trade time, intros, and dua — every win feeds back into the Ummah’s next wave of builders.</p>
          </article>
        </div>
      </section>
    </>
  );
}
