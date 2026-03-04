let historial = [];

module.exports = class Bobina {

    constructor(N, theta, Bi, Bf, dt, fem) {
        this.N = N;
        this.theta = theta * Math.PI / 180;
        this.Bi = Bi;
        this.Bf = Bf;
        this.dt = dt;
        this.fem = fem;
    }

    calcular() {
        const deltaB = this.Bf - this.Bi;

        const area =
            (this.fem * this.dt) /
            (this.N * deltaB * Math.cos(this.theta));

        const lado = Math.sqrt(area);
        const longitud = 4 * lado * this.N;

        const resultado = { area, lado, longitud };

        historial.push(resultado);

        return resultado;
    }

    static obtenerHistorial() {
        return historial;
    }

    static obtenerPorId(id) {
        return historial[id];
    }
};