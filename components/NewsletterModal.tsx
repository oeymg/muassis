"use client";

import { NewsletterForm } from '@/components/NewsletterForm';

type NewsletterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function NewsletterModal({ isOpen, onClose }: NewsletterModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="newsletter-overlay" role="presentation" onClick={onClose}>
      <div
        className="newsletter-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="newsletter-heading"
        aria-describedby="newsletter-description"
        onClick={(event) => event.stopPropagation()}
      >
        <button className="newsletter-close" type="button" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="newsletter-content">
          <h2 id="newsletter-heading">Join the Launchpad Waitlist</h2>
          <p id="newsletter-description">
            Be the first to know when applications open. Get updates on the program, founder stories, and community events.
          </p>
          <NewsletterForm className="newsletter-form" />
        </div>
      </div>
    </div>
  );
}
