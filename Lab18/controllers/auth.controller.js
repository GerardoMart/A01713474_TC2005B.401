const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.getLogin = (req, res) => res.render('login');
exports.postLogin = (req, res) => {
    const { email, password } = req.body;

    User.findByEmail(email)
    .then(([rows]) => {
        if (rows.length === 0) return res.redirect('/login');

        const user = rows[0];

        return bcrypt.compare(password, user.password)
        .then(match => {
            if (!match) return res.redirect('/login');

            req.session.isLoggedIn = true;
            req.session.user = user;

            req.session.save(() => res.redirect('/'));
        });
    })
    .catch(err => {
        console.log(err);
        res.redirect('/login');
    });
};

exports.getRegister = (req, res) => res.render('register');

exports.postRegister = (req, res) => {
    const { email, password, role } = req.body;

    User.findByEmail(email)
    .then(([rows]) => {
        if (rows.length > 0) return res.redirect('/register');

        return User.create(email, password, role);
    })
    .then(() => res.redirect('/login'))
    .catch(err => {
        console.log(err);
        res.redirect('/register');
    });
};

exports.logout = (req, res) => {
    req.session.destroy(() => res.redirect('/'));
};