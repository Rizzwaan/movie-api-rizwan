const movies = require('./movies.json');
const dbConnect = require('../databaseConnect/connectDb');

const connection = dbConnect.connectToDatabase();


const uniqueDirectors = new Set();
movies.forEach((element) => {
  uniqueDirectors.add(element.Director);
});


// creating director table
const dropTables = () => new Promise((resolve, reject) => {
  connection.query('drop table if exists movies,directors', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve('Droped Both table');
    }
  });
});

const createDirectorTable = () => new Promise((resolve, reject) => {
  connection.query('create table directors(id int not null auto_increment primary key, director_name varchar(250));', (err, data) => {
    if (err) {
      reject(err);
    } else {
      resolve('director table created');
    }
  });
});

const insertIntoDirectorTable = () => Promise.all([...uniqueDirectors].map(v => new Promise((resolve, reject) => {
  connection.query(`INSERT INTO directors (director_name) values("${v}") `, (err, data) => {
    if (err) {
      reject(err);
    } else {
      console.log('Inseted Data Into Director Table');
      resolve(1);
    }
  });
})));


const getDirectorId = v => new Promise((resolve, reject) => {
  connection.query(`select * from directors where director_name="${v}"`, (err, data) => {
    if (err) {
      reject(err);
    }
    resolve(data[0].id);
  });
});


const createMovieTable = () => new Promise((resolve, reject) => {
  const table = `CREATE TABLE movies(
      id MEDIUMINT NOT NULL PRIMARY KEY auto_increment,
      title CHAR(50),
      description LONGTEXT ,
      runtime INT,
      genre CHAR(20) ,
      rating FLOAT ,
      metascore varchar(250) ,
      votes INT ,
      gross_Earning_in_Mil VARCHAR(256),
      actor TEXT,
      director_id int(50) not null,
      FOREIGN KEY(director_id) references directors(id) on delete cascade on update cascade,
      year_of_release int
     )`;
  connection.query(table, (err, data) => {
    if (err) {
      reject(err);
    } else {
      console.log('Created Movie table');
      resolve(data);
    }
  });
});


const insertIntoMovieTable = () => Promise.all(
  movies.map(v => new Promise((resolve, reject) => {
    const dirId = getDirectorId(v.Director);
    dirId.then((dID) => {
      connection.query(`insert into movies (title,description,runtime, genre,  rating, metascore,votes,gross_Earning_in_Mil,actor,director_id,year_of_release )
          values("${v.Title}","${v.Description}","${v.Runtime}","${v.Genre}",${v.Rating},
          "${v.Metascore}",${v.Votes},"${v.Gross_Earning_in_Mil}","${v.Actor}",${dID},${v.Year})`, (err, data) => {
        if (err) {
          reject(err);
        } else {
          console.log('Inserted Data to movie table');
          resolve(data);
        }
      });
    });
  })),
);

dropTables()
  .then(data => console.log(data))
  .then(() => createDirectorTable())
  .then(data => console.log(data))
  .then(() => insertIntoDirectorTable())
  .then(data => console.log(data))
  .then(() => createMovieTable())
  .then(() => insertIntoMovieTable())
  .then(() => connection.end())
  .catch(() => 'Error Occured');
