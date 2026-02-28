'use client';

import { useState, useCallback, type ImgHTMLAttributes } from 'react';

interface ImageWithPreloaderProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Aspect ratio class like "aspect-[2/3]" — applied to the container */
  wrapperClassName?: string;
  /** Shape variant */
  variant?: 'rect' | 'circle';
}

export function ImageWithPreloader({
  wrapperClassName = '',
  variant = 'rect',
  className = '',
  alt = '',
  ...imgProps
}: ImageWithPreloaderProps) {
  const [loaded, setLoaded] = useState(false);

  const handleLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  const shapeClass = variant === 'circle' ? 'rounded-full' : '';

  return (
    <div className={`relative overflow-hidden ${shapeClass} ${wrapperClassName}`}>
      {/* Shimmer skeleton */}
      {!loaded && (
        <div
          className={`absolute inset-0 bg-[var(--bg-tertiary)] ${shapeClass}`}
        >
          <div
            className="absolute inset-0 animate-[shimmer-slide_1.5s_ease-in-out_infinite]"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        {...imgProps}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={handleLoad}
      />
    </div>
  );
}
