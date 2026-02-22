import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import './mobile.css';
import { Navigation } from '@/components/Navigation';
import { ScrollProgressBar } from '@/components/ScrollProgressBar';
import { ScrollRevealManager } from '@/components/ScrollRevealManager';
import { createRootMetadata, organizationSchema, websiteSchema } from '@/lib/seo';

export const metadata: Metadata = createRootMetadata();
const GOOGLE_ANALYTICS_ID = 'G-8NRWVGL695';

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <link rel="preconnect" href="https://tally.so" crossOrigin="anonymous" />
      </head>
      <body>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ANALYTICS_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ANALYTICS_ID}');
          `}
        </Script>
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
            <Link href="/" className="brand-mark" aria-label="Mu’assis Home">
              <Image
                src="/logo.svg"
                alt="Mu’assis"
                width={220}
                height={65}
                priority
                sizes="(max-width: 640px) 110px, (max-width: 1024px) 150px, 180px"
                className="brand-mark-logo"
              />
            </Link>
            <Navigation />
          </div>
          <ScrollProgressBar />
        </header>
        <main>{children}</main>
        <footer className="site-footer-minimal">
          <div className="site-footer-copy">
            <span>© 2025 Mu&apos;assis: Scaling for Generations</span>
            <span>the ethical ecosystem in Australia</span>
          </div>
          <div className="site-footer-links">
            <Link href="/blog" className="site-footer-link">
              Blog
            </Link>
          </div>
          <div className="site-footer-social">
            <span className="site-footer-social-title">Connect with us</span>
            <div className="site-footer-social-links" role="list">
              <Link
                href="https://www.instagram.com/muassis.au"
                target="_blank"
                rel="noreferrer"
                className="site-footer-social-link"
                role="listitem"
              >
                <span className="site-footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle className="icon-fill" cx="17" cy="7" r="1.3" />
                  </svg>
                </span>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://www.linkedin.com/company/muassis-au/"
                target="_blank"
                rel="noreferrer"
                className="site-footer-social-link"
                role="listitem"
              >
                <span className="site-footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <rect x="3" y="3" width="18" height="18" rx="3" ry="3" />
                    <circle className="icon-fill" cx="8.4" cy="9" r="1.25" />
                    <path d="M7.2 11.4h2.6v6.6H7.2z" />
                    <path d="M12.3 11.4h2.1a2.3 2.3 0 0 1 2.3 2.3v4.3h-2.6v-4c0-0.48-0.39-0.87-0.87-0.87h-0.87v4.87H9.8v-6.6z" />
                  </svg>
                </span>
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link
                href="mailto:team@muassis.au"
                className="site-footer-social-link"
                role="listitem"
              >
                <span className="site-footer-social-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" role="presentation">
                    <rect x="3" y="5" width="18" height="14" rx="2" ry="2" />
                    <path d="M4 7l8 6 8-6" />
                  </svg>
                </span>
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
        </footer>
        <ScrollRevealManager />
        <Analytics />
        <Script
          src="https://motionmade-fastapi.onrender.com/widget.js"
          data-tenant="muassis"
          data-name="Muassis"
          data-phone="0438744870"
          data-color="#2563EB"
          data-mode="float"
          data-api="https://motionmade-fastapi.onrender.com"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
