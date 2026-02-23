//Una función que reciba un arreglo de números y devuelva su promedio.
function promedio(numeros) {

let suma = 0;

for (let n of numeros) {
    suma += n;
}

return suma / numeros.length;
}

const datos = [10, 20, 30, 40, 50];
console.log("Promedio:", promedio(datos));


//Una función que reciba un string y escriba el string en un archivo de texto.
const fs = require("fs");

function escribirArchivo(texto) {

fs.writeFileSync("Lab8.txt", texto);

console.log("Archivo creado correctamente: Lab8.txt");
}

escribirArchivo("Holaa, este archivo fue creado usando Node.js");


//Problema que hayas implementado en otro lenguaje de programación.
function esPrimo(numero) {

if (numero <= 1) return false;

for (let i = 2; i < numero; i++) {
    if (numero % i === 0) {
        return false;
    }
}

return true;
}

let n = 29;

if (esPrimo(n)) {
console.log(n, "es primo");
} else {
console.log(n, "no es primo");
}


//Mostrar el Lab6
const http = require("http");
const path = require("path");

const server = http.createServer((req, res) => {

console.log("Petición:", req.url);

let ruta = req.url;

if (ruta === "/") {
    ruta = "/Lab6.html";
}

const filePath = path.join(__dirname, "../Lab6", ruta);

const ext = path.extname(filePath);

const tipos = {
".html": "text/html",
".css": "text/css",
".js": "application/javascript"
};

fs.readFile(filePath, (error, contenido) => {

if (error) {
    res.writeHead(404);
    res.end("Archivo no encontrado");
    return;
}

res.writeHead(200, { "Content-Type": tipos[ext] || "text/plain" });

res.end(contenido);

});

});

server.listen(3000, () => {
console.log("Servidor corriendo en http://localhost:3000");
});