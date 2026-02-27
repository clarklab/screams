'use client';

import { useState, useCallback, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useHaptic } from '@/hooks/useHaptic';
import type { MovieSlug } from '@/types/movie';

interface SpoilerGateProps {
  movieSlug: MovieSlug;
  children: ReactNode;
}

export function SpoilerGate({ movieSlug, children }: SpoilerGateProps) {
  const [revealed, setRevealed] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem(`spoiler-${movieSlug}`) === 'true';
  });
  const reducedMotion = useReducedMotion();
  const haptic = useHaptic();

  const handleReveal = useCallback(() => {
    haptic.heavy();
    setRevealed(true);
    localStorage.setItem(`spoiler-${movieSlug}`, 'true');
  }, [movieSlug, haptic]);

  if (revealed) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div
        className={reducedMotion ? 'opacity-0' : 'blur-[20px] scale-95 select-none pointer-events-none'}
        aria-hidden
      >
        {children}
      </div>

      <AnimatePresence>
        <motion.div
          className="absolute inset-0 flex flex-col items-center justify-start pt-12 gap-4 bg-[var(--bg-primary)]/80 backdrop-blur-sm rounded-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-[var(--color-spoiler-gate)] text-3xl">&#9888;</div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            Spoiler Warning
          </h3>
          <p className="text-sm text-[var(--text-secondary)] text-center max-w-[240px]">
            This section reveals who is behind the Ghostface mask. Are you sure?
          </p>
          <button
            onClick={handleReveal}
            className="mt-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold rounded-xl text-sm tracking-wide hover:bg-[var(--accent-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
          >
            REVEAL THE KILLER
          </button>
          <p className="text-xs text-[var(--text-secondary)]">
            (tap to read at your own risk)
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
