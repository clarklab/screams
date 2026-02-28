'use client';

import { SpoilerGate } from '@/components/ui/SpoilerGate';
import { TimestampHeading } from '@/components/ui/TimestampHeading';
import type { MovieSlug, GhostfaceKiller, TimestampedSection } from '@/types/movie';

interface SpoilerTabProps {
  movieSlug: MovieSlug;
  fullPlot: TimestampedSection[];
  ghostfaceKillers: GhostfaceKiller[];
}

export function SpoilerTab({ movieSlug, fullPlot, ghostfaceKillers }: SpoilerTabProps) {
  return (
    <div className="px-4 py-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-secondary)] mb-4">
        The Full Story
      </h2>
      <SpoilerGate movieSlug={movieSlug}>
        <div className="space-y-6">
          {fullPlot.map((section, sIdx) => (
            <div key={sIdx}>
              <TimestampHeading timestamp={section.timestamp} heading={section.heading} />
              <div className="space-y-3">
                {section.paragraphs.map((p, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-base leading-relaxed text-[var(--text-primary)]"
                  >
                    {p}
                  </p>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-8 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Behind the Mask
            </h3>
            {ghostfaceKillers.map((killer) => (
              <div
                key={killer.character}
                className="rounded-xl border border-[var(--accent)]/30 bg-[var(--accent-subtle)] p-4"
              >
                <p className="font-semibold text-[var(--accent)]">
                  {killer.character}
                </p>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                  Played by {killer.actor}
                </p>
                <p className="text-sm text-[var(--text-primary)] mt-2 leading-relaxed">
                  {killer.motive}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SpoilerGate>
    </div>
  );
}
