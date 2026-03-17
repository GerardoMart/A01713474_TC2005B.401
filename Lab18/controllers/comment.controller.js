const Comment = require('../models/comment.model');

exports.postComment = (req, res) => {
    const { content, imageId, username } = req.body;

    const userId = req.session.user ? req.session.user.id : null;

    if (!userId && username) {
        res.cookie('guestName', username);
    }

    Comment.create(content, imageId, userId, username || null)
        .then(() => res.redirect('/'))
        .catch(err => console.log(err));
};