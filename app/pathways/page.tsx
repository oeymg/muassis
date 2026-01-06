import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';
import { Reveal } from '@/components/Reveal';

export const metadata = createPageMetadata('pathways');

const pathwayFeatures = [
  {
    title: 'Apply to the Network',
    description:
      'Join a curated community of talented professionals. Share your skills and aspirations—we connect you with opportunities that match your values and goals.'
  },
  {
    title: 'List a Role',
    description:
      'Building a team? Post your opportunity and reach exceptional talent who prioritize excellence, integrity, and meaningful impact.'
  },
  {
    title: 'Get Matched',
    description:
      'We combine your preferences with our network intelligence to create high-quality introductions between candidates and opportunities.'
  }
] as const;

const candidateSteps = [
  {
    number: '01',
    title: 'Apply',
    detail: 'Share your skills, interests, and availability through our simple application.'
  },
  {
    number: '02',
    title: 'Verify',
    detail: 'We review your profile and add you to our vetted talent pool.'
  },
  {
    number: '03',
    title: 'Match',
    detail: 'Receive notifications when roles align with your goals and experience.'
  }
] as const;

const employerSteps = [
  {
    number: '01',
    title: 'Submit',
    detail: 'Share details about the role, requirements, and your team culture.'
  },
  {
    number: '02',
    title: 'Review',
    detail: 'We shortlist values-aligned candidates from our curated network.'
  },
  {
    number: '03',
    title: 'Hire',
    detail: 'Connect with candidates, conduct interviews, and build your team.'
  }
] as const;

const trustPrinciples = [
  {
    title: 'Values-aligned matching',
    detail: 'We prioritize excellence, integrity, and meaningful impact in every connection.'
  },
  {
    title: 'Privacy-first approach',
    detail: 'Your information is only shared with verified opportunities you approve.'
  },
  {
    title: 'Human-reviewed quality',
    detail: 'Every submission is personally reviewed before matching or going live.'
  }
] as const;

const faqs = [
  {
    question: 'Who can apply to Pathways?',
    answer:
      'Students, graduates, and professionals across Australia. We welcome all disciplines and experience levels who are committed to excellence and impact.'
  },
  {
    question: 'Do opportunities need to be paid?',
    answer:
      'Paid roles are strongly preferred. If listing a volunteer opportunity, please clearly communicate expectations, time commitment, and the value provided to participants.'
  },
  {
    question: 'Who can hire through Pathways?',
    answer:
      'We prioritize values-aligned organizations that emphasize excellence, integrity, and meaningful impact. If your culture aligns with these principles, you are welcome to hire through Pathways.'
  },
  {
    question: 'How do you handle my data?',
    answer:
      'We only share candidate details with verified opportunities. Your privacy is paramount - you can request data removal anytime via contact@muassis.org'
  },
  {
    question: 'What is the match fee?',
    answer:
      'For employers, we charge a small fee only when a successful hire is made. This helps us sustain and grow the platform for the community. No fee for candidates.'
  }
] as const;

