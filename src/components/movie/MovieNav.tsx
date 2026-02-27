'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import type { Movie } from '@/types/movie';

interface MovieNavProps {
  prev: Movie | null;
  next: Movie | null;
}

export function MovieNav({ prev, next }: MovieNavProps) {
  return (
    <div className="flex items-center border-t border-[var(--border)] mt-6 px-4 py-4">
      {prev ? (
        <motion.div whileTap={{ scale: 0.97 }} className="flex-1">
          <Link
            href={`/movie/${prev.slug}/`}
            className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="truncate">{prev.title}</span>
          </Link>
        </motion.div>
      ) : (
        <div className="flex-1" />
      )}
      {next ? (
        <motion.div whileTap={{ scale: 0.97 }} className="flex-1 text-right">
          <Link
            href={`/movie/${next.slug}/`}
            className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <span className="truncate">{next.title}</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </Link>
        </motion.div>
      ) : (
        <div className="flex-1" />
      )}
    </div>
  );
}
