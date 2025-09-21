import Link from 'next/link';

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
          <span className="eyebrow">What we are</span>
          <h1>Mu’assis</h1>
          <p>A Muslim founders network in Australia.</p>
          <p className="muted-line">
            Mu’assis (مؤسس) translates to “the establisher” — a founder who lays enduring foundations
            for purposeful ventures.
          </p>
          <div className="hero-actions">
            <Link className="cta-button" href="/join">
              Join the network
            </Link>
            <Link className="link-ghost" href="/community">
              Explore the community
            </Link>
          </div>
        </div>

        <div className="hero-panels">
          <div className="hero-panel">
            <h2>Founders in motion</h2>
            <p>
              Weekly circles, operating playbooks, and shared accountability so every builder stays on
              track.
            </p>
          </div>
          <div className="hero-panel">
            <h2>Backed by purpose</h2>
            <p>
              We design ventures that honour faith, strengthen community, and deliver sustainable
              impact.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Who we are</h2>
        <p>Entrepreneurs, innovators, and professionals building ventures with purpose.</p>
      </section>

      <section className="section">
        <h2>Why we’re here</h2>
        <p>To unite Muslims, share knowledge, and shape the future together.</p>
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
              Join the network
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
