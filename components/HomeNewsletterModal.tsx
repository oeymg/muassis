"use client";

import { useEffect, useRef, useState } from 'react';

import { NewsletterForm } from '@/components/NewsletterForm';

const STORAGE_KEY = 'muassis-newsletter-dismissed';

export function HomeNewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    let dismissed = false;

    try {
      dismissed = window.localStorage.getItem(STORAGE_KEY) === 'true';
    } catch (error) {
      // Ignore storage errors (e.g., private mode)
    }

    if (dismissed) {
      hasTriggeredRef.current = true;
      return;
    }

    const triggerModal = () => {
      if (hasTriggeredRef.current) {
        return;
      }

      hasTriggeredRef.current = true;
      setIsOpen(true);
    };

    const handleScroll = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        return;
      }

      const ratio = window.scrollY / scrollable;
      if (ratio >= 0.4) {
        triggerModal();
      }
    };

    const handleExitIntent = (event: MouseEvent) => {
      if (event.clientY <= 0) {
        triggerModal();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('mouseout', handleExitIntent);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mouseout', handleExitIntent);
    };
  }, []);

  const closeModal = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, 'true');
    } catch (error) {
      // Ignore
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="newsletter-overlay" role="presentation" onClick={closeModal}>
      <div
        className="newsletter-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-heading"
        aria-describedby="newsletter-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="newsletter-close" type="button" onClick={closeModal} aria-label="Close">
          ×
        </button>
        <div className="newsletter-content">
          <h2 id="newsletter-heading">Stay connected — join the Mu’assis network</h2>
          <p id="newsletter-description">
            Get founder stories, pathways, and community build invitations delivered sparingly.
          </p>
          <NewsletterForm className="newsletter-form" />
        </div>
      </div>
    </div>
  );
}
