"use client";

import { useEffect, useState } from 'react';

import { NewsletterForm } from '@/components/NewsletterForm';

const STORAGE_KEY = 'muassis-newsletter-dismissed';

export function HomeNewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) === 'true') {
        return;
      }
    } catch (error) {
      // Ignore storage errors (e.g., private mode)
    }

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, []);

  const closeModal = () => setIsOpen(false);

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
          <h2 id="newsletter-heading">Stay in the loop</h2>
          <p id="newsletter-description">Join the Mu’assis newsletter and shape futures with us.</p>
          <NewsletterForm className="newsletter-form" />
        </div>
      </div>
    </div>
  );
}
