const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dishRouter = require('./routers/dishRouter');
const genreRouter = require('./routers/genreRouter');
const authorRouter = require('./routers/authorRouter');
const bookRouter = require('./routers/bookRouter');
const Books = require('./models/books');
const Genres = require('./models/genres');
const cookieParser = require('cookie-parser');
const hostname = 'localhost';
const port = 5000;
const app = express();

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var session = require('express-session');
const userRouter = require('./routers/userRouter');
var FileStore = require('session-file-store')(session);

connect.then(() => {
    console.log("Connected correctly to server");
}, (err) => {
    console.log('Error connecting to MongoDB:', err);
});


app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/users', userRouter);
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

function auth(req, res, next) {
    console.log(req.session);

    if (!req.session.user) {
        var err = new Error('You are not authenticated!');
        err.status = 403;
        return next(err);
    }
    else {
        if (req.session.user === 'authenticated') {
            next();
        }
        else {
            var err = new Error('You are not authenticated!');
            err.status = 403;
            return next(err);
        }
    }
}

app.use(auth);

// app.use(cookieParser('12345-67890'));
// function auth(req, res, next) {
//     if (!req.signedCookies.user) {
//         var authHeader = req.headers.authorization;
//         if (!authHeader) {
//             var err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             next(err);
//             return;
//         }
//         var auth = new Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
//         var user = auth[0];
//         var pass = auth[1];
//         if (user == 'admin' && pass == 'password') {
//             res.cookie('user', 'admin', { signed: true });
//             next(); // authorized
//         } else {
//             var err = new Error('You are not authenticated!');
//             res.setHeader('WWW-Authenticate', 'Basic');
//             err.status = 401;
//             next(err);
//         }
//     }
//     else {
//         if (req.signedCookies.user === 'admin') {
//             next();
//         }
//         else {
//             var err = new Error('You are not authenticated!');
//             err.status = 401;
//             next(err);
//         }
//     }
// }



app.use('/books', bookRouter);
app.use('/author', authorRouter);
app.use('/genres', genreRouter);
app.use('/dishes', dishRouter);

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`);
});
