import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Search from './components/Search/Search';
import MoviesList from './components/MoviesList/MoviesList';
import Spinner from './components/Spinner/Spinner';
import Modal from './components/Modal/Modal';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  //Fetch 10 movies for initial page load
  useEffect(() => {
    getTenMovies();
  }, []);

  //Handle search fetching
  useEffect(() => {
    if (!searchValue) return getTenMovies();
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/searchmovie?value=${searchValue}`
        );
        setLoading(false);
        if (!response.data.results.length) return setError(`Movie not found!`);
        setMovies(response.data.results);
        setError('');
      } catch (error) {
        setError('Error fetching data.');
        setLoading(false);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [searchValue]);

  //Handle modal toggle
  useEffect(() => {
    document.body.style.overflow = selectedMovie ? 'hidden' : 'unset';
    setShowModal(!!selectedMovie);
  }, [selectedMovie]);

  const getTenMovies = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:1000/api/tenmovies');
      setLoading(false);
      setMovies(response.data?.tenMovies);
      setError('');
    } catch (error) {
      setError('Error fetching data.');
    }
  };

  const selectMovie = imdbID => {
    if (!imdbID) return setSelectedMovie(null);
    movies.forEach(movie => {
      if (movie.imdbID === imdbID) setSelectedMovie(movie);
    });
  };

  return (
    <>
      <Modal
        showModal={showModal}
        movie={selectedMovie}
        selectMovie={selectMovie}
      />
      <header>
        <div className="container flex-row">
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
          {loading && <Spinner />}
        </div>
      </header>
      <section>
        <div className="container">
          {error ? (
            <h1 className="error">{error}</h1>
          ) : (
            <MoviesList movies={movies} selectMovie={selectMovie} />
          )}
        </div>
      </section>
    </>
  );
};

export default App;
