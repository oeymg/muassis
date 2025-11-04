'use client';

import { useEffect, useRef } from 'react';

export function SpotlightCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const node = cursorRef.current;
    if (!node || typeof window === 'undefined') return;

    let latestX = window.innerWidth / 2;
    let latestY = window.innerHeight / 2;
    let lastMoveAt = Date.now();

    const updatePosition = () => {
      if (!cursorRef.current) return;
      cursorRef.current.style.transform = `translate3d(${latestX}px, ${latestY}px, 0)`;
    };

    updatePosition();

    const handlePointerMove = (event: PointerEvent) => {
      latestX = event.clientX;
      latestY = event.clientY;
      lastMoveAt = Date.now();

      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(() => {
          updatePosition();
          rafRef.current = null;
        });
      }

      cursorRef.current?.classList.add('is-active');
    };

    const handlePointerLeave = () => {
      cursorRef.current?.classList.remove('is-active');
    };

    const inactivityTimer = window.setInterval(() => {
      if (!cursorRef.current) return;
      const idleFor = Date.now() - lastMoveAt;
      if (idleFor > 2000) {
        cursorRef.current.classList.remove('is-active');
      }
    }, 1000);

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.clearInterval(inactivityTimer);
    };
  }, []);

  return <div ref={cursorRef} className="cursor-spotlight" aria-hidden="true" />;
}
