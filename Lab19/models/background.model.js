const db = require('../util/database');

exports.setColor = (color) => {
    return db.execute(
        'UPDATE settings SET background_color=? WHERE id=1',
        [color]
    );
};

exports.getColor = () => {
    return db.execute(
        'SELECT background_color FROM settings WHERE id=1'
    );
};