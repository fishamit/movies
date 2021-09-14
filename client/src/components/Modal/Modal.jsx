import React from 'react';
import style from './Modal.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ showModal, movie, selectMovie }) => {
  return (
    <AnimatePresence exitBeforeEnter>
      {showModal && movie && (
        <>
          <motion.div
            onClick={() => {
              selectMovie(null);
            }}
            className={style.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          ></motion.div>
          <motion.div
            className={style.movieInfo}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              className={style.close}
              onClick={() => {
                selectMovie(null);
              }}
            >
              ✕
            </button>
            <img src={movie.Poster} alt={movie.Title} className={style.img} />
            <div className={style.information}>
              <h1 className={style.h1}>
                {movie.Title} ({movie.Year})
              </h1>
              <h2 className={style.h2}>
                <span className={style.sub}>Genre:</span> {movie.Genre}
              </h2>
              <h2 className={style.h2}>
                <span className={style.sub}>Cast:</span> {movie.Actors}
              </h2>
              <h2 className={style.h2}>
                <span className={style.sub}>Runtime:</span> {movie.Runtime}
              </h2>
              <h2 className={style.h2}>
                <span className={style.sub}>IMDB Rating:</span>{' '}
                {movie.imdbRating}
              </h2>
              <p className={style.p}>{movie.Plot}</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
