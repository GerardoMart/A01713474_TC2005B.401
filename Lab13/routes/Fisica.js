const express = require("express");
const router = express.Router();

const fisicaController = require("../controllers/fisica.controller");

router.get("/faraday", fisicaController.getFaraday);
router.post("/faraday", fisicaController.postFaraday);

router.get("/historial", fisicaController.getHistorial);
router.get("/historial/:id", fisicaController.getDetalle);

module.exports = router;