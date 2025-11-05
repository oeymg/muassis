import { createPageMetadata } from '@/lib/seo';
import { TallyEmbed } from '@/components/TallyEmbed';

export const metadata = createPageMetadata('pathways');

export default function PathwaysApplyPage() {
  return (
    <div className="pathways-raw-embed">
      <div className="pathways-embed-panel">
        <h1 className="pathways-embed-title">Apply to our network</h1>
        <TallyEmbed formId="3lPEbV" title="Mu'assis Pathways - Apply" />
      </div>
    </div>
  );
}
