'use client';

import { motion } from 'motion/react';
import { slideUp } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import type { CastMember } from '@/types/movie';

interface CastCardProps {
  member: CastMember;
  index: number;
}

export function CastCard({ member, index }: CastCardProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center gap-2"
      variants={slideUp}
      custom={index}
    >
      <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--bg-tertiary)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={member.headshot}
          alt={member.actorName}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
      <div>
        <p className="text-sm font-medium text-[var(--text-primary)] leading-tight">
          {member.characterName}
        </p>
        <p className="text-xs text-[var(--text-secondary)] mt-0.5">
          {member.actorName}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        <Badge variant={member.role} />
        {member.isFranchiseRegular && <Badge variant="franchise-regular" />}
      </div>
    </motion.div>
  );
}
