const connectDb = require('../databaseConnect/connectDb');

const connection = connectDb.connectToDatabase();

// Get all movies

const getAllMovies = () => new Promise((resolve, reject) => {
  connection.query('select title from movies', (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});
// getAllMovies().then(v => console.log(v));

// Get the movie with given ID
const getMovieWithId = id => new Promise((resolve, reject) => {
  connection.query(
    `select * from movies where id=${id};`,
    (err, data) => {
      if (err) {
        reject(err);
        connection.end();
      } else {
        resolve(data);
        connection.end();
      }
    },
  );
});

// getMovieWithId(1).then(v=>console.log(v));

// Add a new movie

const checkDirectorExists = directorId => new Promise((resolve, reject) => {
  connection.query(`select count(*) as isAvailabe  from directors where id =${directorId}`, (err, data) => {
    if (err) {
      reject(data);
    } else {
      resolve(data);
    }
  });
});

const addNewMovie = movieObj => new Promise((resolve, reject) => {
  const res = checkDirectorExists(movieObj.director_id);
  res.then((availble) => {
    if (availble[0].isAvailabe > 0) {
      connection.query(`insert into movies ( title,description,runtime, genre,rating, metascore,votes,gross_Earning_in_Mil,actor,director_id,year_of_release )
         values("${movieObj.title}","${movieObj.description}","${movieObj.runtime}","${movieObj.genre}",${movieObj.rating},
         "${movieObj.metascore}",${movieObj.votes},"${movieObj.gross_Earning_in_Mil}","${movieObj.actor}",${movieObj.director_id},${movieObj.year})`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } else {
      resolve('Id not avilabe');
    }
  });
});

const obj = {
  title: 'Ninja Turtle',
  description: ' In action',
  runtime: 13,
  genre: 'drama',
  rating: 6.7,
  metascore: 78,
  votes: 74738,
  gross_Earning_in_Mil: 34.55,
  actor: 'Roman',
  director_id: 2,
  year: 2000,

};
// addNewMovie(obj).then(v => console.log(v));

// Update the movie with given ID
const updateMovieWithId = (id, obj) => new Promise((resolve, reject) => {
  connection.query(`update movies set ? where id=${id}`, obj, (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

const upObj = {
  Title: 'The Room Of Fire',
  Description:
    'finding solace and eventual redemption through acts of common decency.',
  Runtime: 32,
  Votes: 1930,
  Gross_Earning_in_Mil: 28.34,
  Actor: 'Tim Robbins',

};

// let r = updateMovieWithId(2,upObj);
// r.then(v => console.log(v));

// Delete the movie with given ID

const deleteMovieWithId = id => new Promise((resolve, reject) => {
  connection.query(`delete from movies where id=${id}`, (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

// deleteMovieWithId(2).then(v => console.log(v));
