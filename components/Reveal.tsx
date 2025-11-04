'use client';

import type { ComponentPropsWithoutRef, CSSProperties, ElementType, ReactNode } from 'react';
import { useEffect, useRef, useState } from 'react';

type RevealProps<T extends ElementType> = {
  as?: T;
  className?: string;
  children: ReactNode;
  variant?: 'rise' | 'fade' | 'scale';
  delay?: number;
  once?: boolean;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function Reveal<T extends ElementType = 'section'>({
  as,
  className,
  children,
  variant = 'rise',
  delay = 0,
  once = false,
  ...rest
}: RevealProps<T>) {
  const Component = (as || 'section') as ElementType;
  const elementRef = useRef<Element | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = elementRef.current;
    if (!(node instanceof Element) || typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            if (once) {
              observer.unobserve(entry.target);
            }
          } else if (!once) {
            setIsVisible(false);
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -10%'
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [once]);

  const classes = ['reveal'];
  if (className) classes.push(className);
  classes.push(`reveal--${variant}`);
  if (isVisible) classes.push('is-visible');

  const styleDelay =
    delay > 0
      ? {
          '--reveal-delay': `${delay}ms`
        }
      : undefined;

  return (
    <Component
      ref={(node: Element | null) => {
        elementRef.current = node as Element | null;
      }}
      className={classes.join(' ')}
      data-variant={variant}
      style={styleDelay as CSSProperties | undefined}
      {...rest}
    >
      {children}
    </Component>
  );
}
