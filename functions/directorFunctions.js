const connectDb = require('../databaseConnect/connectDb');

const connection = connectDb.connectToDatabase();

// Get all directors

const getAllDirectors = () => new Promise((resolve, reject) => {
  connection.query('select director_name from directors;', (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

// let s = getAllDirectors();
// s.then(d => console.log(d));

// Get the director with given ID

const getDirectorWithSpecificId = id => new Promise((resolve, reject) => {
  connection.query(`select director_name from directors where id=${id}`, (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

// let p = getDirectorWithSpecificId(1);
// p.then(v => console.log(v));


// Add a new director

const addNewDirector = directorName => new Promise((resolve, reject) => {
  connection.query(`insert into directors(director_name) values("${directorName}")`, (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});
// addNewDirector("Rizwan Akram").then(v => console.log(v));

// Update the director with given ID

const updateDirectorWithId = (id, newName) => new Promise((resolve, reject) => {
  connection.query(`update directors set director_name="${newName}" where id=${id}`, (err, data) => {
    if (err) {
      reject(err);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

// updateDirectorWithId(36,"Roman Murphy").then(v => console.log(v));
// Delete the director with given ID

const deleteDirectorWithId = dirId => new Promise((resolve, reject) => {
  connection.query(`DELETE FROM directors WHERE id=${dirId}`, (err, data) => {
    if (err) {
      reject(data);
      connection.end();
    } else {
      resolve(data);
      connection.end();
    }
  });
});

// deleteDirectorWithId(36).then(v => console.log(v));
