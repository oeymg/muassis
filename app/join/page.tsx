import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Join'
};

const benefits = [
  'Access curated founder circles and themed working sessions.',
  'Get matched with mentors, service partners, and values-aligned investors.',
  'Share your challenges and receive structured feedback within 72 hours.',
  'Co-build ventures with founders who share your vision and principles.'
];

const prepSteps = [
  'Have a concise description of your venture or idea (under 200 words).',
  'Share the traction or validation you have so far — pilot, prototype, or community signal.',
  'Let us know what support you are seeking in the next 90 days.'
];

const stages = ['Idea', 'MVP', 'In Market', 'Scale'];

export default function JoinPage() {
  return (
    <section className="section join-section">
      <h1>Join the Muslim Founders Club</h1>
      <div className="join-layout">
        <div className="join-copy">
          <p>
            Tell us about the venture or idea you are nurturing. We review each submission, connect
            you with the right circles, and invite you into forums that amplify your next move.
          </p>
          <ul className="join-benefits">
            {benefits.map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className="form-guidance">
            <h2>What to prepare</h2>
            <ol>
              {prepSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <p className="join-note">Submissions are reviewed weekly. Expect a reply within 5 business days.</p>
        </div>

        <form aria-labelledby="join-form-heading">
          <h2 id="join-form-heading" className="form-title">
            Share your details
          </h2>
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" placeholder="Your name" required />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            required
          />

          <label htmlFor="stage">Stage</label>
          <select id="stage" name="stage" defaultValue="" required>
            <option value="" disabled>
              Select your current stage
            </option>
            {stages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>

          <label htmlFor="venture">Tell us about your venture/idea.</label>
          <textarea
            id="venture"
            name="venture"
            placeholder="Share your vision"
            required
          />

          <label htmlFor="support">What support do you need next?</label>
          <textarea
            id="support"
            name="support"
            placeholder="Workshopping strategy, hiring, capital, product, etc."
            required
          />

          <div className="form-status" aria-live="polite">
            We’ll send a confirmation email once we receive your submission.
          </div>

          <button type="submit">Join Now</button>
        </form>
      </div>
    </section>
  );
}
