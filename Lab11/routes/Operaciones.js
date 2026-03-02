const express = require("express");
const fs = require("fs");

const router = express.Router();

const layout = require("../app");
const html_header = layout.html_header;
const html_footer = layout.html_footer;


//Funciones
function promedio(numeros) {
    let suma = 0;
    for (let n of numeros) {
        suma += Number(n);
    }
    return suma / numeros.length;
}

function esPrimo(numero) {
    if (numero <= 1) return false;

    for (let i = 2; i < numero; i++) {
        if (numero % i === 0) return false;
    }
    return true;
}

function promedios(matriz) {
    let resultado = [];

    for (let fila of matriz) {
        let suma = 0;

        for (let num of fila) {
            suma += Number(num);
        }

        resultado.push(suma / fila.length);
    }

    return resultado;
}


//Rutas
router.get("/", (req, res) => {
    res.send(
        html_header +
        `
        <div class="container">
            <h1>Laboratorio 11: Express</h1>

            <a href="/promedio">Promedio</a><br><br>
            <a href="/primo">Numero Primo</a><br><br>
            <a href="/archivo">Guardar Texto</a><br><br>
            <a href="/promedios-matriz">Promedios Matriz</a><br><br>
            <a href="/fisica/faraday">Ley de Faraday</a>
        </div>
        `
        + html_footer
    );
});


//Promedio
router.get("/promedio", (req, res) => {
    res.send(
        html_header +
        `
        <div class="container">
            <h2>Promedio</h2>

            <form action="/promedio" method="POST">
                <input name="numeros">
                <button>Calcular</button>
            </form>

            <br><a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});

router.post("/promedio", (req, res) => {

    const arreglo = req.body.numeros.split(",");
    const resultado = promedio(arreglo);

    res.send(
        html_header +
        `<div class="container">
            <h2>Promedio = ${resultado}</h2>
            <a href="/">Volver</a>
        </div>`
        + html_footer
    );
});


//Número primo
router.get("/primo", (req, res) => {
    res.send(
        html_header +
        `
        <div class="container">
            <h2>Numero Primo</h2>

            <form action="/primo" method="POST">
                <input name="numero">
                <button>Verificar</button>
            </form>

            <br><a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});

router.post("/primo", (req, res) => {

    const numero = Number(req.body.numero);

    const resultado = esPrimo(numero)
        ? "ES primo"
        : "NO es primo";

    res.send(
        html_header +
        `<div class="container">
            <h2>${numero} ${resultado}</h2>
            <a href="/">Volver</a>
        </div>`
        + html_footer
    );
});


//Promedio matriz
router.get("/promedios-matriz", (req, res) => {

    res.send(
        html_header +
        `
        <div class="container">
            <h2>Promedios por renglón</h2>

            Filas separadas por ; <br>
            Números por coma<br><br>

            Ejemplo:<br>
            10,20,30;5,5,5;2,4,6
            <br><br>

            <form action="/promedios-matriz" method="POST">
                <input name="matriz">
                <button>Calcular</button>
            </form>

            <br><a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});

router.post("/promedios-matriz", (req, res) => {

    const texto = req.body.matriz;

    const matriz = texto
        .split(";")
        .map(fila => fila.split(",").map(Number));

    const resultado = promedios(matriz);

    res.send(
        html_header +
        `
        <div class="container">
            <h2>Promedios:</h2>
            <p>${resultado.join(", ")}</p>
            <a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});


//Archivo
router.get("/archivo", (req, res) => {
    res.send(
        html_header +
        `
        <div class="container">
            <h2>Guardar texto</h2>

            <form action="/archivo" method="POST">
                <input name="texto">
                <button>Guardar</button>
            </form>

            <br><a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});

router.post("/archivo", (req, res) => {

    fs.appendFileSync("Lab11.txt", req.body.texto + "\n");

    res.send(
        html_header +
        `
        <div class="container">
            <h2>Texto guardado</h2>
            <a href="/">Volver</a>
        </div>
        `
        + html_footer
    );
});


module.exports = router;