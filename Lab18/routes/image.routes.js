const router = require('express').Router();
const ctrl = require('../controllers/image.controller');
const commentCtrl = require('../controllers/comment.controller');
const isAuth = require('../util/is-auth');

router.get('/', ctrl.getIndex);
router.post('/image', isAuth, ctrl.postImage);
router.post('/comment', commentCtrl.postComment);

module.exports = router;