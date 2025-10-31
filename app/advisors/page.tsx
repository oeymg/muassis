import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('advisors');

type Advisor = {
  name: string;
  title: string;
  muassisRole: string;
  summary: string;
  highlights: readonly string[];
  sectors?: string;
};

const advisors: Advisor[] = [
  {
    name: 'Salmin Khan',
    title: 'Principal, Tact Advisory',
    muassisRole: 'Strategic direction',
    summary:
      'Salmin pairs tactical finance expertise with Mu’assis institutional partnerships.',
    highlights: [
      'Business valuations and reporting for tax, acquisition, and legal matters',
      'Restructuring strategies to protect assets and limit losses',
      'Financial literacy mentoring so owners know where — and how — to improve'
    ]
  },
  {
    name: 'Abdul Khan',
    title: 'Investment Partner',
    muassisRole: 'Investment partnerships',
    summary:
      'Abdul brings two decades of cross-market investment experience to help founders grow capital value.',
    highlights: [
      'Leverages broad networks to deliver corporate solutions and acquisition support',
      'Guides teams to lift profitability and realise stronger returns on long-held assets',
      'Keeps clients ahead with timely insight on market shifts and regulatory updates'
    ]
  }
] as const;

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export default function AdvisorsPage() {
  return (
    <>
      <section className="section advisors-hero">
        <span className="advisors-kicker">Mu’assis Advisors</span>
        <h1>The Partners at Mu&apos;assis</h1>
        <p>Hands-on advisors who focus on strategic direction, capital growth, and long-term stewardship.</p>
      </section>

      <section className="section advisors-roster" aria-label="Advisory circle">
        <div className="advisors-grid" role="list">
          {advisors.map((advisor) => (
            <article key={advisor.name} className="advisor-card" role="listitem">
              <header className="advisor-card-header">
                <div className="advisor-avatar" aria-hidden="true">
                  {getInitials(advisor.name)}
                </div>
                <div className="advisor-card-heading">
                  <h3>{advisor.name}</h3>
                  <p className="advisor-role">{advisor.title}</p>
                  <p className="advisor-muassis-role">{advisor.muassisRole}</p>
                </div>
              </header>
              <p className="advisor-summary">{advisor.summary}</p>
              <ul className="advisor-highlights">
                {advisor.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {advisor.sectors ? <p className="advisor-sectors">{advisor.sectors}</p> : null}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
