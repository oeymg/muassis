'use client';

import Link from 'next/link';

type AnnouncementBannerProps = {
  text: string;
  link?: string;
};

export function AnnouncementBanner({ text, link }: AnnouncementBannerProps) {
  const content = (
    <div className="announcement-banner-minimal">
      <div className="announcement-minimal-content">
        {text}
      </div>
    </div>
  );

  if (link) {
    return (
      <Link href={link} className="announcement-banner-minimal-link">
        {content}
      </Link>
    );
  }

  return content;
}
