import Script from 'next/script';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata('pathways');

export default function PathwaysApplyPage() {
  return (
    <>
      <Script async src="https://tally.so/widgets/embed.js" />
      <div className="pathways-raw-embed">
        <iframe
          data-tally-src="https://tally.so/r/3lPEbV"
          width="100%"
          height="100%"
          frameBorder="0"
          marginHeight={0}
          marginWidth={0}
          title="Mu'assis Pathways - Apply"
        />
      </div>
    </>
  );
}
