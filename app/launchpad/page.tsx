'use client';

import Image from 'next/image';
import Link from 'next/link';

const advisors = [
  {
    name: 'Nazley Khan',
    role: 'Legal',
    icon: 'fa-solid fa-scale-balanced',
    image: '/nazley.jpg',
    credentials: 'Corporate Law & Compliance',
    venture: 'Blackstone Legal'
  },
  {
    name: 'Salmin Khan',
    role: 'Strategy',
    icon: 'fa-solid fa-chess',
    image: '/salmin.jpeg',
    credentials: 'Market Positioning & GTM',
    venture: 'TACT Advisory'
  },
  {
    name: 'Mariam Rehman',
    role: 'Brand',
    icon: 'fa-solid fa-palette',
    image: '/mariam.png',
    credentials: 'Identity & Communications',
    venture: 'Monale'
  },
  {
    name: 'Abdul Khan',
    role: 'Capital',
    icon: 'fa-solid fa-chart-line',
    image: '/abdul.jpeg',
    credentials: 'Capital Raising & Investor Relations',
    venture: 'Vested'
  }
];

const curriculumSteps = [
  {
    step: '01',
    title: 'Governance',
    subtitle: 'Foundation',
    icon: 'fa-solid fa-hammer',
    description: 'Legal structure, shareholder agreements, and compliance frameworks.'
  },
  {
    step: '02',
    title: 'Growth',
    subtitle: 'Acquisition',
    icon: 'fa-solid fa-rocket',
    description: 'GTM strategy, operational efficiency, customer acquisition, and brand positioning.'
  },
  {
    step: '03',
    title: 'Launch',
    subtitle: 'Capital',
    icon: 'fa-solid fa-money-bill-trend-up',
    description: 'Investor relations, due diligence, and capital raising.'
  }
];

const outcomes = [
  {
    title: 'Institutional-Grade Structure',
    description: 'Walk away with a properly incorporated entity, cap table, and governance documents ready for investor scrutiny.',
    icon: 'fa-solid fa-building'
  },
  {
    title: 'Financial Model & Projections',
    description: 'Build defensible financial forecasts that demonstrate unit economics, runway, and path to profitability.',
    icon: 'fa-solid fa-chart-line'
  },
  {
    title: 'Investor-Ready Materials',
    description: 'Develop pitch decks, data rooms, and documentation that meet institutional capital standards.',
    icon: 'fa-solid fa-folder-open'
  },
  {
    title: 'Strategic Network Access',
    description: 'Direct introductions to investors, advisors, and operators who can accelerate your growth trajectory.',
    icon: 'fa-solid fa-network-wired'
  }
];

const faqs = [
  {
    question: 'What is the time commitment?',
    answer: 'The Launchpad runs for 3 months with weekly sessions (4-6 hours/week) plus independent work. Expect to dedicate 10-15 hours per week to get maximum value.'
  },
  {
    question: 'Is this program equity-based?',
    answer: 'No. We do not take equity in your venture. The Launchpad operates on a straightforward program fee structure.'
  },
  {
    question: 'Do I need to be incorporated already?',
    answer: 'No. Whether you\'re pre-incorporation or already operating, we meet you where you are and build the appropriate governance structure.'
  },
  {
    question: 'When does the cohort start?',
    answer: 'The 2026 cohort launches in Q2. Applications are reviewed on a rolling basis, and we recommend applying early as spots are limited.'
  }
];

const audiencePaths = [
  {
    key: 'visionary',
    title: 'THE VISIONARY',
    description: 'You have conviction and lived insight. You need customer discovery, a focused MVP, and a clear business model.'
  },
  {
    key: 'builder',
    title: 'THE BUILDER',
    description: 'You are shaping the product, team, and early traction. You need legal structure, go-to-market clarity, and a launch plan investors respect.'
  },
  {
    key: 'scaler',
    title: 'THE SCALER',
    description: 'You have traction and need repeatable growth, strategic hiring, and aligned capital to scale with integrity.'
  }
] as const;

