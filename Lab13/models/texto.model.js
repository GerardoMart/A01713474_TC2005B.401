const textos = [];

module.exports = class Texto {

    constructor(contenido) {
        this.contenido = contenido;
    }

    save() {
        textos.push(this);
    }

    static fetchAll() {
        return textos;
    }
}