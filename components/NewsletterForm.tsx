"use client";

type NewsletterFormProps = {
  className?: string;
};

export function NewsletterForm({ className }: NewsletterFormProps) {
  const handleSubmit = () => {
    try {
      window.localStorage.setItem('muassis-newsletter-dismissed', 'true');
    } catch (error) {
      // Ignore storage errors (e.g., private mode)
    }
  };

  return (
    <form
      className={className ?? 'newsletter-form'}
      action="https://formspree.io/f/myznyayr"
      method="POST"
      onSubmit={handleSubmit}
    >
      <input type="email" name="email" placeholder="you@example.com" required />
      <input type="hidden" name="_next" value="/" />
      <button type="submit">Subscribe</button>
    </form>
  );
}
