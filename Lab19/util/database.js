const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'feFOfe43?',
    database: 'Lab19'
});

module.exports = pool.promise();