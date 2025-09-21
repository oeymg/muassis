import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community'
};

const metrics = [
  {
    value: '72h',
    label: 'Average time to actionable feedback on a founder challenge.'
  },
  {
    value: '3×',
    label: 'Increase in warm intros to investors and operators through the network.'
  },
  {
    value: '0%',
    label: 'Equity or membership fees — we build on contribution, not paywalls.'
  }
];

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

const testimonials = [
  {
    quote:
      'Within two weeks we uncovered partners and customers we had been chasing for months. The network moves with ihsan.',
    name: 'Amina Rahman',
    role: 'Founder, Noor Health Lab'
  },
  {
    quote:
      'It is rare to find a space where strategy, faith, and execution align this tightly. Mu’assis gives us that alignment.',
    name: 'Bilal Osman',
    role: 'Co-founder, Crescent Supply'
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

      <div className="community-metrics" role="list">
        {metrics.map((metric) => (
          <div key={metric.label} className="metric-card" role="listitem">
            <span className="metric-value">{metric.value}</span>
            <span className="metric-label">{metric.label}</span>
          </div>
        ))}
      </div>

      <div className="community-spotlight">
        <h2>Founder reflections</h2>
        <div className="testimonial-grid" role="list">
          {testimonials.map((testimonial) => (
            <blockquote key={testimonial.name} className="testimonial" role="listitem">
              <p>{testimonial.quote}</p>
              <cite>
                <span>{testimonial.name}</span>
                <span>{testimonial.role}</span>
              </cite>
            </blockquote>
          ))}
        </div>
      </div>

      <div className="community-timeline">
        <h2>From idea to impact</h2>
        <ol>
          {timeline.map((item) => (
            <li key={item.title}>
              <span className="timeline-step">{item.title}</span>
              <p>{item.description}</p>
            </li>
          ))}
        </ol>
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
