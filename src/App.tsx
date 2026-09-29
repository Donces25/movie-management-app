import { useState, useEffect } from 'react';
import type { Movie } from './types';
import { Navbar } from './components/Navbar';
import { MovieStats } from './components/MovieStats';
import { MovieForm } from './components/MovieForm';
import { MovieList } from './components/MovieList';

const defaultMovies: Movie[] = [
  { id: 1, title: 'Inception', genre: 'Sci-Fi', rating: 9, watched: true },
  { id: 2, title: 'Interstellar', genre: 'Sci-Fi', rating: 9, watched: false },
  { id: 3, title: 'The Dark Knight', genre: 'Action', rating: 10, watched: true },
  { id: 4, title: 'Avatar: The Way of Water', genre: 'Sci-Fi', rating: 8, watched: false },
  { id: 5, title: 'Parasite', genre: 'Drama', rating: 9, watched: true },
  { id: 6, title: 'Spider-Man: Across the Spider-Verse', genre: 'Action', rating: 9, watched: false },
  { id: 7, title: 'Oppenheimer', genre: 'Drama', rating: 9, watched: true },
  { id: 8, title: 'Avengers: Endgame', genre: 'Action', rating: 9, watched: false },
  { id: 9, title: 'Spirited Away', genre: 'Drama', rating: 9, watched: true },
  { id: 10, title: 'The Matrix', genre: 'Sci-Fi', rating: 9, watched: false },
];

export default function App() {
  const [movies, setMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem('my_movie_list');
    return savedMovies ? JSON.parse(savedMovies) : defaultMovies;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState<'default' | 'rating' | 'title'>('default');

  useEffect(() => {
    localStorage.setItem('my_movie_list', JSON.stringify(movies));
  }, [movies]);

  const handleAddMovie = (newMovie: Omit<Movie, 'id' | 'watched'>) => {
    const movieWithId: Movie = {
      ...newMovie,
      id: Date.now(),
      watched: false,
    };
    setMovies([movieWithId, ...movies]);
  };

  const handleToggleWatched = (id: number) => {
    setMovies(movies.map((m) => (m.id === id ? { ...m, watched: !m.watched } : m)));
  };

  const handleDeleteMovie = (id: number) => {
    setMovies(movies.filter((m) => m.id !== id));
  };

  const handleResetData = () => {
    if (confirm('Kembalikan daftar ke data awal?')) {
      setMovies(defaultMovies);
    }
  };

  const filteredAndSortedMovies = movies
    .filter((m) => {
      const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || m.genre.toLowerCase() === selectedGenre.toLowerCase();
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const avgRating = movies.length > 0 
    ? (movies.reduce((acc, m) => acc + m.rating, 0) / movies.length).toFixed(1) 
    : '0';

  return (
    // Background Utama Halaman (Soft Gradient Ungu)
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #2e1065 0%, #3b0764 50%, #581c87 100%)', 
      padding: '2rem 1rem', 
      fontFamily: 'Arial, sans-serif' 
    }}>
      {/* Kontainer Utama Aplikasi (Serba Ungu) */}
      <div style={{ 
        maxWidth: '750px', 
        margin: '0 auto', 
        border: '1px solid #7e22ce', 
        borderRadius: '16px', 
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)', 
        overflow: 'hidden', 
        backgroundColor: '#1e1b4b' 
      }}>
        <Navbar searchTerm={searchTerm} onSearchChange={(e) => setSearchTerm(e.target.value)} />
        
        <div style={{ padding: '1.5rem', color: '#f3e8ff' }}>
          <MovieStats movies={movies} />
          
          {/* Box Rata-Rata Rating Ungu */}
          <div style={{ 
            backgroundColor: '#312e81', 
            border: '1px solid #4338ca', 
            padding: '0.75rem 1rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }}>
            <span>⭐ Rata-Rata Rating Koleksi: <strong style={{ color: '#c084fc' }}>{avgRating} / 10</strong></span>
            <button 
              onClick={handleResetData} 
              style={{ 
                fontSize: '0.8rem', 
                padding: '0.3rem 0.6rem', 
                cursor: 'pointer', 
                borderRadius: '4px', 
                border: 'none', 
                backgroundColor: '#581c87', 
                color: '#e9d5ff' 
              }}
            >
              Reset Data
            </button>
          </div>

          <MovieForm onAddMovie={handleAddMovie} />

          {/* Controls Filter & Sort Ungu */}
          <div style={{ 
            marginBottom: '1rem', 
            display: 'flex', 
            gap: '1rem', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            backgroundColor: '#312e81', 
            padding: '0.75rem', 
            borderRadius: '8px' 
          }}>
            <div>
              <label htmlFor="genre-select" style={{ marginRight: '0.5rem', color: '#e9d5ff' }}><strong>Genre:</strong></label>
              <select 
                id="genre-select"
                value={selectedGenre} 
                onChange={(e) => setSelectedGenre(e.target.value)} 
                style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #6b21a8', backgroundColor: '#1e1b4b', color: '#f3e8ff' }}
              >
                <option value="All">Semua Genre</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort-select" style={{ marginRight: '0.5rem', color: '#e9d5ff' }}><strong>Urutkan:</strong></label>
              <select 
                id="sort-select"
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value as any)} 
                style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #6b21a8', backgroundColor: '#1e1b4b', color: '#f3e8ff' }}
              >
                <option value="default">Terbaru Tambah</option>
                <option value="rating">Rating Tertinggi</option>
                <option value="title">Judul (A - Z)</option>
              </select>
            </div>
          </div>

          <MovieList movies={filteredAndSortedMovies} onToggleWatched={handleToggleWatched} onDelete={handleDeleteMovie} />
        </div>
      </div>
    </div>
  );
}