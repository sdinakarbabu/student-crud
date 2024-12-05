const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'studentDatabase'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Database');
});

module.exports = db;



// CREATE DATABASE studentDatabase;
// USE studentDatabase;
// CREATE TABLE students (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     name VARCHAR(100),
//     roll_number VARCHAR(50),
//     course VARCHAR(100)
// );
