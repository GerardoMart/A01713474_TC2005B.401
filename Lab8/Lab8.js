const http = require("http");
const fs = require("fs");

//html
const html_header = `
<!DOCTYPE html>
<html>
<head>
    <title>Lab10: Rutas y formas</title>
    <style>
        body{font-family:Arial,sans-serif;background:#eef7f1;text-align:center;margin:40px}h1{color:#1f8d4b}.container{max-width:700px;margin:auto;background:#fff;padding:30px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,.1)}.tooltip{position:absolute;top:0;left:105%;width:220px;background:#e8fff1;border:1px solid #1f8d4b;padding:10px;border-radius:6px;visibility:hidden;font-size:14px}.field{position:relative;margin-bottom:25px}.seguridad{margin-top:10px;font-weight:bold}#caja{width:150px;height:50px;background:#1f8d4b;color:#fff;display:flex;align-items:center;justify-content:center;border-radius:6px;cursor:grab;margin-top:20px}#zona{margin-top:20px;height:120px;border:2px dashed #1f8d4b;display:flex;align-items:center;justify-content:center}footer{margin-top:40px;font-size:14px}
    </style>
</head>
<body>
`;

const html_footer = `
</body>
</html>
`;

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

function escribirArchivo(texto) {
    fs.appendFileSync("Lab10.txt", texto + "\n");
}

//Servidor

const server = http.createServer((request, response) => {

    console.log("Petición:", request.url);

    if (request.url == "/" && request.method == "GET") {

        response.setHeader("Content-Type", "text/html");
        response.write(html_header + `
            <h1>Laboratorio 10: Rutas y formas</h1>

            <a href="/promedio">Calcular Promedio</a>
            <a href="/primo">Numero Primo</a>
            <a href="/archivo">Guardar Texto</a>
        ` + html_footer);
        response.end();
    }

    //Promedio GET
    else if (request.url == "/promedio" && request.method == "GET") {

        const html_form = `
            <h2>Calcular Promedio</h2>
            <form action="/promedio" method="POST">
                Numeros separados por coma:
                <input name="numeros">
                <button type="submit">Calcular</button>
            </form>
        `;

        response.setHeader("Content-Type", "text/html");
        response.write(html_header + html_form + html_footer);
        response.end();
    }

    //Promedio POST
    else if (request.url == "/promedio" && request.method == "POST") {

        const datos_completos = [];

        request.on("data", (data) => {
            datos_completos.push(data);
        });

        request.on("end", () => {

            const datos = Buffer.concat(datos_completos).toString();
            const numerosTexto = decodeURIComponent(datos.split("=")[1]);
            const arreglo = numerosTexto.split(",");

            const resultado = promedio(arreglo);

            response.setHeader("Content-Type", "text/html");
            response.write(
                html_header +
                `<h2>Promedio = ${resultado}</h2>
                 <a href="/">Volver</a>` +
                html_footer
            );
            response.end();
        });
    }

    //Número primo GET
    else if (request.url == "/primo" && request.method == "GET") {

        const html_form = `
            <h2>Verificar Numero Primo</h2>
            <form action="/primo" method="POST">
                Numero:
                <input name="numero">
                <button type="submit">Verificar</button>
            </form>
        `;

        response.setHeader("Content-Type", "text/html");
        response.write(html_header + html_form + html_footer);
        response.end();
    }

    //Número primo POST
    else if (request.url == "/primo" && request.method == "POST") {

        const datos_completos = [];

        request.on("data", (data) => {
            datos_completos.push(data);
        });

        request.on("end", () => {

            const datos = Buffer.concat(datos_completos).toString();
            const numero = Number(datos.split("=")[1]);

            const resultado = esPrimo(numero)
                ? "ES primo"
                : "NO es primo";

            response.setHeader("Content-Type", "text/html");
            response.write(
                html_header +
                `<h2>${numero} ${resultado}</h2>
                 <a href="/">Volver</a>` +
                html_footer
            );
            response.end();
        });
    }

    //Archivo GET
    else if (request.url == "/archivo" && request.method == "GET") {

        const html_form = `
            <h2>Guardar texto en archivo</h2>
            <form action="/archivo" method="POST">
                Texto:
                <input name="texto">
                <button type="submit">Guardar</button>
            </form>
        `;

        response.setHeader("Content-Type", "text/html");
        response.write(html_header + html_form + html_footer);
        response.end();
    }

    //Archivo txt POST
    else if (request.url == "/archivo" && request.method == "POST") {

        const datos_completos = [];

        request.on("data", (data) => {
            datos_completos.push(data);
        });

        request.on("end", () => {

            const datos = Buffer.concat(datos_completos).toString();
            const texto = datos.split("=")[1];

            escribirArchivo(texto);

            response.setHeader("Content-Type", "text/html");
            response.write(
                html_header +
                `<h2>Texto guardado en Lab10.txt</h2>
                 <a href="/">Volver</a>` +
                html_footer
            );
            response.end();
        });
    }

    // Ruta inválida
    else {
        response.setHeader("Content-Type", "text/html");
        response.write(html_header + "<h1>Error 404</h1>" + html_footer);
        response.end();
    }
});

server.listen(3005, () => {
    console.log("Servidor en http://localhost:3005");
});