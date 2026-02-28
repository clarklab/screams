'use client';

import { useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useViewTransition } from '@/hooks/useViewTransition';
import { ImageWithPreloader } from '@/components/ui/ImageWithPreloader';
import { formatRuntime } from '@/lib/utils';
import type { Movie } from '@/types/movie';

interface MovieHeroProps {
  movie: Movie;
}

export function MovieHero({ movie }: MovieHeroProps) {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const parallaxY = useTransform(scrollY, [0, 400], [0, 120]);
  const backdropOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  const [backdropLoaded, setBackdropLoaded] = useState(false);
  const handleBackdropLoad = useCallback(() => setBackdropLoaded(true), []);
  const navigateWithTransition = useViewTransition();

  return (
    <div className="relative">
      {/* Back button — using <a> for view transition API */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigateWithTransition('/');
        }}
        className="absolute top-4 left-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md text-white"
        aria-label="Back to home"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </a>

      {/* Full-bleed backdrop */}
      <div className="relative w-full aspect-[16/10] max-h-[45vh] overflow-hidden">
        {/* Shimmer skeleton for backdrop */}
        {!backdropLoaded && (
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
        <motion.img
          src={movie.backdropPath}
          alt=""
          aria-hidden
          className={`w-full h-full object-cover transition-opacity duration-300 ${backdropLoaded ? 'opacity-100' : 'opacity-0'}`}
          style={reducedMotion ? undefined : { y: parallaxY, opacity: backdropLoaded ? backdropOpacity : 0 }}
          onLoad={handleBackdropLoad}
        />
        {/* Bottom gradient fade into content */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </div>

      {/* Poster + info overlay — pulled up over the backdrop */}
      <div className="relative -mt-24 px-4 z-10 flex gap-4">
        {/* Poster */}
        <motion.div
          className="shrink-0 w-28 rounded-xl overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <ImageWithPreloader
            src={movie.posterPath}
            alt={`${movie.title} (${movie.year}) poster`}
            wrapperClassName="aspect-[2/3]"
            className="w-full h-full object-cover"
            style={{ viewTransitionName: `poster-${movie.slug}` }}
          />
        </motion.div>

        {/* Title + metadata */}
        <div className="flex flex-col justify-end pb-1 min-w-0">
          <motion.h1
            className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-[-0.03em] text-[var(--text-primary)] leading-tight"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            {movie.title}
          </motion.h1>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-[var(--text-secondary)] flex-wrap">
            <span>{movie.year}</span>
            <span aria-hidden className="opacity-40">&middot;</span>
            <span>{movie.rating}</span>
            <span aria-hidden className="opacity-40">&middot;</span>
            <span>{formatRuntime(movie.runtime)}</span>
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
            {movie.director}
          </div>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-[var(--accent)] font-semibold text-sm">★ {movie.imdbScore}</span>
            <span className="text-xs text-[var(--text-secondary)]">/10</span>
          </div>
        </div>
      </div>

      {/* Tagline */}
      <motion.p
        className="px-4 mt-4 font-[family-name:var(--font-notch)] text-sm text-[var(--text-secondary)] italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        &ldquo;{movie.tagline}&rdquo;
      </motion.p>
    </div>
  );
}
