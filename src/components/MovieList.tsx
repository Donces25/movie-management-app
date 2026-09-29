import React from 'react';
import type { Movie } from '../types';
import { MovieCard } from './MovieCard';

interface MovieListProps {
  movies: Movie[];
  onToggleWatched: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MovieList: React.FC<MovieListProps> = ({ movies, onToggleWatched, onDelete }) => {
  if (movies.length === 0) {
    return <p style={{ textAlign: 'center', color: '#6b7280', marginTop: '2rem' }}>Tidak ada film yang sesuai.</p>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onToggleWatched={onToggleWatched} onDelete={onDelete} />
      ))}
    </div>
  );
};