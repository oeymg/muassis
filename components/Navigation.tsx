'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/community', label: 'Community' },
  { href: '/join', label: 'Join' }
];

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="nav-links" aria-label="Primary">
      {links.map(({ href, label }) => {
        const isActive =
          pathname === href ||
          (href !== '/' && pathname?.startsWith(`${href}/`)) ||
          (href === '/community' && pathname?.startsWith('/Spotlight'));

        return (
          <Link
            key={href}
            href={href}
            className="nav-link"
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
