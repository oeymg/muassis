'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },
  { href: '/advisors', label: 'Advisors' },
  { href: '/pathways', label: 'Pathways' },
  { href: '/join', label: 'Join', variant: 'cta' as const }
] as const;

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav-links" aria-label="Primary">
      {navLinks.map(({ href, label, variant }) => {
        const isActive =
          pathname === href ||
          (href !== '/' && pathname?.startsWith(`${href}/`)) ||
          (href === '/community' && pathname?.startsWith('/Spotlight'));

        return (
          <Link
            key={href}
            href={href}
            className={`nav-link${variant === 'cta' ? ' nav-link--cta' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
