const db = require('../util/database');

class Comment {

    static create(content, imageId, userId, username) {
    return db.execute(
        'INSERT INTO comments (content, image_id, user_id, username) VALUES (?, ?, ?, ?)',
        [content, imageId, userId, username]
    );
}

    static getByImageId(imageId) {
    return db.execute(`
        SELECT 
            comments.*, 
            users.email 
        FROM comments
        LEFT JOIN users 
            ON comments.user_id = users.id
        WHERE comments.image_id = ?
    `, [imageId]);
}

    static searchByUser(userQuery) {
    return db.execute(`
        SELECT
            comments.content,
            comments.username,
            comments.image_id AS imageId,
            images.url AS imageUrl,
            users.email
        FROM comments
        LEFT JOIN users ON comments.user_id = users.id
        INNER JOIN images ON comments.image_id = images.id
        WHERE COALESCE(users.email, comments.username) LIKE ?
        ORDER BY comments.id DESC
    `, [userQuery]);
}

}

module.exports = Comment;
