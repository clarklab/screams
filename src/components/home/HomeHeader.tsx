'use client';

import { ThemeToggle } from '@/components/ui/ThemeToggle';

export function HomeHeader() {
  return (
    <header className="relative -mx-[calc((100vw-100%)/2)] w-screen mb-6">
      {/* Theme toggle floating over hero */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>

      {/* Full-bleed hero banner */}
      <div className="relative w-full max-w-4xl mx-auto">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero-banner.jpg"
          alt="SCREAM: The Complete Catch-Up"
          className="w-full object-cover"
        />
        {/* Bottom fade to background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />
        {/* Extra strong bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[var(--bg-primary)] to-transparent" />
      </div>
    </header>
  );
}
