import type { Metadata } from 'next';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { createRootMetadata, organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = createRootMetadata();

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
            __html: JSON.stringify(organizationSchema)
          }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema)
          }}
        />
        <header className="site-header">
          <div className="navbar">
            <div className="brand-name">Mu’assis</div>
            <Navigation />
          </div>
          <ScrollProgressBar />
        </header>
        <main>{children}</main>
        <footer>
          Mu’assis: Muslim Founders Australia — Uniting Muslims to Shape Futures — in business, in
          community, and for the next generation.
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
