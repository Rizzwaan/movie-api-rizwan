const connectDb = require('../databaseConnect/connectDb');

const connection = connectDb.connectToDatabase();

// Get all directors

const getAllDirectors = () => new Promise((resolve, reject) => {
  connection.query('select * from directors;', (err, data) => {
    if (err) {
      reject(err);
      // connection.end();
    } else {
      resolve(data);
      // connection.end();
    }
  });
});

// let s = getAllDirectors();
// s.then(d => console.log(d));

// Get the director with given ID

const getDirectorWithSpecificId = id => new Promise((resolve, reject) => {
  console.log(id);
  connection.query(`select director_name from directors where id=${id}`, (err, data) => {
    if (err) {
      reject(err);
      // connection.end();
    } else {
      resolve(data);
      // connection.end();
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
      // connection.end();
    } else {
      resolve('director Added');
      // connection.end();
    }
  });
});
// addNewDirector("Rizwan Akram").then(v => console.log(v));

// Update the director with given ID

const updateDirectorWithId = (id, newName) => new Promise((resolve, reject) => {
  connection.query(`update directors set director_name="${newName}" where id=${id}`, (err, data) => {
    if (err) {
      reject(err);
      // connection.end();
    } else {
      resolve(data);
      // connection.end();
    }
  });
});

// updateDirectorWithId(36,"Roman Murphy").then(v => console.log(v));
// Delete the director with given ID

const deleteDirectorWithId = dirId => new Promise((resolve, reject) => {
  connection.query(`select count(*) as count from directors where id =${dirId}`, (err, data) => {
    if (data[0].count > 0) {
      connection.query(`DELETE FROM directors WHERE id=${dirId}`, (err, val) => {
        if (err) {
          reject(val);
          // connection.end();
        } else {
          resolve('director deleted');
          // connection.end();
        }
      });
    } else {
      resolve('No director with that id');
    }
  });
});

// deleteDirectorWithId(36).then(v => console.log(v));

module.exports = {
  getAllDirectors,
  getDirectorWithSpecificId,
  addNewDirector,
  updateDirectorWithId,
  deleteDirectorWithId,
};
