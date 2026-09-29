import React, { useState } from 'react';
import type { Movie } from '../types';

interface MovieFormProps {
  onAddMovie: (movie: Omit<Movie, 'id' | 'watched'>) => void;
}

export const MovieForm: React.FC<MovieFormProps> = ({ onAddMovie }) => {
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !genre.trim()) return;

    onAddMovie({ title, genre, rating: Number(rating) });
    setTitle('');
    setGenre('');
    setRating(5);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', background: '#f9fafb', padding: '1.25rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
      <h3 style={{ margin: 0 }}>Tambah Film Baru</h3>
      <input 
        type="text" 
        placeholder="Judul Film" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        required 
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #171111' }} 
      />
      <input 
        type="text" 
        placeholder="Genre (e.g. Action, Drama, Sci-Fi)" 
        value={genre} 
        onChange={(e) => setGenre(e.target.value)} 
        required 
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #151212' }} 
      />
      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
        <span>Rating: <strong>{rating} / 10</strong></span>
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={rating} 
          onChange={(e) => setRating(Number(e.target.value))} 
        />
      </label>
      <button type="submit" style={{ padding: '0.6rem', backgroundColor: '#b559dc', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
        + Tambah Film
      </button>
    </form>
  );
};