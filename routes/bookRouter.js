const express = require('express');
const bodyParser = require('body-parser');
const bookRouter = express.Router();
bookRouter.use(bodyParser.json());
bookRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {

        res.end('welcome!');
    })
    .post((req, res, next) => {
        res.end('here we go \n Name :' + req.body.title + req.body.subTitle + '\n date:' + req.body.publish_date + '\n publisher: ' + req.body.publisher + '\n pages: ' + req.body.pages + '\n description: ' + req.body.description + '\n website: ' + req.body.website);
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /book');
    })

    .delete((req, res, next) => {
        res.end('Deleting all books');
    })
bookRouter.route('/:bookId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('Will send details of book: ' + req.params.bookId + ' to you!');
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /book/' + req.params.bookId);
    })

    .put((req, res, next) => {
        res.write('Updating the book: ' + req.params.bookId + '\n');
        res.end('Will update the book: ' + req.body.title +
            ' with details: ' + req.body.description);
    })

    .delete((req, res, next) => {
        res.end('Deleting book: ' + req.params.bookId);
    })

module.exports = bookRouter;