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

const impactStats = [
  { value: '45+', label: 'Active founders exchanging playbooks weekly.' },
  { value: '$8M', label: 'Capital collectively deployed into purposeful ventures.' },
  { value: '12', label: 'Industry tracks spanning tech, finance, health, and social impact.' }
];

const focusTracks = [
  {
    title: 'Impact Tech',
    copy:
      'Build digital products that empower Muslims across education, finance, and wellbeing in Australia.'
  },
  {
    title: 'Real Economy',
    copy:
      'Launch halal ventures in property, hospitality, and manufacturing with community-backed resilience.'
  },
  {
    title: 'Capital & Philanthropy',
    copy:
      'Design funding vehicles and waqf-inspired models that sustain founders and reinvest into the Ummah.'
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

      <section className="section impact">
        <h2>Momentum by the numbers</h2>
        <div className="impact-grid" role="list">
          {impactStats.map((stat) => (
            <article key={stat.label} className="stat-card" role="listitem">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Who we are</h2>
        <p>Entrepreneurs, innovators, and professionals building ventures with purpose.</p>
      </section>

      <section className="section focus">
        <h2>Tracks we activate</h2>
        <div className="focus-grid" role="list">
          {focusTracks.map((track) => (
            <article key={track.title} className="focus-card" role="listitem">
              <h3>{track.title}</h3>
              <p>{track.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Why we’re here</h2>
        <p>To unite Muslims, share knowledge, and shape the future together.</p>
      </section>

      <section className="section journey">
        <h2>The founder journey</h2>
        <ol>
          {founderJourney.map((stage) => (
            <li key={stage.title}>
              <span className="journey-step">{stage.title}</span>
              <p>{stage.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section cta-section">
        <div className="cta-copy">
          <h2>Build with the Ummah</h2>
          <p>
            Join a founders club that pairs conviction with execution. Share your vision, find
            collaborators, and accelerate the impact of ventures rooted in faith.
          </p>
        </div>
        <Link className="cta-button" href="/join">
          Join the network
        </Link>
      </section>
    </>
  );
}
