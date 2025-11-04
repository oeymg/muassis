'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollRevealManager() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const managed = new Set<HTMLElement>();

    const ensureSection = (section: HTMLElement) => {
      if (section.dataset.revealSkip === 'true') return;
      if (managed.has(section)) return;

      section.dataset.revealManaged = 'true';
      if (!section.classList.contains('reveal')) {
        section.classList.add('reveal', 'reveal--rise');
      } else if (
        !section.classList.contains('reveal--fade') &&
        !section.classList.contains('reveal--scale') &&
        !section.classList.contains('reveal--rise')
      ) {
        section.classList.add('reveal--rise');
      }

      observer.observe(section);
      managed.add(section);
    };

    const scanSections = (root: ParentNode | Document = document) => {
      const sections = root.querySelectorAll<HTMLElement>('.section');
      sections.forEach(ensureSection);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            target.classList.add('is-visible');
          } else {
            target.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -10%'
      }
    );

    scanSections();

    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof HTMLElement)) return;
          if (node.matches('.section')) {
            ensureSection(node);
          }
          if (node.children?.length) {
            scanSections(node);
          }
        });
      });
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
      managed.clear();
    };
  }, [pathname]);

  return null;
}
