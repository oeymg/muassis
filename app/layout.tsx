import type { Metadata } from 'next';
import './globals.css';
import { Navigation } from '@/components/Navigation';

export const metadata: Metadata = {
  title: {
    default: 'Mu’assis: Muslim Founders Australia',
    template: '%s | Mu’assis'
  },
  description:
    'Mu’assis is a Muslim founders network in Australia uniting entrepreneurs, innovators, and professionals building ventures with purpose.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
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
