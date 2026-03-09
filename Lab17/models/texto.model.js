const db = require('../util/database');

module.exports = class Texto {

    constructor(contenido){
        this.contenido = contenido;
    }

    save(){
        return db.execute(
            'INSERT INTO textos (contenido) VALUES (?)',
            [this.contenido]
        );
    }

    static fetchAll(){
        return db.execute('SELECT * FROM textos');
    }

    static fetchOne(id){
        return db.execute(
            'SELECT * FROM textos WHERE id = ?',
            [id]
        );
    }

    static update(id, contenido){
        return db.execute(
            'UPDATE textos SET contenido = ? WHERE id = ?',
            [contenido, id]
        );
    }
};