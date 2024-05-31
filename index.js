const express = require('express');
const http = require('http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dishRouter = require('./routers/dishRouter');
const genreRouter = require('./routers/genreRouter');
const authorRouter = require('./routers/authorRouter');
const bookRouter = require('./routers/bookRouter');
const Dishes = require('./models/dishes');

const hostname = 'localhost';
const port = 6000;
const app = express();

const url = 'mongodb://127.0.0.1:27017/conFusion';
const connect = mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {
    console.log("Connected correctly to server");
}, (err) => { 
    console.log('Error connecting to MongoDB:', err); 
});

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));

app.use(express.json()); // Replaces body-parser

app.use('/book', bookRouter);
app.use('/author', authorRouter);
app.use('/genre', genreRouter);
app.use('/dishes', dishRouter);

const server = http.createServer(app);
server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
