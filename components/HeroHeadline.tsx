'use client';

import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type HeroHeadlineProps = {
  children: ReactNode;
};

const SCALE_MAX = 1.32;
const SCALE_MIN = 1;
const LETTER_MAX = 0.2;
const LETTER_MIN = 0.15;

export function HeroHeadline({ children }: HeroHeadlineProps) {
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const node = headingRef.current;
    if (!node || typeof window === 'undefined') return;

    let ticking = false;

    const updateScale = () => {
      if (!node) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight || 1;
      const threshold = Math.min(viewportHeight * 0.65, 520);

      const progressRaw = scrollY / threshold;
      const progress = Math.min(Math.max(progressRaw, 0), 1);

      const scale = SCALE_MAX - (SCALE_MAX - SCALE_MIN) * progress;
      const letterSpacing = LETTER_MIN + (LETTER_MAX - LETTER_MIN) * (1 - progress);
      const opacity = 1 - progress * 0.08;

      node.style.setProperty('--hero-headline-scale', scale.toFixed(3));
      node.style.setProperty('--hero-headline-letter', `${letterSpacing.toFixed(3)}em`);
      node.style.setProperty('--hero-headline-opacity', opacity.toFixed(3));

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScale);
        ticking = true;
      }
    };

    updateScale();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <h1 ref={headingRef} className="hero-headline" style={headingStyle}>
      {children}
    </h1>
  );
}

const headingStyle = {
  '--hero-headline-scale': SCALE_MAX,
  '--hero-headline-letter': `${LETTER_MAX}em`,
  '--hero-headline-opacity': 1
} as CSSProperties;
