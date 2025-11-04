import Image from 'next/image';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('team');

type TeamMember = {
  name: string;
  title: string;
  muassisRole: string;
  summary: string;
  highlights?: readonly string[];
  image?: {
    src: string;
    alt: string;
  };
};

const advisors: readonly TeamMember[] = [
  {
    name: 'Salmin Khan',
    title: 'Principal, Tact Advisory',
    muassisRole: 'Strategic direction & financial partnerships',
    summary:
      'Salmin brings deep financial acumen and strategic foresight to Mu’assis. Through his leadership at Tact Advisory, he helps shape the financial and operational frameworks that underpin our initiatives — ensuring every partnership, program, and venture is built on solid foundations.',
    highlights: [
      'Business valuations and reporting for tax, acquisition, and legal matters',
      'Restructuring and asset protection strategies that strengthen long-term sustainability',
      'Financial mentoring that equips founders and organisations with the literacy to make confident decisions'
    ],
    image: {
      src: '/salmin.jpeg',
      alt: 'Salmin Khan'
    }
  },
  {
    name: 'Abdul Khan',
    title: 'Investor & Strategic Advisor',
    muassisRole: 'Capital growth & market insight',
    summary:
      'With over two decades of cross-market investment experience, Abdul helps founders and organisations at Mu’assis grow capital value with confidence and clarity. He combines deep financial insight with a pragmatic approach to building sustainable, high-performing ventures.',
    highlights: [
      'Corporate advisory and acquisition support powered by an extensive investment network',
      'Profitability and value-growth strategies that maximise long-term returns',
      'Market and regulatory intelligence that keeps founders ahead of change'
    ],
    image: {
      src: '/abdul.jpeg',
      alt: 'Abdul Khan'
    }
  }
] as const;

export default function TeamPage() {
  return (
    <>
      <section className="section team-hero">
        <span className="team-kicker">The Mu’assis Team</span>
        <h1>The team at Mu’assis</h1>
        <p className="team-hero-lede">The team that is uniting Muslims to shape futures.</p>
      </section>

      <section className="section team-roster" aria-label="Advisory circle">
        <header className="team-roster-header">
          <span className="team-kicker">Advisory circle</span>
          <h2>Partners guiding Mu’assis</h2>
          <p>Hands-on advisors focused on strategic direction, capital growth, and long-term stewardship.</p>
        </header>
        <div className="team-grid" role="list">
          {advisors.map((advisor) => (
            <article key={advisor.name} className="team-card" role="listitem">
              <header className="team-card-header">
                <div className="team-avatar" aria-hidden="true">
                  {advisor.image ? (
                    <Image
                      src={advisor.image.src}
                      alt={advisor.image.alt}
                      width={104}
                      height={104}
                      sizes="104px"
                      className="team-avatar-image"
                    />
                  ) : (
                    advisor.name
                      .split(/\s+/)
                      .map((part) => part[0])
                      .filter(Boolean)
                      .slice(0, 2)
                      .join('')
                      .toUpperCase()
                  )}
                </div>
                <div className="team-card-heading">
                  <h3>{advisor.name}</h3>
                  <p className="team-card-title">{advisor.title}</p>
                  <p className="team-card-role">{advisor.muassisRole}</p>
                </div>
              </header>
              <p className="team-card-summary">{advisor.summary}</p>
              {advisor.highlights ? (
                <ul className="team-card-highlights">
                  {advisor.highlights.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
