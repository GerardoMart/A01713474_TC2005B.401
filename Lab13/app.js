const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

//Middleware
app.use(bodyParser.urlencoded({ extended: false }));

//css
app.use(express.static(path.join(__dirname, "public")));

//Rutas
const operacionesRoutes = require("./routes/Operaciones");
const fisicaRoutes = require("./routes/Fisica");

app.use("/", operacionesRoutes);
app.use("/fisica", fisicaRoutes);

//404
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(3005, () => {
    console.log("Servidor en http://localhost:3005");
});