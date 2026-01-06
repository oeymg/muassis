'use client';

import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { useState } from 'react';
import { NewsletterModal } from '@/components/NewsletterModal';

const advisors = [
  {
    name: 'Naz',
    role: 'Legal',
    icon: 'fa-solid fa-scale-balanced',
    credentials: 'Corporate Law & Compliance'
  },
  {
    name: 'Salmin Khan',
    role: 'Strategy',
    icon: 'fa-solid fa-chess',
    credentials: 'Market Positioning & GTM'
  },
  {
    name: 'Abdul Khan',
    role: 'Capital',
    icon: 'fa-solid fa-chart-line',
    credentials: 'Fundraising & Investor Relations'
  },
  {
    name: 'Mariam Rehman',
    role: 'Brand',
    icon: 'fa-solid fa-palette',
    credentials: 'Identity & Communications'
  }
];

const problems = [
  {
    problem: 'Fragmentation',
    solution: 'Centralized Roadmap',
    icon: 'fa-solid fa-puzzle-piece'
  },
  {
    problem: 'Structure',
    solution: 'Embedded Experts',
    icon: 'fa-solid fa-building-columns'
  },
  {
    problem: 'Direction',
    solution: 'Commercial Validation',
    icon: 'fa-solid fa-compass'
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
    description: 'GTM strategy, operational efficiency, and customer acquisition.'
  },
  {
    step: '03',
    title: 'Launch',
    subtitle: 'Capital',
    icon: 'fa-solid fa-money-bill-trend-up',
    description: 'Investor relations, due diligence, and global fundraising.'
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

export default function LaunchpadPage() {
  const [hoveredPath, setHoveredPath] = useState<'builder' | 'scaler' | null>(null);
  const [isNewsletterOpen, setIsNewsletterOpen] = useState(false);

  return (
    <div className="launchpad-industrial">
      {/* Hero Section */}
      <section className="launchpad-hero-industrial">
        <div className="launchpad-hero-center">
          <div className="launchpad-status-badge">
            <span className="launchpad-status-dot"></span>
            STATUS: PRE-LAUNCH // BATCH 2026
          </div>
          <h1 className="launchpad-hero-title">
            <span className="launchpad-title-small">MU&apos;ASSIS</span>
            <span className="launchpad-title-large">LAUNCHPAD</span>
          </h1>
          <p className="launchpad-hero-subtitle">
            The incubator for founders building for generations
          </p>
          <div className="launchpad-hero-cta-group">
            <button onClick={() => setIsNewsletterOpen(true)} className="launchpad-hero-btn">
              JOIN WAITLIST <i className="fa-solid fa-arrow-right"></i>
            </button>
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
        <div className="launchpad-section-title">
          <span className="launchpad-kicker">{'//'} CHOOSE YOUR PATH</span>
          <h2>WHO IS THIS FOR?</h2>
        </div>
        <div className="launchpad-path-grid">
          <div
            className={`launchpad-path-card ${hoveredPath === 'scaler' ? 'dimmed' : ''}`}
            onMouseEnter={() => setHoveredPath('builder')}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <i className="fa-solid fa-drafting-compass launchpad-path-icon"></i>
            <div className="launchpad-path-stage">0 → 1</div>
            <h3>THE BUILDER</h3>
            <p>
              You have deep domain expertise and market validation, but need institutional-grade legal infrastructure, financial modeling, and strategic guidance to transform your concept into a fundable venture.
            </p>
          </div>
          <div
            className={`launchpad-path-card ${hoveredPath === 'builder' ? 'dimmed' : ''}`}
            onMouseEnter={() => setHoveredPath('scaler')}
            onMouseLeave={() => setHoveredPath(null)}
          >
            <i className="fa-solid fa-rocket launchpad-path-icon"></i>
            <div className="launchpad-path-stage">1 → 10</div>
            <h3>THE SCALER</h3>
            <p>
              You&apos;ve achieved product-market fit and early traction, but need operational systems, investor-ready documentation, and access to institutional capital networks to reach sustainable scale without compromising values.
            </p>
          </div>
        </div>
      </section>

      {/* Problem/Solution Grid */}
      <section className="launchpad-problem-industrial">
        <div className="launchpad-problem-intro">
          <span className="launchpad-kicker">{'//'} THE GAPS WE FILL</span>
          <h2>Why Founders Stall</h2>
          <p className="launchpad-problem-description">
            Most early-stage ventures fail not from lack of vision, but from three structural deficits.
            We close them.
          </p>
        </div>
        <div className="launchpad-problem-stack">
          {problems.map((item, index) => (
            <div key={index} className="launchpad-problem-row">
              <div className="launchpad-problem-side">
                <div className="launchpad-problem-label">Problem {index + 1}</div>
                <h3 className="launchpad-problem-title">{item.problem}</h3>
                <p className="launchpad-problem-detail">
                  {item.problem === 'Fragmentation' && 'Disconnected tools and advice lead to operational paralysis.'}
                  {item.problem === 'Structure' && 'Scaling too fast without compliance creates invisible liabilities.'}
                  {item.problem === 'Direction' && 'Capital doesn&apos;t move without institutional-grade presentation.'}
                </p>
              </div>
              <div className="launchpad-divider">
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div className="launchpad-solution-side">
                <div className="launchpad-solution-label">Our Solution</div>
                <h3 className="launchpad-solution-title">{item.solution}</h3>
                <p className="launchpad-solution-detail">
                  {item.solution === 'Centralized Roadmap' && 'One unified system that connects legal, finance, and operations.'}
                  {item.solution === 'Embedded Experts' && 'Tier-1 advisors who build compliance frameworks from day one.'}
                  {item.solution === 'Commercial Validation' && 'The Mu&apos;assis seal that opens doors to institutional capital.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Curriculum Timeline */}
      <section className="launchpad-curriculum-industrial">
        <div className="launchpad-section-title">
          <span className="launchpad-kicker">{'//'} THE PROGRAM</span>
          <h2>THREE-PHASE SYSTEM</h2>
          <p className="launchpad-section-intro">
            A deliberate 90-day sequence that takes you from formation to funded scale. Each phase builds on the last,
            with expert guidance and tangible deliverables at every step.
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
        </div>
        <div className="launchpad-advisors-grid">
          {advisors.map((advisor, index) => (
            <div key={index} className="launchpad-advisor-card">
              <i className={`${advisor.icon} launchpad-advisor-icon`}></i>
              <h3>{advisor.name}</h3>
              <div className="launchpad-advisor-role">{advisor.role}</div>
              <div className="launchpad-advisor-credentials">{advisor.credentials}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="waitlist" className="launchpad-final-cta-industrial">
        <div className="launchpad-cta-content">
          <div className="launchpad-cta-badge">WAITLIST NOW OPEN</div>
          <h2>Build a venture<br/>worth generations</h2>
          <p>
            We&apos;re looking for purpose-driven founders ready to scale their impact without compromising their values. If that&apos;s you, we want to hear from you.
          </p>
          <div className="launchpad-cta-actions">
            <button onClick={() => setIsNewsletterOpen(true)} className="launchpad-final-btn launchpad-final-btn--primary">
              JOIN WAITLIST <i className="fa-solid fa-arrow-right"></i>
            </button>
            <Link href="mailto:contact@muassis.org?subject=Launchpad%20Inquiry" className="launchpad-final-btn launchpad-final-btn--secondary">
              ASK A QUESTION
            </Link>
          </div>
          <div className="launchpad-cta-footer">
            Waitlist open now. Applications open Q1 2026.
          </div>
        </div>
      </section>

      <NewsletterModal isOpen={isNewsletterOpen} onClose={() => setIsNewsletterOpen(false)} />
    </div>
  );
}
