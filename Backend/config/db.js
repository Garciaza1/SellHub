// backend/config/db.js
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',//172.17.0.2
  user: 'root',
  password: '',
  database: 'sellhub',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 60000 // 1 minuto
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + connection.threadId);// tem que ser 9
});

module.exports = connection;