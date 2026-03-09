const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'Lab17G',
    password: ''
});

module.exports = pool.promise();