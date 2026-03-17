const router = require('express').Router();
const ctrl = require('../controllers/background.controller');
const isAuth = require('../util/is-auth');
const isAdmin = require('../util/is-admin');

router.post('/color', isAuth, isAdmin, ctrl.postColor);

module.exports = router;