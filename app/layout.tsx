import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  metadataBase: new URL('https://muassis.org'),
  title: {
    default: 'Mu’assis: Muslim Founders Australia',
    template: '%s | Mu’assis'
  },
  description:
    'Mu’assis is a Muslim founders network in Australia uniting entrepreneurs, innovators, and professionals building ventures with purpose.',
  keywords: [
    'Mu’assis',
    'Muslim founders',
    'Muslim entrepreneurs Australia',
    'Islamic startups',
    'Muslim venture network'
  ],
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Mu’assis: Muslim Founders Australia',
    description:
      'A Muslim founders network in Australia uniting entrepreneurs, innovators, and professionals building ventures with purpose.',
    url: 'https://muassis.org',
    siteName: 'Mu’assis',
    locale: 'en_AU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mu’assis: Muslim Founders Australia',
    description:
      'A Muslim founders network in Australia uniting entrepreneurs, innovators, and professionals building ventures with purpose.',
    creator: '@muassis_org'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Script
          id="organization-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Mu’assis: Muslim Founders Australia',
              url: 'https://muassis.org',
              logo: 'https://muassis.org/favicon.ico',
              missionStatement:
                'A Muslim founders network in Australia uniting entrepreneurs, innovators, and professionals building ventures with purpose.'
            })
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Mu’assis',
              url: 'https://muassis.org'
            })
          }}
        />
        <header className="site-header">
          <div className="navbar">
            <div className="brand">Mu’assis</div>
            <Navigation />
          </div>
        </header>
        <main>{children}</main>
        <footer>Mu’assis: Muslim Founders Australia — Uniting Muslims to Shape Futures.</footer>
      </body>
    </html>
  );
}
