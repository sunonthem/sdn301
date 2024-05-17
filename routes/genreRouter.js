const express = require('express');
const bodyParser = require('body-parser');
const genreRouter = express.Router();
genreRouter.use(bodyParser.json());
genreRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {

        res.end('we have all genre for you');
    })
    .post((req, res, next) => {
        res.end('here we go\n' + req.body.id+ '\n'+req.body.name );
    })

    .put((req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /genre');
    })

    .delete((req, res, next) => {
        res.end('Deleting all genre');
    })
genreRouter.route('/:genresId')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .get((req, res, next) => {
        res.end('we have genre' + req.params.genresId + 'to you')
    })
    .post((req, res, next) => {
        res.end('genre' + req.params.genresId + 'with name' + req.body.name)
    })
    .put((req, res, next) => {
        res.write('update genre ' + req.params.genresId + '\n')
        res.end('Will update genre ' + req.params.genresId + ' with name ' + req.body.name)
    })
    .delete((req, res, next) => {
        res.end('Deleting genre: ' + req.params.genresId);
    })
module.exports= genreRouter;