const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const csrf = require('csurf');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(cookieParser());

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
}));

const csrfProtection = csrf();
app.use(csrfProtection);

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.role = req.session.user ? req.session.user.role : null;
    res.locals.csrfToken = req.csrfToken();
    res.locals.guestName = req.cookies ? req.cookies.guestName : '';
    next();
});

app.use(require('./routes/auth.routes'));
app.use(require('./routes/image.routes'));
app.use(require('./routes/admin.routes'));

app.listen(3018, () => {
    console.log('Servidor en http://localhost:3018');
});
