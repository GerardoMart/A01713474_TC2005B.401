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

exports.searchByUser = (userQuery) => {
    return db.execute(`
        SELECT images.id, images.url, users.email
        FROM images
        INNER JOIN users ON images.user_id = users.id
        WHERE users.email LIKE ?
        ORDER BY images.id DESC
    `, [userQuery]);
};
