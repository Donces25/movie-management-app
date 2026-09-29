import React from 'react';

interface NavbarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <nav style={{ padding: '1rem', backgroundColor: '#1f2937', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '8px 8px 0 0' }}>
      <h2 style={{ margin: 0 }}>🎬 Movie Manager</h2>
      <input
        type="text"
        placeholder="Cari film..."
        value={searchTerm}
        onChange={onSearchChange}
        style={{ padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', width: '200px' }}
      />
    </nav>
  );
};