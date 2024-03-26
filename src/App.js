import React, { useState } from 'react';
import './App.css';
import { getResults } from './request';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    const data = await getResults({ search: searchTerm });
    setSearchResults(data.results);
    setSelectedMovie(null);
  };

  const updateSelectedMovie = (movie) => {
    setSelectedMovie(movie);
  }

  const baseURL = 'https://image.tmdb.org/t/p/w500/';

  return (    
    <section>
      <div className='header'>
        <h1>Filmide otsing</h1>
      </div>
      <div className="container">
        <div className='search-box'>
          <div className="search-field">
            <input value={searchTerm} onChange={updateSearchTerm} />
            <button onClick={search}>Otsi</button>
          </div>
          <div className="search-results">
            <h2>Leitud filmid</h2>

            {selectedMovie && (
              <div className="selected-movie">
                <h2>{selectedMovie.title} ({(new Date(selectedMovie.release_date)).getFullYear()})</h2>
                <div className="selected-movie-image-details">
                  <img src={`${baseURL}/${selectedMovie.poster_path}`} alt={selectedMovie.title} />
                  <div className='selected-movie__details'>
                    <p><strong>Ülevaade:</strong> {selectedMovie.overview}</p>
                    <p><strong>Avadatud:</strong> {(new Date(selectedMovie.release_date)).getFullYear()}</p>
                    <p><strong>Keskmine hinne:</strong> {selectedMovie.vote_average}</p>
                  </div>
                </div>
              </div>
            )}
            <div className="movie-container">
              <div className="movie-grid">
                {searchResults.map((movie) => (
                  <div key={movie.id} className="movie-card"  onClick={() => updateSelectedMovie(movie)}>
                    <img src={`${baseURL}/${movie.poster_path}`} alt={movie.title} />
                    <h3>{movie.title} ({(new Date(movie.release_date)).getFullYear()})</h3>
                    <p className="overview"><strong>Ülevaade:</strong> {movie.overview}</p>
                    <p><strong>Keskmine hinne:</strong> {movie.vote_average}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>        
      </div>
      <div className='footer'></div>
    </section>
  );
}

export default App;
