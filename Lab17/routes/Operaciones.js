const express = require("express");
const router = express.Router();

const operacionesController = require("../controllers/operaciones.controller");

//Home
router.get("/", operacionesController.getIndex);

//Promedio
router.get("/promedio", operacionesController.getPromedio);
router.post("/promedio", operacionesController.postPromedio);

//Primo
router.get("/primo", operacionesController.getPrimo);
router.post("/primo", operacionesController.postPrimo);

//Archivo
router.get("/archivo", operacionesController.getArchivo);
router.post("/archivo", operacionesController.postArchivo);

//Editar texto
router.get('/editar/:texto_id', operacionesController.getEditarTexto);
router.post('/editar', operacionesController.postEditarTexto);

//Logout
router.get("/logout", operacionesController.logout);

module.exports = router;