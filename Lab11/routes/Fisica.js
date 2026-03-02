const express = require("express");

const router = express.Router();

const layout = require("../app");
const html_header = layout.html_header;
const html_footer = layout.html_footer;

class Bobina {

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

        return { area, lado, longitud };
    }
}


//Get
router.get("/faraday", (req, res) => {

    res.send(
        html_header +
        `
        <div class="container">

            <h2>Ley de Faraday</h2>

            <form action="/fisica/faraday" method="POST">

                N:<br>
                <input name="N"><br><br>

                Theta (grados):<br>
                <input name="theta"><br><br>

                B inicial:<br>
                <input name="Bi"><br><br>

                B final:<br>
                <input name="Bf"><br><br>

                Δt:<br>
                <input name="dt"><br><br>

                FEM:<br>
                <input name="fem"><br><br>

                <button>Calcular</button>

            </form>

            <br>
            <a href="/">Volver</a>

        </div>
        `
        + html_footer
    );
});


//Post
router.post("/faraday", (req, res) => {

    try {

        const b = new Bobina(
            Number(req.body.N),
            Number(req.body.theta),
            Number(req.body.Bi),
            Number(req.body.Bf),
            Number(req.body.dt),
            Number(req.body.fem)
        );

        const r = b.calcular();

        res.send(
            html_header +
            `
            <div class="container">

                <h2>Resultados — Ley de Faraday</h2>

                <p><strong>Área:</strong> ${r.area.toFixed(6)} m²</p>
                <p><strong>Lado:</strong> ${r.lado.toFixed(4)} m</p>
                <p><strong>Longitud total:</strong> ${r.longitud.toFixed(4)} m</p>

                <br>
                <a href="/fisica/faraday">Calcular nuevamente</a>
                <br><br>
                <a href="/">Volver al inicio</a>

            </div>
            `
            + html_footer
        );

    } catch (error) {

        res.send(
            html_header +
            `
            <div class="container">
                <h2>Error</h2>
                <p>${error.message}</p>
                <a href="/fisica/faraday">Volver</a>
            </div>
            `
            + html_footer
        );
    }
});

module.exports = router;