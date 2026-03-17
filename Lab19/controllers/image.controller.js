const Image = require('../models/image.model');
const Settings = require('../models/background.model');
const Comment = require('../models/comment.model');

exports.getIndex = async (req, res) => {
    try {
        const [images] = await Image.getAll();
        const [settings] = await Settings.getColor();

        for (let img of images) {
            const [comments] = await Comment.getByImageId(img.id);
            img.comments = comments || [];
        }

        res.render('index', {
            images: images,
            bgColor: settings.length > 0 
                ? settings[0].background_color 
                : 'white'
        });

    } catch (err) {
        console.log(err);
        res.render('index', {
            images: [],
            bgColor: 'white'
        });
    }
};

exports.postImage = (req, res) => {
    const url = req.body.url;
    const userId = req.session.user.id;

    Image.add(url, userId)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.log(err);
            res.redirect('/');
        });
};

exports.deleteImage = (req, res) => {
    const id = req.params.id;

    Image.delete(id)
    .then(() => {
        res.redirect('/');
    })
    .catch(err => {
        console.log(err);
        res.redirect('/');
    });
};