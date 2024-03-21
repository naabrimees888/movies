import React, { useState } from 'react';
import './App.css';
import { getResults } from './request';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const updateSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  const search = async () => {
    const data = await getResults({ search: searchTerm });
    setSearchResults(data.results);
  };

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
            <ul>
              {searchResults.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
