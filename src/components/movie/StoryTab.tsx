'use client';

import { motion } from 'motion/react';
import { fadeIn } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';

interface StoryTabProps {
  spoilerFree: string;
}

export function StoryTab({ spoilerFree }: StoryTabProps) {
  const paragraphs = spoilerFree.split('\n\n');

  return (
    <motion.div
      className="px-4 py-6 space-y-4"
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-2 mb-2">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)]">
          The Story
        </h2>
        <Badge variant="lead" label="Spoiler-Free" />
      </div>
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          className="text-base leading-relaxed text-[var(--text-primary)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        >
          {p}
        </motion.p>
      ))}
    </motion.div>
  );
}
