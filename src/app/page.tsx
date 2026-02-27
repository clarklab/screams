import { getAllMovies } from '@content/index';
import { HomeHeader } from '@/components/home/HomeHeader';
import { MovieGrid } from '@/components/home/MovieGrid';
import { AtmosphereCanvas } from '@/components/home/AtmosphereCanvas';


export default function HomePage() {
  const movies = getAllMovies();

  return (
    <>
      <AtmosphereCanvas />
      <HomeHeader />
      <main>
        <MovieGrid movies={movies} />
      </main>
    </>
  );
}
