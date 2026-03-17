const db = require('../util/database');
const bcrypt = require('bcryptjs');

exports.create = (email, password) => {

    return bcrypt.hash(password, 12)
    .then(hash => {

        return db.execute(
            'INSERT INTO users (email, password) VALUES (?, ?)',
            [email, hash]
        );

    })
    .then(([result]) => {

        const userId = result.insertId;

        return db.execute(
            'INSERT INTO user_roles (user_id, rol_id) VALUES (?, ?)',
            [userId, 2]
        );
    });
};

exports.findByEmail = (email) => {

    return db.execute(`
        SELECT u.id, u.email, u.password, r.descripcion_rol AS role
        FROM users u
        JOIN user_roles ur ON u.id = ur.user_id
        JOIN roles r ON ur.rol_id = r.id_rol
        WHERE u.email = ?
    `, [email]);

};