import type { Metadata } from 'next';
import { getMovieBySlug, getAdjacentMovies, MOVIE_SLUGS } from '@content/index';
import { MovieDetail } from '@/components/movie/MovieDetail';
import type { MovieSlug } from '@/types/movie';

export function generateStaticParams() {
  return MOVIE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { movie, summaries } = getMovieBySlug(slug as MovieSlug);

  return {
    title: `${movie.title} (${movie.year})`,
    description: summaries.quickTake,
    openGraph: {
      title: `${movie.title} (${movie.year}) | SCREAM Catch-Up`,
      description: summaries.quickTake,
      images: [
        {
          url: movie.backdropPath,
          width: 1280,
          height: 720,
          alt: `${movie.title} (${movie.year})`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${movie.title} (${movie.year})`,
      description: summaries.quickTake,
      images: [movie.backdropPath],
    },
  };
}

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const movieSlug = slug as MovieSlug;
  const { movie, cast, ghostfaceKillers, summaries, legacy } = getMovieBySlug(movieSlug);
  const { prev, next } = getAdjacentMovies(movieSlug);

  return (
    <MovieDetail
      movie={movie}
      cast={cast}
      ghostfaceKillers={ghostfaceKillers}
      summaries={summaries}
      legacy={legacy}
      prevMovie={prev}
      nextMovie={next}
    />
  );
}
