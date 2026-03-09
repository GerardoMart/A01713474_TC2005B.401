const Bobina = require("../models/fisica.model");

exports.getFaraday = (req, res) => {
    const historial = Bobina.obtenerHistorial();
    res.render("faraday", { 
        resultado: null,
        historial
    });
};

exports.postFaraday = (req, res) => {

    const bobina = new Bobina(
        Number(req.body.N),
        Number(req.body.theta),
        Number(req.body.Bi),
        Number(req.body.Bf),
        Number(req.body.dt),
        Number(req.body.fem)
    );

    const resultado = bobina.calcular();
    const historial = Bobina.obtenerHistorial();

    res.render("faraday", { 
        resultado,
        historial
    });
};

exports.getHistorial = (req, res) => {
    const historial = Bobina.obtenerHistorial();
    res.render("faraday", { 
        resultado: null,
        historial
    });
};

exports.getDetalle = (req, res) => {
    const id = req.params.id;
    const resultado = Bobina.obtenerPorId(id);

    if (!resultado) {
        return res.status(404).render("404");
    }

    res.render("detalle", { resultado, id });
};