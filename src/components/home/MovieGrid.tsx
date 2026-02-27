'use client';

import { motion } from 'motion/react';
import { staggerChildren } from '@/lib/animations';
import { MovieCard } from './MovieCard';
import type { Movie } from '@/types/movie';

interface MovieGridProps {
  movies: Movie[];
}

export function MovieGrid({ movies }: MovieGridProps) {
  return (
    <div className="px-4">
      <h2 className="font-[family-name:var(--font-headline)] text-xl font-bold tracking-[-0.03em] text-[var(--text-primary)] text-center mb-5">
        Catch up on all <span className="text-[var(--accent)]">SIX SCREAMS</span>
      </h2>
      <motion.div
        className="grid grid-cols-2 gap-4"
        variants={staggerChildren}
        initial="hidden"
        animate="visible"
      >
      {movies.map((movie, i) => (
        <MovieCard key={movie.id} movie={movie} index={i} />
      ))}
    </motion.div>
    </div>
  );
}
