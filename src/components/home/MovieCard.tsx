'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { slideUp, springBouncy } from '@/lib/animations';
import type { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  index: number;
}

export function MovieCard({ movie, index }: MovieCardProps) {
  return (
    <motion.div
      variants={slideUp}
      custom={index}
      whileTap={{ scale: 0.97 }}
      transition={springBouncy}
    >
      <Link
        href={`/movie/${movie.slug}/`}
        className="block relative rounded-2xl overflow-hidden bg-[var(--bg-secondary)] shadow-[0_0_25px_rgba(230,54,54,0.6)] animate-[glow-pulse_3s_ease-in-out_infinite] group"
      >
        <div className="aspect-[2/3] relative">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={movie.posterPath}
            alt={`${movie.title} (${movie.year}) poster`}
            className="w-full h-full object-cover"
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        </div>
        <div className="p-3">
          <h2 className="font-[family-name:var(--font-headline)] text-base font-semibold text-[var(--text-primary)] leading-tight">
            {movie.title}
          </h2>
          <div className="flex items-center justify-between mt-1">
            <span className="text-xs text-[var(--text-secondary)]">
              {movie.year}
            </span>
            <span className="text-xs text-[var(--accent)] font-medium">
              ★ {movie.imdbScore}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