export default function PathwaysPage() {
  return (
    <>
      {/* Hero Section */}
      <Reveal as="section" className="section pathways-hero" variant="fade">
        <div className="pathways-hero-content">
          <span className="pathways-kicker">Pathways by Mu&apos;assis</span>
          <h1 className="pathways-headline">
            Build careers and teams
            <br />
            <span className="pathways-subhead">rooted in excellence and purpose</span>
          </h1>
          <p className="pathways-lede">
            Connect exceptional talent with meaningful opportunities. Whether you&apos;re seeking your next
            role or building a team, Pathways creates values-aligned matches that drive impact.
          </p>
          <div className="pathways-hero-actions">
            <Link className="cta-button" href="#apply">
              Apply to Network
            </Link>
            <Link className="cta-button cta-button--secondary" href="#hire">
              Hire Talent
            </Link>
          </div>
        </div>
      </Reveal>

      {/* Features Section */}
      <Reveal as="section" className="section pathways-features" variant="rise">
        <div className="pathways-features-header">
          <h2>How Pathways works</h2>
        </div>
        <div className="pathways-features-grid" role="list">
          {pathwayFeatures.map((feature, index) => (
            <Reveal
              key={feature.title}
              as="article"
              className="pathways-feature-card"
              role="listitem"
              variant="scale"
              delay={index * 90}
            >
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* CTA Section - Split */}
      <section className="section pathways-cta-split">
        <Reveal as="article" id="apply" className="pathways-cta-card pathways-cta-primary" variant="rise">
          <div className="pathways-cta-content">
            <span className="pathways-cta-label">For candidates</span>
            <h2>Ready to advance your career?</h2>
            <p>
              Join our curated network and get matched with opportunities that align with your skills,
              values, and aspirations.
            </p>
            <Link className="cta-button" href="/pathways/apply">
              Apply to Pathways →
            </Link>
          </div>
        </Reveal>

        <Reveal as="article" id="hire" className="pathways-cta-card pathways-cta-secondary" variant="rise" delay={150}>
          <div className="pathways-cta-content">
            <span className="pathways-cta-label">For employers</span>
            <h2>Building your team?</h2>
            <p>
              Access exceptional talent who prioritize craft, character, and meaningful impact. We charge a
              small match fee only when you make a successful hire.
            </p>
            <Link className="cta-button cta-button--secondary" href="/pathways/hire">
              Hire through Pathways →
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Process Section - Side by side */}
      <Reveal as="section" className="section pathways-process" variant="rise">
        <div className="pathways-process-header">
          <h2>The process</h2>
          <p>Simple, transparent steps for both candidates and employers</p>
        </div>

        <div className="pathways-process-grid">
          <div className="pathways-process-track">
            <h3 className="pathways-track-title">For candidates</h3>
            <div className="pathways-steps">
              {candidateSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  as="article"
                  className="pathways-step-card"
                  variant="scale"
                  delay={index * 90}
                >
                  <span className="pathways-step-number">{step.number}</span>
                  <div className="pathways-step-content">
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="pathways-process-track">
            <h3 className="pathways-track-title">For employers</h3>
            <div className="pathways-steps">
              {employerSteps.map((step, index) => (
                <Reveal
                  key={step.title}
                  as="article"
                  className="pathways-step-card"
                  variant="scale"
                  delay={index * 90}
                >
                  <span className="pathways-step-number">{step.number}</span>
                  <div className="pathways-step-content">
                    <h4>{step.title}</h4>
                    <p>{step.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Trust Section */}
      <Reveal as="section" className="section pathways-trust" variant="rise">
        <div className="pathways-trust-header">
          <h2>Built on trust</h2>
        </div>
        <div className="pathways-trust-grid" role="list">
          {trustPrinciples.map((principle, index) => (
            <Reveal
              key={principle.title}
              as="article"
              className="pathways-trust-card"
              role="listitem"
              variant="scale"
              delay={index * 90}
            >
              <h3>{principle.title}</h3>
              <p>{principle.detail}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* FAQ Section */}
      <Reveal as="section" className="section pathways-faq" variant="rise">
        <div className="pathways-faq-header">
          <h2>Frequently asked questions</h2>
        </div>
        <div className="pathways-faq-list">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} as="details" className="pathways-faq-item" variant="scale" delay={index * 60}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* Final CTA */}
      <Reveal as="section" className="section pathways-final-cta" variant="rise">
        <div className="pathways-final-cta-content">
          <h2>Ready to get started?</h2>
          <p>Join exceptional talent and values-aligned organizations building the future together.</p>
          <div className="pathways-final-cta-actions">
            <Link className="cta-button" href="/pathways/apply">
              Apply to Network
            </Link>
            <Link className="cta-button cta-button--secondary" href="/pathways/hire">
              Hire Talent
            </Link>
            <Link className="link-ghost" href="mailto:contact@muassis.org">
              Contact Us
            </Link>
          </div>
        </div>
      </Reveal>
    </>
  );
}
