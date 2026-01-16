'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

type NavLink = {
  href: string;
  label: string;
  variant?: 'cta';
};

const navLinks: readonly NavLink[] = [
  { href: '/community', label: 'Community' },
  { href: '/pathways', label: 'Pathways' },
  { href: '/launchpad', label: 'Launchpad' },
  { href: '/launchpad/apply', label: 'Apply', variant: 'cta' }
] as const;

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="nav" aria-label="Primary">
      <button
        type="button"
        className="nav-toggle"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((open) => !open)}
      >
        <span className="nav-toggle-text">{isOpen ? 'Close' : 'Menu'}</span>
        <span className="nav-toggle-icon" aria-hidden="true">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <div
        id="primary-navigation"
        className={`nav-links${isOpen ? ' is-open' : ''}`}
      >
        {navLinks.map(({ href, label, variant }) => {
          const isActive =
            pathname === href ||
            (href !== '/' &&
              href !== '/launchpad' &&
              pathname?.startsWith(`${href}/`)) ||
            (href === '/launchpad' &&
              pathname?.startsWith('/launchpad') &&
              !pathname?.startsWith('/launchpad/apply')) ||
            (href === '/community' && pathname?.startsWith('/Spotlight'));

          return (
            <Link
              key={href}
              href={href}
              className={`nav-link${variant === 'cta' ? ' nav-link--cta' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => setIsOpen(false)}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
