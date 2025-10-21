'use client';

import { useEffect, useState } from 'react';

export function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let animationFrame: number;

    const calculateProgress = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - doc.clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }

      const ratio = Math.min(1, Math.max(0, window.scrollY / scrollable));
      setProgress(ratio * 100);
    };

    const handleScroll = () => {
      animationFrame = window.requestAnimationFrame(calculateProgress);
    };

    calculateProgress();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', calculateProgress);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', calculateProgress);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <span
      className="scroll-progress-bar"
      aria-hidden="true"
      style={{ transform: `scaleX(${progress / 100})` }}
    />
  );
}
