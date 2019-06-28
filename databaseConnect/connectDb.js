let mysql = require('mysql');

const connectToDatabase = () => {
  let connection = mysql.createConnection({
    host: '172.17.0.3',
    user: 'root',
    password: 'lovely',
    database: 'movie_genre',
  });
  return connection;
};

module.exports.connectToDatabase = connectToDatabase;
