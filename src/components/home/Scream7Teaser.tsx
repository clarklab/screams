'use client';

import { motion } from 'motion/react';

export function Scream7Teaser() {
  return (
    <motion.section
      className="mx-4 mt-10 mb-8 py-8 px-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5 }}
    >
      <p className="font-[family-name:var(--font-notch)] text-base text-[var(--text-secondary)] italic mb-4">
        &ldquo;What&rsquo;s your favorite scary movie?&rdquo;
      </p>
      <div className="h-px bg-[var(--border)] my-4" />
      <motion.p
        className="font-[family-name:var(--font-headline)] text-lg font-bold text-[var(--accent)]"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        Scream 7 &mdash; Coming 2025
      </motion.p>
    </motion.section>
  );
}
