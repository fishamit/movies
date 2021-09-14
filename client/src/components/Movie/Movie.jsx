import React from 'react';
import style from './Movie.module.css';

const Movie = ({ movie, selectMovie }) => {
  const getScoreColor = score => {
    return score >= 5 ? (score >= 8 ? 'limegreen' : 'orange') : 'tomato';
  };

  return (
    <div className={style.movieContainer}>
      <div
        className={style.movie}
        onClick={() => {
          selectMovie(movie.imdbID);
        }}
      >
        <div
          className={style.score}
          style={{ backgroundColor: getScoreColor(movie.imdbRating) }}
        >
          {movie.imdbRating}
        </div>
        <img src={movie.Poster} alt={movie.Title} className={style.img} />
        <div className={style.info}>
          <h1 className={style.h1}>{movie.Title}</h1>
          <p className={style.p}>
            {movie.Plot.length > 100
              ? movie.Plot.slice(0, 100) + '...'
              : movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Movie;
