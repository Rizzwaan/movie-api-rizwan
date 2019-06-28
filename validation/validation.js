const Joi = require('@hapi/joi');

// Director Validation
const validatDirectorAdd = Joi.object().keys({
  directorName: Joi.string().required(),
});

const validatDirectorUpdate = Joi.object().keys({
  directorId: Joi.number().required(),
  directorName: Joi.string().required(),
});

const validateDirectorDelete = Joi.object().keys({
  directorId: Joi.number().required(),
});

// Movie Validation
const validateMovieAdd = Joi.object().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  runtime: Joi.number().required(),
  genre: Joi.string().required(),
  rating: Joi.number().required(),
  metascore: Joi.number().required(),
  votes: Joi.number().required(),
  gross_Earning_in_Mil: Joi.number().required(),
  actor: Joi.string().required(),
  director_id: Joi.number().required(),
  year: Joi.number().required(),
});

const validateMovieUpdate = Joi.object().keys({
  id: Joi.number().required(),
  title: Joi.string(),
  description: Joi.string(),
  runtime: Joi.number(),
  genre: Joi.string(),
  rating: Joi.number(),
  metascore: Joi.number(),
  votes: Joi.number(),
  gross_Earning_in_Mil: Joi.number(),
  actor: Joi.string(),
  director_id: Joi.number(),
  year: Joi.number(),
});

const validateMovieDelete = Joi.object().keys({
  id: Joi.number().required(),
});

module.exports = {
  validatDirectorAdd,
  validatDirectorUpdate,
  validateDirectorDelete,
  validateMovieAdd,
  validateMovieUpdate,
  validateMovieDelete,
};
