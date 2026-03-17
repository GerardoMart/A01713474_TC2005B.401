module.exports = (...roles) => {

    return (req, res, next) => {

        if (!req.session.role || !roles.includes(req.session.role)) {
            return res.status(403).send('Acceso denegado');
        }

        next();
    };

};