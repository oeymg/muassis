import Script from 'next/script';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('pathways');

export default function PathwaysHirePage() {
  return (
    <>
      <Script src="https://tally.so/widgets/embed.js" strategy="beforeInteractive" />
      <div className="pathways-raw-embed">
        <iframe
          data-tally-src="https://tally.so/r/mBPRz4"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Mu'assis Pathways - Hire"
        />
      </div>
    </>
  );
}
