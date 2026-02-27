'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TabBar } from '@/components/ui/TabBar';
import { MovieHero } from './MovieHero';
import { OverviewTab } from './OverviewTab';
import { CastTab } from './CastTab';
import { StoryTab } from './StoryTab';
import { SpoilerTab } from './SpoilerTab';
import { LegacyTab } from './LegacyTab';
import { MovieNav } from './MovieNav';
import { tabContent } from '@/lib/animations';
import type { Movie, CastMember, GhostfaceKiller, MovieSummaries, MovieLegacy } from '@/types/movie';

const TABS = ['Overview', 'Cast', 'Story', 'Spoilers', 'Legacy'];

interface MovieDetailProps {
  movie: Movie;
  cast: CastMember[];
  ghostfaceKillers: GhostfaceKiller[];
  summaries: MovieSummaries;
  legacy: MovieLegacy;
  prevMovie: Movie | null;
  nextMovie: Movie | null;
}

export function MovieDetail({
  movie,
  cast,
  ghostfaceKillers,
  summaries,
  legacy,
  prevMovie,
  nextMovie,
}: MovieDetailProps) {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);

  const handleTabChange = useCallback(
    (index: number) => {
      setDirection(index > activeTab ? 1 : -1);
      setActiveTab(index);
    },
    [activeTab]
  );

  return (
    <div className="pb-4">
      <MovieHero movie={movie} />

      <div className="mt-6">
        <TabBar tabs={TABS} activeIndex={activeTab} onTabChange={handleTabChange} />

        <div className="relative overflow-hidden min-h-[300px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTab}
              custom={direction}
              variants={tabContent}
              initial="enter"
              animate="center"
              exit="exit"
            >
              {activeTab === 0 && (
                <OverviewTab movie={movie} summaries={summaries} />
              )}
              {activeTab === 1 && <CastTab cast={cast} />}
              {activeTab === 2 && (
                <StoryTab spoilerFree={summaries.spoilerFree} movieSlug={movie.slug} />
              )}
              {activeTab === 3 && (
                <SpoilerTab
                  movieSlug={movie.slug}
                  fullPlot={summaries.fullPlot}
                  ghostfaceKillers={ghostfaceKillers}
                />
              )}
              {activeTab === 4 && <LegacyTab legacy={legacy} />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <MovieNav prev={prevMovie} next={nextMovie} />
    </div>
  );
}
