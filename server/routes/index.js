// /api route

const router = require('express').Router();
const axios = require('axios');
const cache = require('../utils/cache');
const movieIds = require('../utils/movieIds');

const omdbURL = `https://www.omdbapi.com`;

//Get 10 movies from OMDB
router.get('/tenmovies', async (req, res) => {
  //Check for cached data
  if (cache.has('tenMovies'))
    return res.status(200).send({ tenMovies: cache.get('tenMovies') });
  //Handle fetching & caching
  try {
    const tenMovies = [];
    for (id of movieIds) {
      const movie = await axios.get(
        `${omdbURL}/?i=${id}&plot=full&apikey=${process.env.API_KEY}`
      );
      tenMovies.push(movie.data);
    }
    cache.set('tenMovies', tenMovies);
    return res.status(200).send({ tenMovies: tenMovies });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server error.' });
  }
});

//Search for movie by title
router.get('/searchmovie', async (req, res) => {
  //Validate input
  const query = req.query.value;
  if (!query) return res.status(400).send({ error: 'Missing query.' });
  //Check for cached data
  if (cache.has(query))
    return res.status(200).send({ results: cache.get(query) });
  //Handle fetching & caching
  try {
    const results = await axios.get(
      `${omdbURL}/?t=${query}&plot=full&apikey=${process.env.API_KEY}`
    );
    if (results.data.Response === 'False')
      return res.status(200).send({ results: [] });
    cache.set(query, [results.data]);
    return res.status(200).send({ results: [results.data] });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: 'Server error.' });
  }
});

module.exports = router;
