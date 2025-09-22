import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community | Mu’assis: Muslim Founders Australia',
  description:
    'Explore how Mu’assis activates Muslim founders through shared intelligence, collective resources, and collaborative builds across Australia.',
  alternates: {
    canonical: '/community'
  },
  openGraph: {
    title: 'Community | Mu’assis',
    description:
      'See how Muslim founders in Australia collaborate via Mu’assis to surface needs, share solutions, and co-build ventures.',
    url: 'https://muassis.org/community'
  }
};

const timeline = [
  {
    title: 'Signal',
    description:
      'Share the problem you are tackling with the community pulse. We map demand and surface shared needs.'
  },
  {
    title: 'Shape',
    description:
      'Co-design solutions through challenge sprints, pairing founders with domain experts and mentors.'
  },
  {
    title: 'Support',
    description:
      'Unlock resources, pilots, and backers — from capital to first customers — with coordinated follow-through.'
  }
];

const collaborations = [
  {
    title: 'Halal Finance Coalition',
    detail: 'Structuring Sharia-compliant financing tools for emerging founders and SMEs.'
  },
  {
    title: 'Future Skill Labs',
    detail: 'Upskilling Muslim youth with venture-backed founders mentoring the next generation.'
  },
  {
    title: 'Community Health Pilot',
    detail: 'Deploying preventative-care services in partnership with local clinics and startups.'
  }
];

export default function CommunityPage() {
  return (
    <section className="section community">
      <h1>What the Ummah Needs</h1>
      <p>
        We are creating a collaborative engine where Muslim founders surface challenges, test
        solutions, and back each other with capital, time, and dua.
      </p>

      <div className="community-grid" role="list">
        <article className="community-card" role="listitem">
          <h3>Shared Intelligence</h3>
          <p>
            Map unmet needs across sectors, validate insights with the community, and publish
            actionable briefs that help ventures launch with clarity.
          </p>
        </article>
        <article className="community-card" role="listitem">
          <h3>Collective Resources</h3>
          <p>
            Pool mentorship, professional services, and aligned investors so founders can access the
            right expertise at the right moment in their journey.
          </p>
        </article>
        <article className="community-card" role="listitem">
          <h3>Collaborative Builds</h3>
          <p>
            Form venture squads that prototype, test, and iterate together to deliver products that
            strengthen the Australian Muslim ecosystem.
          </p>
        </article>
      </div>

      <div className="community-timeline">
        <h2>From idea to impact</h2>
        <div className="timeline-track">
          {timeline.map((item, index) => (
            <article key={item.title} className="timeline-node">
              <span className="timeline-index">{index + 1}</span>
              <div className="timeline-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="community-next">
        <h2>How we move forward</h2>
        <ul>
          <li>Monthly founder circles to surface pressing needs and share playbooks.</li>
          <li>Challenge sprints pairing domain experts with problem owners.</li>
          <li>Digital knowledge hub curating research, tools, and case studies.</li>
        </ul>
      </div>

      <div className="collaboration-grid" role="list">
        {collaborations.map((collaboration) => (
          <article key={collaboration.title} className="collaboration-card" role="listitem">
            <h3>{collaboration.title}</h3>
            <p>{collaboration.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
