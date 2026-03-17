const db = require('../util/database');

exports.add = (url, userId) => {
    return db.execute(
        'INSERT INTO images (url, user_id) VALUES (?, ?)',
        [url, userId]
    );
};

exports.getAll = () => {
    return db.execute('SELECT * FROM images');
};