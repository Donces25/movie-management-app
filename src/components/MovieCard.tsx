import React from 'react';
import type { Movie } from '../types';

interface MovieCardProps {
  movie: Movie;
  onToggleWatched: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onToggleWatched, onDelete }) => {
  return (
    <div style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', backgroundColor: movie.watched ? '#f3f4f6' : '#ffffff' }}>
      <div>
        <h4 style={{ textDecoration: movie.watched ? 'line-through' : 'none', margin: '0 0 0.25rem 0', color: movie.watched ? '#6b7280' : '#111827' }}>
          {movie.title}
        </h4>
        <small style={{ color: '#4b5563' }}>Genre: <strong>{movie.genre}</strong> | ⭐ {movie.rating}/10</small>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button 
          onClick={() => onToggleWatched(movie.id)} 
          style={{ padding: '0.4rem 0.8rem', backgroundColor: movie.watched ? '#9ca3af' : '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          {movie.watched ? 'Batal' : 'Selesai'}
        </button>
        <button 
          onClick={() => onDelete(movie.id)} 
          style={{ padding: '0.4rem 0.8rem', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Hapus
        </button>
      </div>
    </div>
  );
};