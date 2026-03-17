const router = require('express').Router();
const ctrl = require('../controllers/image.controller');
const commentCtrl = require('../controllers/comment.controller');

const isAuth = require('../util/is-auth');
const isAdmin = require('../util/is-admin');

router.get('/', ctrl.getIndex);

router.post('/image', isAuth, ctrl.postImage);

router.post('/comment', isAuth, commentCtrl.postComment);

router.delete('/image/:id', isAuth, isAdmin, ctrl.deleteImage);

module.exports = router;