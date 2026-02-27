'use client';

import { motion } from 'motion/react';
import { fadeIn } from '@/lib/animations';
import type { MovieLegacy } from '@/types/movie';

interface LegacyTabProps {
  legacy: MovieLegacy;
}

export function LegacyTab({ legacy }: LegacyTabProps) {
  return (
    <motion.div
      className="px-4 py-6 space-y-6"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
          Box Office
        </h2>
        <div className="grid grid-cols-3 gap-3">
          <BoxOfficeCard label="Budget" value={legacy.boxOffice.budget} />
          <BoxOfficeCard label="Domestic" value={legacy.boxOffice.domestic} />
          <BoxOfficeCard label="Worldwide" value={legacy.boxOffice.worldwide} />
        </div>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          Critical Reception
        </h2>
        <p className="text-base leading-relaxed text-[var(--text-primary)]">
          {legacy.criticalReception}
        </p>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-2">
          Cultural Impact
        </h2>
        <p className="text-base leading-relaxed text-[var(--text-primary)]">
          {legacy.culturalImpact}
        </p>
      </div>

      <div>
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
          Franchise Connections
        </h2>
        <ul className="space-y-2">
          {legacy.franchiseConnections.map((connection, i) => (
            <li
              key={i}
              className="flex gap-2 text-sm text-[var(--text-primary)]"
            >
              <span className="text-[var(--accent)] mt-0.5 shrink-0">&bull;</span>
              {connection}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function BoxOfficeCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--bg-secondary)] p-3 text-center">
      <p className="text-xs text-[var(--text-secondary)] mb-0.5">{label}</p>
      <p className="text-sm font-semibold text-[var(--text-primary)]">{value}</p>
    </div>
  );
}