export default function LaunchpadPage() {
  return (
    <div className="launchpad-industrial">
      {/* Hero Section */}
      <section className="launchpad-hero-industrial">
        <div className="launchpad-hero-center">
          <div className="launchpad-status-badge">
            <span className="launchpad-status-dot"></span>
            APPLICATIONS OPEN // BATCH 2026
          </div>
          <h1 className="launchpad-hero-title">
            <span className="launchpad-title-small">Mu’assis // Founder</span>
            <span className="launchpad-title-large">LAUNCHPAD</span>
          </h1>
          <p className="launchpad-hero-subtitle">
            Make something, that lasts.
          </p>
          <div className="launchpad-hero-cta-group">
            <Link href="/launchpad/apply" className="launchpad-hero-btn">
              APPLY NOW <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>

          {/* Embedded Value Props */}
          <div className="launchpad-hero-props">
            <div className="launchpad-hero-prop-item">
              <i className="fa-solid fa-calendar-days"></i>
              <span>90-Day Program</span>
            </div>
            <div className="launchpad-hero-prop-item">
              <i className="fa-solid fa-users-gear"></i>
              <span>Expert Advisors</span>
            </div>
            <div className="launchpad-hero-prop-item">
              <i className="fa-solid fa-circle-check"></i>
              <span>Investor-Ready Outcomes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Audience Section - Choose Your Path */}
      <section className="launchpad-audience-industrial">
        <div className="launchpad-audience-layout">
          <div className="launchpad-audience-copy">
            <span className="launchpad-kicker">{'//'} FOUNDERS WE BACK</span>
            <h2>BUILT FOR EVERY STAGE</h2>
            <p className="launchpad-section-intro">
              From first validation to scale, our Launchpad meets you where you are and moves you forward.
            </p>
          </div>
          <div className="launchpad-path-grid">
            {audiencePaths.map((path, index) => (
              <div
                key={path.key}
                className="launchpad-path-card"
              >
                <span className="launchpad-path-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="launchpad-path-body">
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum Timeline */}
      <section className="launchpad-curriculum-industrial">
        <div className="launchpad-section-title">
          <span className="launchpad-kicker">{'//'} SOLVE YOUR PROBLEM</span>
          <h2>OUR STRATEGY</h2>
          <p className="launchpad-section-intro">
            A deliberate 90-day sequence that takes you from formation to funded scale, closing the gaps that stall founders:
            fragmented execution, weak structure, and unclear direction.
          </p>
        </div>
        <div className="launchpad-timeline-horizontal">
          {curriculumSteps.map((step, index) => (
            <div key={index} className="launchpad-timeline-step">
              <div className="launchpad-step-number">{step.step}</div>
              <i className={`${step.icon} launchpad-step-icon`}></i>
              <h3>{step.title}</h3>
              <div className="launchpad-step-subtitle">{step.subtitle}</div>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Advisors Section */}
      <section className="launchpad-advisors-industrial">
        <div className="launchpad-section-title">
          <span className="launchpad-kicker">{'//'} THE TEAM</span>
          <h2>EXPERT ADVISORS</h2>
          <p className="launchpad-section-intro">
            A focused advisory bench across legal, strategy, capital, and brand to guide founders through every stage.
          </p>
        </div>
        <div className="launchpad-advisors-grid">
          {advisors.map((advisor, index) => (
            <div key={index} className="launchpad-advisor-card">
              <Image
                src={advisor.image}
                alt={advisor.name}
                width={96}
                height={96}
                className="launchpad-advisor-photo"
                sizes="96px"
              />
              <h3>{advisor.name}</h3>
              <div className="launchpad-advisor-role">{advisor.role}</div>
              <div className="launchpad-advisor-credentials">{advisor.credentials}</div>
              <div className="launchpad-advisor-venture">{advisor.venture}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="apply" className="launchpad-final-cta-industrial">
        <div className="launchpad-cta-content">
          <div className="launchpad-cta-copy">
            <div className="launchpad-cta-badge">APPLICATIONS OPEN</div>
            <h2 className="launchpad-cta-title">
              Build a venture
              <span>worth generations</span>
            </h2>
          </div>
          <div className="launchpad-cta-actions-block">
            <p>
              Applications are now open for the 2026 cohort. Apply today to secure your spot and build with institutional support.
            </p>
            <div className="launchpad-cta-actions">
              <Link href="/launchpad/apply" className="launchpad-final-btn launchpad-final-btn--primary">
                APPLY NOW <i className="fa-solid fa-arrow-right"></i>
              </Link>
              <Link href="mailto:contact@muassis.org?subject=Launchpad%20Inquiry" className="launchpad-final-btn launchpad-final-btn--secondary">
                ASK A QUESTION
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
