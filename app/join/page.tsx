import Link from 'next/link';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('join');

const slackHighlights = [
  'Join real-time channels for venture updates, intros, and resource swaps.',
  'Drop questions and receive direction from fellow founders and operators.',
  'Gather for async stand-ups and keep momentum between live sessions.'
];

export default function JoinPage() {
  return (
    <section className="section join-section">
      <h1>Join the Muslim Founders Club</h1>

      <div className="slack-banner">
        <div className="slack-copy">
          <h2>Step inside our Slack community</h2>
          <p>
            Mu’assis members gather on Slack to exchange insights, open doors, and stand shoulder to
            shoulder as they build.
          </p>
          <ul className="slack-highlights">
            {slackHighlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <Link
          className="slack-button"
          href="https://join.slack.com/t/muassismuslim-2ea1047/shared_invite/zt-3dwd96j79-eERof5OJlSwL02mjbkGhYQ"
          target="_blank"
          rel="noreferrer"
        >
          Enter the Slack Community
        </Link>
      </div>

      <div className="join-overview">
        <div className="join-guidance">
          <h2>How to introduce yourself</h2>
          <p>
            When you arrive in Slack, share a short intro in the <code>#introductions</code> channel:
          </p>
          <ol>
            <li>Your name, venture, and where you are based.</li>
            <li>The problem you are solving and who you serve.</li>
            <li>The kind of support or collaborators you hope to find.</li>
          </ol>
        </div>

        <div className="join-welcome">
          <h2>Welcome to Mu’assis</h2>
          <p>
            Build boldly, anchor your vision in faith, and walk with founders who are shaping futures
            together.
          </p>
        </div>
      </div>
    </section>
  );
}
