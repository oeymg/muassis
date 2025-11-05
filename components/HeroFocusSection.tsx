'use client';

import type { CSSProperties, ComponentPropsWithoutRef } from 'react';
import { forwardRef, useEffect, useRef } from 'react';

type HeroFocusSectionProps = ComponentPropsWithoutRef<'section'>;

const CONTENT_SCALE_MAX = 1.08;
const CONTENT_SCALE_MIN = 1;
const ACTIONS_SCALE_MAX = 1.04;
const ACTIONS_SCALE_MIN = 1;
const TAG_LETTER_MAX = 0.34;
const TAG_LETTER_MIN = 0.3;
const TRANSLATE_MAX = 18;

export const HeroFocusSection = forwardRef<HTMLElement, HeroFocusSectionProps>(
  ({ className, children, style, ...rest }, forwardedRef) => {
    const localRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
      if (typeof window === 'undefined') {
        return;
      }

      const mediaQuery = window.matchMedia('(max-width: 768px)');
      const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      const setStaticState = (target: HTMLElement | null) => {
        if (!target) {
          return;
        }
        target.style.setProperty('--hero-focus-content-scale', CONTENT_SCALE_MIN.toFixed(3));
        target.style.setProperty('--hero-focus-actions-scale', ACTIONS_SCALE_MIN.toFixed(3));
        target.style.setProperty('--hero-focus-opacity', '1');
        target.style.setProperty('--hero-focus-translate', '0px');
        target.style.setProperty('--hero-focus-tag-letter', `${TAG_LETTER_MIN}em`);
      };

      const initInteractive = (target: HTMLElement) => {
        let ticking = false;

        const update = () => {
          const current = localRef.current;
          if (!current) {
            ticking = false;
            return;
          }

          const scrollY = window.scrollY;
          const viewportHeight = window.innerHeight || 1;
          const threshold = Math.min(viewportHeight * 0.65, 520);

          const progressRaw = threshold === 0 ? 0 : scrollY / threshold;
          const progress = Math.min(Math.max(progressRaw, 0), 1);

          const contentScale =
            CONTENT_SCALE_MAX - (CONTENT_SCALE_MAX - CONTENT_SCALE_MIN) * progress;
          const actionsScale =
            ACTIONS_SCALE_MAX - (ACTIONS_SCALE_MAX - ACTIONS_SCALE_MIN) * progress;
          const tagLetter = TAG_LETTER_MAX - (TAG_LETTER_MAX - TAG_LETTER_MIN) * progress;
          const opacity = 1 - progress * 0.12;
          const translate = progress * TRANSLATE_MAX;

          current.style.setProperty('--hero-focus-content-scale', contentScale.toFixed(3));
          current.style.setProperty('--hero-focus-actions-scale', actionsScale.toFixed(3));
          current.style.setProperty('--hero-focus-opacity', opacity.toFixed(3));
          current.style.setProperty('--hero-focus-translate', `${translate.toFixed(2)}px`);
          current.style.setProperty('--hero-focus-tag-letter', `${tagLetter.toFixed(3)}em`);

          ticking = false;
        };

        const handleScroll = () => {
          if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
          }
        };

        update();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        return () => {
          window.removeEventListener('scroll', handleScroll);
          window.removeEventListener('resize', handleScroll);
          ticking = false;
        };
      };

      const node = localRef.current;

      if (!node) {
        return;
      }

      const shouldDisable = () => mediaQuery.matches || reducedMotionQuery.matches;

      let teardown: (() => void) | undefined;

      const refresh = () => {
        if (teardown) {
          teardown();
          teardown = undefined;
        }

        const current = localRef.current;
        if (!current) {
          return;
        }

        if (shouldDisable()) {
          setStaticState(current);
          return;
        }

        teardown = initInteractive(current);
      };

      const register = (query: MediaQueryList) => {
        const handler = () => refresh();

        if (typeof query.addEventListener === 'function') {
          query.addEventListener('change', handler);
          return () => query.removeEventListener('change', handler);
        }

        query.addListener(handler);
        return () => query.removeListener(handler);
      };

      refresh();
      const unregisterMediaQuery = register(mediaQuery);
      const unregisterReducedMotion = register(reducedMotionQuery);

      return () => {
        if (teardown) {
          teardown();
        }
        unregisterMediaQuery();
        unregisterReducedMotion();
      };
    }, []);

    const combinedClassName = ['section hero hero-grid', className].filter(Boolean).join(' ');

    const combinedStyle = (style ? { ...defaultVariables, ...style } : defaultVariables) as CSSProperties;

    return (
      <section
        {...rest}
        ref={(node) => {
          localRef.current = node;
          if (typeof forwardedRef === 'function') {
            forwardedRef(node);
          } else if (forwardedRef) {
            forwardedRef.current = node;
          }
        }}
        className={combinedClassName}
        data-reveal-skip="true"
        style={combinedStyle}
      >
        {children}
      </section>
    );
  }
);

HeroFocusSection.displayName = 'HeroFocusSection';

const defaultVariables: Record<string, string | number> = {
  '--hero-focus-content-scale': CONTENT_SCALE_MAX,
  '--hero-focus-actions-scale': ACTIONS_SCALE_MAX,
  '--hero-focus-opacity': 1,
  '--hero-focus-translate': '0px',
  '--hero-focus-tag-letter': `${TAG_LETTER_MAX}em`
};
