'use client';

import { useState, useCallback } from 'react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function HomeHeader() {
  const [loaded, setLoaded] = useState(false);
  const handleLoad = useCallback(() => setLoaded(true), []);

  return (
    <header className="relative -mx-[calc((100vw-100%)/2)] w-screen mb-6">
      {/* Theme toggle floating over hero */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Full-bleed hero banner */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="relative overflow-hidden">
          {/* Shimmer skeleton */}
          {!loaded && (
            <div className="absolute inset-0 bg-[var(--bg-tertiary)]">
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
            src="/images/hero-banner-web.jpg"
            alt="SCREAM: The Complete Catch-Up"
            className={`w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={handleLoad}
          />
        </div>
        {/* Bottom fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        {/* Extra strong bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>
    </header>
  );
}
