const express = require('express');
const bodyParser = require('body-parser');
const authorRouter = express.Router();
authorRouter.use(bodyParser.json());
authorRouter.route('/')

    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {

        res.end('we have all author for you');
    })
    .post((req, res, next) => {
        res.end('here we go\n  name :' + req.body.name+'\n birthyear: '+ req.body.birthYear+'\n country:' +req.body.country );
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /author');
    })

    .delete((req, res, next) => {
        res.end('Deleting all author');
    })
authorRouter.route('/:authorId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('we have author' + req.params.authorId + 'to you')
    })
    .post((req, res, next) => {
        res.end('author' + req.params.authorId + 'with name' + req.body.name)
    })
    .put((req, res, next) => {
        res.write('update author ' + req.params.authorId + '\n')
        res.end('Will update author ' + req.params.authorId + ' with name ' + req.body.name)
    })
    .delete((req, res, next) => {
        res.end('Deleting author: ' + req.params.authorId);
    })

module.exports= authorRouter;