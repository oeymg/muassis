import { createPageMetadata } from '@/lib/seo';
import { TallyEmbed } from '@/components/TallyEmbed';

export const metadata = createPageMetadata('pathways');

export default function PathwaysHirePage() {
  return (
    <div className="pathways-raw-embed">
      <div className="pathways-embed-panel">
        <h1 className="pathways-embed-title">Hire from our network</h1>
        <TallyEmbed formId="mBPRz4" title="Mu'assis Pathways - Hire" />
      </div>
    </div>
  );
}
