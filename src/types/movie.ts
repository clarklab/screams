export type MovieSlug =
  | 'scream-1996'
  | 'scream-2-1997'
  | 'scream-3-2000'
  | 'scream-4-2011'
  | 'scream-5-2022'
  | 'scream-vi-2023';

export interface Movie {
  id: MovieSlug;
  slug: MovieSlug;
  title: string;
  year: number;
  director: string;
  runtime: number;
  rating: string;
  imdbScore: number;
  imdbId: string;
  tmdbId: number;
  tagline: string;
  posterPath: string;
  backdropPath: string;
  posterBlurHash: string;
  franchiseOrder: number;
}

export interface CastMember {
  actorName: string;
  characterName: string;
  role: 'lead' | 'supporting' | 'cameo';
  isGhostface: boolean;
  isFranchiseRegular: boolean;
  headshot: string;
}

export interface GhostfaceKiller {
  character: string;
  actor: string;
  motive: string;
}

export interface MovieSummaries {
  quickTake: string;
  spoilerFree: string;
  fullPlot: string;
}

export interface MovieLegacy {
  boxOffice: {
    budget: string;
    domestic: string;
    worldwide: string;
  };
  criticalReception: string;
  culturalImpact: string;
  franchiseConnections: string[];
}

export interface MovieComplete {
  movie: Movie;
  cast: CastMember[];
  ghostfaceKillers: GhostfaceKiller[];
  summaries: MovieSummaries;
  legacy: MovieLegacy;
}
