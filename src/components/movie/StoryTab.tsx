'use client';

import { motion } from 'motion/react';
import { fadeIn } from '@/lib/animations';
import { Badge } from '@/components/ui/Badge';
import { TimestampHeading } from '@/components/ui/TimestampHeading';
import { RedactedText } from '@/components/ui/RedactedText';
import { parseRedactedText } from '@/lib/utils';
import type { TimestampedSection, MovieSlug } from '@/types/movie';

interface StoryTabProps {
  spoilerFree: TimestampedSection[];
  movieSlug: MovieSlug;
}

export function StoryTab({ spoilerFree, movieSlug }: StoryTabProps) {
  return (
    <motion.div
      className="px-4 py-6 space-y-6"
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
      {spoilerFree.map((section, sIdx) => (
        <motion.div
          key={sIdx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: sIdx * 0.1, duration: 0.3 }}
        >
          <TimestampHeading timestamp={section.timestamp} heading={section.heading} />
          <div className="space-y-3">
            {section.paragraphs.map((p, pIdx) => {
              const segments = parseRedactedText(p);
              const hasRedacted = segments.some((s) => s.type === 'redacted');

              if (!hasRedacted) {
                return (
                  <p key={pIdx} className="text-base leading-relaxed text-[var(--text-primary)]">
                    {p}
                  </p>
                );
              }

              return (
                <p key={pIdx} className="text-base leading-relaxed text-[var(--text-primary)]">
                  {segments.map((seg, segIdx) =>
                    seg.type === 'text' ? (
                      <span key={segIdx}>{seg.content}</span>
                    ) : (
                      <RedactedText
                        key={segIdx}
                        content={seg.content}
                        redactedId={`${sIdx}-${pIdx}-${segIdx}`}
                        movieSlug={movieSlug}
                      />
                    )
                  )}
                </p>
              );
            })}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
