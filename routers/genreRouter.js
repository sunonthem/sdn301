const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Genres = require("../models/genres");

const genreRouter = express.Router();

genreRouter.use(bodyParser.json());

genreRouter
    .route("/")
    .get((req, res, next) => {
        Genres.find({})
            .then(
                (genre) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(genre);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Genres.create(req.body)
            .then(
                (genre) => {
                    console.log("genre Created ", genre);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(genre);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Genres.updateOne(req.body)
            .then(
                (genre) => {
                    console.log("Update success", genre);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(genre);
                },
                (error) => next(error)
            )
            .catch((error) => next(error));
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /Genres');
    })
    .delete((req, res, next) => {
        Genres.remove({})
            .then(
                (resp) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });

genreRouter
    .route("/:GenresId")
    .get((req, res, next) => {
        Genres.findById(req.params.GenresId)
            .then(
                (genre) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(genre);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /Genres/" + req.params.GenresId);
    })
    .put((req, res, next) => {
        Genres.findByIdAndUpdate(
            req.params.GenresId,
            {
                $set: req.body,
            },
            { new: true }
        )
            .then(
                (genre) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(genre);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Genres.findByIdAndRemove(req.params.GenresId)
            .then(
                (resp) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(resp);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });


module.exports = genreRouter;
