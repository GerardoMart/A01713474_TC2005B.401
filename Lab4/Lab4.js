// Números del 1 al número dado con sus cuadrados y cubos

let numero = parseInt(prompt(
"Ejercicio 1\nIngresa un número entero positivo:"
));

document.write("<h2>Ejercicio 1</h2>");
document.write("<table border='1'>");
document.write("<tr><th>Número</th><th>Cuadrado</th><th>Cubo</th></tr>");

for (let i = 1; i <= numero; i++) {
    document.write("<tr>");
    document.write("<td>" + i + "</td>");
    document.write("<td>" + (i * i) + "</td>");
    document.write("<td>" + (i * i * i) + "</td>");
    document.write("</tr>");
}

document.write("</table>");


// Resultado de la suma de 2 números generados de manera aleatoria

let num1 = Math.floor(Math.random() * 50);
let num2 = Math.floor(Math.random() * 50);

let inicio = new Date().getTime();

let respuesta = parseInt(prompt(
"Ejercicio 2\n¿Cuánto es " + num1 + " + " + num2 + "?"
));

let fin = new Date().getTime();
let tiempo = (fin - inicio) / 1000;

document.write("<h2>Ejercicio 2</h2>");

if (respuesta === num1 + num2) {
    document.write("<p>Correcto :D</p>");
} else {
    document.write("<p>Incorrecto :(. La respuesta era " + (num1 + num2) + "</p>");
}

document.write("<p>Tiempo que tardaste: " + tiempo + " segundos</p>");


// Contador de números negativos, ceros y números positivos dentro de un arreglo

function contador(arreglo) {
    let negativos = 0;
    let ceros = 0;
    let positivos = 0;

    for (let num of arreglo) {
        if (num < 0) negativos++;
        else if (num === 0) ceros++;
        else positivos++;
    }

    return { negativos, ceros, positivos };
}

let entradaArreglo = prompt(
"Ejercicio 3\nIngresa números separados por comas.\nEjemplo: -3,-1,0,5,8"
);

let arregloUsuario = entradaArreglo.split(",").map(Number);

let resultadoContador = contador(arregloUsuario);

document.write("<h2>Ejercicio 3</h2>");
document.write("<p>Arreglo ingresado: " + arregloUsuario + "</p>");
document.write("<p>Negativos: " + resultadoContador.negativos + "</p>");
document.write("<p>Ceros: " + resultadoContador.ceros + "</p>");
document.write("<p>Positivos: " + resultadoContador.positivos + "</p>");


// Promedios de los números de cada uno de los renglones de la matriz.

function promedios(matriz) {
    let resultado = [];

    for (let fila of matriz) {
        let suma = 0;
        for (let num of fila) {
            suma += num;
        }
        resultado.push(suma / fila.length);
    }

    return resultado;
}

let entradaMatriz = prompt(
"Ejercicio 4\nIngresa filas separadas por punto y coma (;)\n" +
"Y números separados por comas.\n\n" +
"Ejemplo:\n10,20,30;5,5,5;2,4,6,8"
);

let matrizUsuario = entradaMatriz
    .split(";")
    .map(fila => fila.split(",").map(Number));

let resultadoPromedios = promedios(matrizUsuario);

document.write("<h2>Ejercicio 4</h2>");
document.write("<p>Matriz ingresada: " + JSON.stringify(matrizUsuario) + "</p>");
document.write("<p>Promedios por fila: " + resultadoPromedios + "</p>");


// Regresar un número con sus dígitos en orden inverso

function inverso(numero) {
    return parseInt(numero.toString().split("").reverse().join(""));
}

let numeroUsuario = prompt(
"Ejercicio 5\nIngresa un número entero para invertir sus dígitos: \n" +
"Ejemplo:\n30495"
);

let resultadoInverso = inverso(numeroUsuario);

document.write("<h2>Ejercicio 5</h2>");
document.write("<p>Número original: " + numeroUsuario + "</p>");
document.write("<p>Número invertido: " + resultadoInverso + "</p>");

// Ley de Faraday

class Bobina {

    constructor(N, theta_deg, B_inicial, B_final, delta_t, fem) {
        this.N = N;
        this.theta_deg = theta_deg;
        this.B_inicial = B_inicial;
        this.B_final = B_final;
        this.delta_t = delta_t;
        this.fem = fem;
    }

    convertirARadianes() {
        return this.theta_deg * Math.PI / 180;
    }

    calcularArea() {

        if (this.N <= 0) {
            throw new Error("El número de vueltas debe ser mayor que cero.");
        }

        let theta_rad = this.convertirARadianes();
        let delta_B = this.B_final - this.B_inicial;
        let cos_theta = Math.cos(theta_rad);

        if (cos_theta === 0) {
            throw new Error("cos(θ)=0. No se puede calcular el área.");
        }

        let area = (this.fem * this.delta_t) / 
                   (this.N * delta_B * cos_theta);

        return area;
    }

    calcularResultados() {

        let area = this.calcularArea();
        let lado = Math.sqrt(area);
        let longitud_total = 4 * lado * this.N;

        return {
            area: area,
            lado: lado,
            longitud_total: longitud_total
        };
    }
}


// Pedir datos mediante prompts

let N = parseFloat(prompt(
"Ejercicio 6 - Ley de Faraday\n" +
"Número de vueltas de la bobina:"
));

let theta_deg = parseFloat(prompt(
"ÁÁngulo (en grados) entre la normal de la bobina y el campo magnético (θ):"
));

let B_inicial = parseFloat(prompt(
"Campo magnético inicial en Teslas\nEjemplo: 0.0002"
));

let B_final = parseFloat(prompt(
"Campo magnético final en Teslas\nEjemplo: 0.0006"
));

let delta_t = parseFloat(prompt(
"Tiempo en segundos en el que ocurre el cambio de campo magnético (Δt):"
));

let fem = parseFloat(prompt(
"Fuerza electromotriz inducida en voltios\nEjemplo: 0.08"
));


// Creación del objeto y calculación

try {
    let bobina = new Bobina(
        N, theta_deg, B_inicial, B_final, delta_t, fem
    );

    let resultados = bobina.calcularResultados();

    document.write("<h2>Ley de Faraday</h2>");
    document.write("<p><strong>Resultados obtenidos:</strong></p>");
    document.write("<p>Área de una espira: " + 
        resultados.area.toFixed(6) + " m²</p>");
    document.write("<p>Lado de cada espira (cuadrada): " + 
        resultados.lado.toFixed(4) + " m</p>");
    document.write("<p>Longitud total del alambre: " + 
        resultados.longitud_total.toFixed(4) + " m</p>");
} catch (error) {
    document.write("<h2>Ley de Faraday</h2>");
    document.write("<p style='color:red;'>Error: " + 
        error.message + "</p>");
}