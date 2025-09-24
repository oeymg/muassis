import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('community');

const futures = [
  {
    title: 'Business',
    description:
      'Founders, startups, and operators building ventures that honour faith and deliver sustainable growth.'
  },
  {
    title: 'Ummah',
    description:
      'Community-first collaborations that strengthen collective resilience, shared resources, and belonging.'
  },
  {
    title: 'Next Generation',
    description:
      'Mentorship pipelines, visible role models, and clear pathways for Muslim youth to build and lead.'
  }
];

const timeline = [
  {
    title: 'Signal',
    description:
      'Founder circles surface the most urgent needs facing our businesses, families, and neighbourhoods.'
  },
  {
    title: 'Shape',
    description:
      'Challenge sprints pair problem owners with domain experts to co-design solutions the whole ummah can trust.'
  },
  {
    title: 'Support',
    description:
      'Coordinated follow-through delivers resources, pilots, capital, and dua so every build sustains momentum.'
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
      <h1>The Futures We’re Building</h1>
      <p className="community-lede">
        Each layer of Mu’assis is designed to compound impact — from the ventures we launch, to the
        community we fortify, to the young Muslims who will inherit every blueprint we draft today.
      </p>

      <div className="community-grid" role="list">
        {futures.map((future) => (
          <article key={future.title} className="community-card" role="listitem">
            <h3>{future.title}</h3>
            <p>{future.description}</p>
          </article>
        ))}
      </div>

      <div className="community-timeline">
        <h2>How each future comes to life</h2>
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
        <h2>How we keep building</h2>
        <ul>
          <li>Monthly founder circles to exchange intelligence across business, ummah, and youth needs.</li>
          <li>Challenge sprints activating mentors, operators, and partners around focused problem statements.</li>
          <li>Digital knowledge hubs archiving playbooks so the next generation can pick up and accelerate.</li>
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
