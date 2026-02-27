'use client';

import { motion } from 'motion/react';
import { fadeIn } from '@/lib/animations';
import type { Movie, MovieSummaries } from '@/types/movie';
import { formatRuntime } from '@/lib/utils';

interface OverviewTabProps {
  movie: Movie;
  summaries: MovieSummaries;
}

export function OverviewTab({ movie, summaries }: OverviewTabProps) {
  return (
    <motion.div
      className="px-4 py-6 space-y-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          Quick Take
        </h2>
        <p className="text-base leading-relaxed text-[var(--text-primary)]">
          {summaries.quickTake}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <InfoCard label="Director" value={movie.director} />
        <InfoCard label="Runtime" value={formatRuntime(movie.runtime)} />
        <InfoCard label="Rating" value={movie.rating} />
        <InfoCard label="IMDB" value={`${movie.imdbScore}/10`} />
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          Tagline
        </h2>
        <p className="font-[family-name:var(--font-notch)] text-lg text-[var(--text-primary)] italic">
          &ldquo;{movie.tagline}&rdquo;
        </p>
      </div>
    </motion.div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--bg-secondary)] p-3">
      <p className="text-xs text-[var(--text-secondary)] mb-0.5">{label}</p>
      <p className="text-sm font-medium text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
