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

exports.searchByUser = async (req, res) => {
    const query = (req.body.query || '').trim();

    if (!query) {
        return res.status(200).json({
            message: 'Escribe un usuario para buscar',
            images: [],
            comments: []
        });
    }

    try {
        const userQuery = `%${query}%`;
        const [[images], [comments]] = await Promise.all([
            Image.searchByUser(userQuery),
            Comment.searchByUser(userQuery)
        ]);

        return res.status(200).json({
            message: `Resultados para "${query}"`,
            images,
            comments
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: 'No se pudo completar la búsqueda',
            images: [],
            comments: []
        });
    }
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
