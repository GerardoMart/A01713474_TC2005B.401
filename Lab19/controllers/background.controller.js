const Settings = require('../models/background.model');

exports.postColor = (req, res) => {
    Settings.setColor(req.body.color)
    .then(() => res.redirect('/'));
};