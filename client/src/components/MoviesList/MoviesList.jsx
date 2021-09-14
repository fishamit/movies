import React from 'react';
import Movie from '../Movie/Movie';
import style from './MoviesList.module.css';
const MoviesList = ({ movies, selectMovie }) => {
  return (
    <div className={style.moviesList}>
      {movies.map(movie => (
        <Movie key={movie.imdbID} movie={movie} selectMovie={selectMovie} />
      ))}
    </div>
  );
};

export default MoviesList;
