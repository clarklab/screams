import type { Movie, MovieSlug, CastMember, GhostfaceKiller, MovieSummaries, MovieLegacy, MovieComplete } from '@/types/movie';
import { movies } from './movies';
import { ghostfaceKillers } from './ghostface';

import { cast as castScream1996 } from './cast/scream-1996';
import { cast as castScream2 } from './cast/scream-2-1997';
import { cast as castScream3 } from './cast/scream-3-2000';
import { cast as castScream4 } from './cast/scream-4-2011';
import { cast as castScream5 } from './cast/scream-5-2022';
import { cast as castScreamVI } from './cast/scream-vi-2023';

import { summaries as sumScream1996 } from './summaries/scream-1996';
import { summaries as sumScream2 } from './summaries/scream-2-1997';
import { summaries as sumScream3 } from './summaries/scream-3-2000';
import { summaries as sumScream4 } from './summaries/scream-4-2011';
import { summaries as sumScream5 } from './summaries/scream-5-2022';
import { summaries as sumScreamVI } from './summaries/scream-vi-2023';

import { legacy as legScream1996 } from './legacy/scream-1996';
import { legacy as legScream2 } from './legacy/scream-2-1997';
import { legacy as legScream3 } from './legacy/scream-3-2000';
import { legacy as legScream4 } from './legacy/scream-4-2011';
import { legacy as legScream5 } from './legacy/scream-5-2022';
import { legacy as legScreamVI } from './legacy/scream-vi-2023';

export { movies };
export { ghostfaceKillers };

export const MOVIE_SLUGS: MovieSlug[] = [
  'scream-1996',
  'scream-2-1997',
  'scream-3-2000',
  'scream-4-2011',
  'scream-5-2022',
  'scream-vi-2023',
];

const castMap: Record<MovieSlug, CastMember[]> = {
  'scream-1996': castScream1996,
  'scream-2-1997': castScream2,
  'scream-3-2000': castScream3,
  'scream-4-2011': castScream4,
  'scream-5-2022': castScream5,
  'scream-vi-2023': castScreamVI,
};

const summariesMap: Record<MovieSlug, MovieSummaries> = {
  'scream-1996': sumScream1996,
  'scream-2-1997': sumScream2,
  'scream-3-2000': sumScream3,
  'scream-4-2011': sumScream4,
  'scream-5-2022': sumScream5,
  'scream-vi-2023': sumScreamVI,
};

const legacyMap: Record<MovieSlug, MovieLegacy> = {
  'scream-1996': legScream1996,
  'scream-2-1997': legScream2,
  'scream-3-2000': legScream3,
  'scream-4-2011': legScream4,
  'scream-5-2022': legScream5,
  'scream-vi-2023': legScreamVI,
};

export function getAllMovies(): Movie[] {
  return movies;
}

export function getMovieBySlug(slug: MovieSlug): MovieComplete {
  const movie = movies.find((m) => m.slug === slug);
  if (!movie) throw new Error(`Movie not found: ${slug}`);

  return {
    movie,
    cast: castMap[slug],
    ghostfaceKillers: ghostfaceKillers[slug],
    summaries: summariesMap[slug],
    legacy: legacyMap[slug],
  };
}

export function getAdjacentMovies(slug: MovieSlug): { prev: Movie | null; next: Movie | null } {
  const index = movies.findIndex((m) => m.slug === slug);
  return {
    prev: index > 0 ? movies[index - 1] : null,
    next: index < movies.length - 1 ? movies[index + 1] : null,
  };
}
