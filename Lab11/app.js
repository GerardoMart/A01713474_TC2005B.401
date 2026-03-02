const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const html_header = `
<!DOCTYPE html>
<html>
<head>
<title>Lab11: Express</title>

<style>
body{
    font-family:Arial,sans-serif;
    background:#eef7f1;
    text-align:center;
    margin:40px;
}

h1{color:#1f8d4b}

.container{
    max-width:700px;
    margin:auto;
    background:#fff;
    padding:30px;
    border-radius:10px;
    box-shadow:0 0 10px rgba(0,0,0,.1)
}

footer{
    margin-top:40px;
    font-size:14px
}
</style>

</head>
<body>
`;

const html_footer = `
</body>
</html>
`;

module.exports.html_header = html_header;
module.exports.html_footer = html_footer;


//Importar rutas
const operacionesRoutes = require("./routes/Operaciones");
const fisicaRoutes = require("./routes/Fisica");


//Middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    console.log("Middleware!");
    next();
});


//Rutas
app.use("/", operacionesRoutes);
app.use("/fisica", fisicaRoutes);


//Ruta inválida
app.use((req, res) => {
    res.status(404).send(
        html_header +
        `
        <div class="container">
            <h1>Error 404</h1>
            <p>Ruta no encontrada</p>
            <a href="/">Volver al inicio</a>
        </div>
        `
        + html_footer
    );
});


//Servidor
app.listen(3005, () => {
    console.log("Servidor Express en http://localhost:3005");
});