const express = require('express');
const Joi = require('@hapi/joi');
const morgan = require('morgan');

const valid = require('./validation/validation');

const movieFn = require('./functions/movieFunctions');
const directorFn = require('./functions/directorFunctions');

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.send('It Working');
});


// Get all Directors at /api/directors
app.get('/api/directors', (req, res) => {
  directorFn.getAllDirectors()
    .then((val) => {
      res.send(val);
    });
});


// Get a director with id;
app.get('/api/directors/:directorId', (req, res) => {
  directorFn.getDirectorWithSpecificId(req.params.directorId)
    .then((val) => {
      if (val.length === 0) {
        res.send('Data Invalid');
      } else {
        res.send(val);
      }
    });
});

// Add a new Director
app.post('/api/directors', (req, res) => {

  const result = Joi.validate(req.body, valid.validatDirectorAdd);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  const { directorName } = req.body;
  directorFn.addNewDirector(directorName)
    .then((val) => {
      res.send(val);
    });
});

// updata a director with id;
app.put('/api/directors', (req, res) => {
  const { directorId, directorName } = req.body;
  const result = Joi.validate(req.body, valid.validatDirectorUpdate);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  directorFn.updateDirectorWithId(directorId, directorName)
    .then((val) => {
      res.send(val);
    });
});

// Delete a director
app.delete('/api/directors', (req, res) => {
  const { directorId } = req.body;
  const result = Joi.validate(req.body, valid.validateDirectorDelete);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  directorFn.deleteDirectorWithId(directorId)
    .then((val) => {
      res.send(val);
    });
});

// Get all movies at /api/movies
app.get('/api/movies', (req, res) => { 
  movieFn.getAllMovies(req.body)
    .then((val) => {
      res.send(val);
    });
});

// Get a movie with id;
app.get('/api/movies/:movieId', (req, res) => {
  movieFn.getMovieWithId(req.params.movieId)
    .then((val) => {
      if (val.length === 0) {
        res.status(404).send('Data Invalid');
      } else {
        res.send(val);
      }
    });
});

// Add new Movie
app.post('/api/movies', (req, res) => {
  const result = Joi.validate(req.body, valid.validateMovieAdd);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  movieFn.addNewMovie(req.body)
    .then((val) => {
      res.send(val);
    });
});

// update a movie
app.put('/api/movies', (req, res) => {
  const id = req.body;
  const result = Joi.validate(req.body, valid.validateMovieUpdate);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  movieFn.updateMovieWithId(id)
    .then((val) => {
      res.send(val);
    });
});

// Delete A movie
app.delete('/api/movies', (req, res) => {
  const id = req.body;
  const result = Joi.validate(req.body, valid.validateMovieDelete);
  if (result.error) {
    res.status(400).send(result.error.message);
    return;
  }
  movieFn.deleteMovieWithId(id)
    .then((val) => {
      res.send(val);
    });
});
app.listen(PORT, () => {
  console.log(`Server running at port ${PORT}`);
});
