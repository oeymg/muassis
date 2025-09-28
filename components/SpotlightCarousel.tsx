'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { SpotlightImage } from '@/lib/spotlight';

interface SpotlightCarouselProps {
  images: SpotlightImage[];
}

export function SpotlightCarousel({ images }: SpotlightCarouselProps) {
  const total = images.length;
  const slideRefs = useRef<Array<HTMLElement | null>>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevIndex = total > 0 ? (currentIndex - 1 + total) % total : 0;
  const nextIndex = total > 0 ? (currentIndex + 1) % total : 0;

  const setSlideRef = useCallback((element: HTMLElement | null, index: number) => {
    slideRefs.current[index] = element;
  }, []);

  const step = useCallback(
    (direction: 'prev' | 'next') => {
      if (total === 0) {
        return;
      }

      setCurrentIndex((previous) => {
        const delta = direction === 'next' ? 1 : -1;
        return (previous + delta + total) % total;
      });
    },
    [total]
  );

  useEffect(() => {
    if (total === 0) {
      return;
    }

    if (currentIndex > total - 1) {
      setCurrentIndex(total - 1);
    }
  }, [total, currentIndex]);

  useEffect(() => {
    const activeSlide = slideRefs.current[currentIndex];
    if (activeSlide) {
      activeSlide.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentIndex, total]);

  if (total === 0) {
    return null;
  }

  return (
    <div className="spotlight-carousel">
      <div className="spotlight-carousel-track">
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const isPrev = index === prevIndex;
          const isNext = index === nextIndex;
          const classNames = [
            'spotlight-carousel-slide',
            isActive && 'is-active',
            isPrev && 'is-prev',
            isNext && 'is-next'
          ]
            .filter(Boolean)
            .join(' ');

          return (
            <figure
              key={image.src}
              className={classNames}
              ref={(element) => setSlideRef(element, index)}
              onClick={() => setCurrentIndex(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                sizes="(min-width: 960px) 40vw, 90vw"
                className="spotlight-carousel-image"
                priority={index === 0}
              />
            </figure>
          );
        })}
      </div>
      {images.length > 1 ? (
        <div className="spotlight-carousel-controls" aria-live="polite">
          <button
            type="button"
            className="spotlight-carousel-button"
            aria-label="Previous photo"
            onClick={() => step('prev')}
          >
            ←
          </button>
          <span className="spotlight-carousel-status">
            {String(currentIndex + 1).padStart(2, '0')}<span aria-hidden="true"> / </span>
            <span className="sr-only">of </span>
            {String(total).padStart(2, '0')}
          </span>
          <button
            type="button"
            className="spotlight-carousel-button"
            aria-label="Next photo"
            onClick={() => step('next')}
          >
            →
          </button>
        </div>
      ) : null}
    </div>
  );
}
