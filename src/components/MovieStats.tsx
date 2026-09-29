import React from 'react';
import type { Movie } from '../types';

interface StatsProps {
  movies: Movie[];
}

export const MovieStats: React.FC<StatsProps> = ({ movies }) => {
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;

  return (
    <div style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
      <div style={{ background: '#e5e7eb', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#1f2937' }}>Total Film</h4>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#111827' }}>{totalMovies}</p>
      </div>
      <div style={{ background: '#d1fae5', padding: '1rem', borderRadius: '8px', flex: 1, textAlign: 'center' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', color: '#065f46' }}>Sudah Ditonton</h4>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: '#064e3b' }}>{watchedCount}</p>
      </div>
    </div>
  );
};