'use client';

import { useEffect, useRef, useState } from 'react';

type TallyEmbedProps = {
  formId: string;
  title: string;
  minHeight?: number;
};

export function TallyEmbed({ formId, title, minHeight = 1700 }: TallyEmbedProps) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState(minHeight);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://tally.so') {
        return;
      }

      if (!iframeRef.current || iframeRef.current.contentWindow !== event.source) {
        return;
      }

      const data = event.data as Record<string, unknown> | null;
      if (!data || typeof data !== 'object') {
        return;
      }

      if (data.formId !== formId) {
        return;
      }

      const height = Number(data.height);
      if (!Number.isFinite(height) || height <= 0) {
        return;
      }

      setIframeHeight(Math.max(height, minHeight));
      setIsLoaded(true);
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [formId, minHeight]);

  return (
    <iframe
      ref={iframeRef}
      className="tally-embed-frame"
      src={`https://tally.so/embed/${formId}?alignLeft=1&hideTitle=1&dynamicHeight=1&backgroundColor=000000&textColor=FFFFFF`}
      title={title}
      width="100%"
      height={iframeHeight}
      loading="lazy"
      allow="fullscreen; clipboard-read; clipboard-write"
      scrolling="no"
      allowTransparency
      data-tally-iframe="true"
      data-loaded={isLoaded ? 'true' : 'false'}
      style={{ height: iframeHeight, minHeight }}
      onLoad={() => setIsLoaded(true)}
    />
  );
}
