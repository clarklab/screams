'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { ConfirmRevealModal } from './ConfirmRevealModal';
import type { MovieSlug } from '@/types/movie';

interface RedactedTextProps {
  content: string;
  redactedId: string;
  movieSlug: MovieSlug;
}

function getRevealedIds(movieSlug: MovieSlug): string[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(`redacted-${movieSlug}`) || '[]');
  } catch {
    return [];
  }
}

function persistRevealedId(movieSlug: MovieSlug, id: string) {
  const ids = getRevealedIds(movieSlug);
  if (!ids.includes(id)) {
    localStorage.setItem(`redacted-${movieSlug}`, JSON.stringify([...ids, id]));
  }
}

export function RedactedText({ content, redactedId, movieSlug }: RedactedTextProps) {
  const [revealed, setRevealed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setRevealed(getRevealedIds(movieSlug).includes(redactedId));
  }, [movieSlug, redactedId]);

  const handleTap = useCallback(() => {
    if (!revealed) setModalOpen(true);
  }, [revealed]);

  const handleConfirm = useCallback(() => {
    setModalOpen(false);
    setRevealed(true);
    persistRevealedId(movieSlug, redactedId);
  }, [movieSlug, redactedId]);

  const handleCancel = useCallback(() => {
    setModalOpen(false);
  }, []);

  if (revealed) {
    return (
      <motion.span
        className="text-[var(--accent)] font-medium"
        initial={{ filter: 'blur(8px)', opacity: 0 }}
        animate={{ filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {content}
      </motion.span>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={handleTap}
        className="inline-flex items-center px-1.5 py-0.5 rounded bg-[var(--accent)]/15 text-[var(--accent)] text-sm font-semibold tracking-wide cursor-pointer transition-colors hover:bg-[var(--accent)]/25 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]"
        aria-label={`Redacted text — tap to reveal`}
      >
        [REDACTED]
      </button>
      <ConfirmRevealModal
        open={modalOpen}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
      />
    </>
  );
}
