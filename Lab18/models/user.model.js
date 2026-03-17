const db = require('../util/database');
const bcrypt = require('bcryptjs');

exports.create = (email, password, role='usuario') => {
    return bcrypt.hash(password, 12)
    .then(hash => {
        return db.execute(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hash, role]
        );
    });
};

exports.findByEmail = (email) => {
    return db.execute('SELECT * FROM users WHERE email=?', [email]);
};