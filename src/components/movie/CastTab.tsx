'use client';

import { motion } from 'motion/react';
import { staggerChildren } from '@/lib/animations';
import { CastCard } from './CastCard';
import type { CastMember } from '@/types/movie';

interface CastTabProps {
  cast: CastMember[];
}

export function CastTab({ cast }: CastTabProps) {
  return (
    <motion.div
      className="px-4 py-6"
      variants={staggerChildren}
      initial="hidden"
      animate="visible"
    >
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
        Cast & Characters
      </h2>
      <div className="grid grid-cols-3 gap-4">
        {cast.map((member, i) => (
          <CastCard key={member.actorName} member={member} index={i} />
        ))}
      </div>
    </motion.div>
  );
}
