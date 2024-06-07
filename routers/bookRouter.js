const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Books = require("../models/books");
const { where } = require("../models/genres");

const bookRouter = express.Router();

bookRouter.use(bodyParser.json());

bookRouter
    .route("/")
    .get((req, res, next) => {

       
        
            Books.find({})
                .then((books) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(books);
                })
                .catch((err) => next(err))
        
    })

    .post((req, res, next) => {
        Books.create(req.body)
            .then(
                (book) => {
                    console.log("Book Created ", book);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(book);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        Books.updateOne(req.body)
            .then(
                (book) => {
                    console.log("Update success", book);
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(book);
                },
                (error) => next(error)
            )
            .catch((error) => next(error));
        // res.statusCode = 403;
        // res.end('PUT operation not supported on /Books');
    })
    .delete((req, res, next) => {
        Books.remove({})
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
bookRouter.route('/price/:price')
    .get((req, res, next) => {
        const price = req.params.price;
        if (price) {
            Books.find({ price: { $lte: price } })
                .then((books) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(books);
                })
                .catch((err) => next(err));
        } else {
            Books.find({})
                .then((books) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(books);
                })
                .catch((err) => next(err));
        }
    })
bookRouter
    .route("/:booksId")
    .get((req, res, next) => {
        Books.findById(req.params.booksId)
            .then(
                (book) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(book);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end("POST operation not supported on /Books/" + req.params.booksId);
    })
    .put((req, res, next) => {
        Books.findByIdAndUpdate(
            req.params.booksId,
            {
                $set: req.body,
            },
            { new: true }
        )
            .then(
                (book) => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json(book);
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findByIdAndRemove(req.params.booksId)
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
// comments
bookRouter
    .route("/:booksId/comments")
    .get((req, res, next) => {
        Books.findById(req.params.booksId)
            .then(
                (book) => {
                    if (book != null) {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(book.comments);
                    } else {
                        err = new Error("Book: " + req.params.booksId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        Books.findById(req.params.booksId)
            .then(
                (book) => {
                    if (book != null) {
                        book.comments.push(req.body);
                        book.save().then(
                            (book) => {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(book);
                            },
                            (err) => next(err)
                        );
                    } else {
                        err = new Error("Book  " + req.params.booksId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .put((req, res, next) => {
        res.statusCode = 403;
        res.end(
            "PUT operation not supported on /Books/" + req.params.bookId + "/comments"
        );
    })
    .delete((req, res, next) => {
        Books.findById(req.params.booksId)
            .then(
                (book) => {
                    if (book != null) {
                        for (var i = book.comments.length - 1; i >= 0; i--) {
                            book.comments.id(book.comments[i]._id).remove();
                        }
                        book.save().then(
                            (book) => {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(book);
                            },
                            (err) => next(err)
                        );
                    } else {
                        err = new Error("book " + req.params.bookId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });

bookRouter
    .route("/:bookId/comments/:commentId")
    .get((req, res, next) => {
        Books.findById(req.params.bookId)
            .then(
                (book) => {
                    if (book != null && book.comments.id(req.params.commentId) != null) {
                        res.statusCode = 200;
                        res.setHeader("Content-Type", "application/json");
                        res.json(book.comments.id(req.params.commentId));
                    } else if (book == null) {
                        err = new Error("book " + req.params.bookId + " not found");
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error("Comment " + req.params.commentId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.statusCode = 403;
        res.end(
            "POST operation not supported on /Books/" +
            req.params.bookId +
            "/comments/" +
            req.params.commentId
        );
    })
    .put((req, res, next) => {
        Books.findById(req.params.bookId)
            .then(
                (book) => {
                    if (book != null && book.comments.id(req.params.commentId) != null) {
                        if (req.body.rating) {
                            book.comments.id(req.params.commentId).rating = req.body.rating;
                        }
                        if (req.body.comment) {
                            book.comments.id(req.params.commentId).comment = req.body.comment;
                        }
                        book.save().then(
                            (book) => {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(book);
                            },
                            (err) => next(err)
                        );
                    } else if (book == null) {
                        err = new Error("book " + req.params.bookId + " not found");
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error("Comment " + req.params.commentId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    })
    .delete((req, res, next) => {
        Books.findById(req.params.bookId)
            .then(
                (book) => {
                    if (book != null && book.comments.id(req.params.commentId) != null) {
                        book.comments.id(req.params.commentId).remove();
                        book.save().then(
                            (book) => {
                                res.statusCode = 200;
                                res.setHeader("Content-Type", "application/json");
                                res.json(book);
                            },
                            (err) => next(err)
                        );
                    } else if (book == null) {
                        err = new Error("book " + req.params.bookId + " not found");
                        err.status = 404;
                        return next(err);
                    } else {
                        err = new Error("Comment " + req.params.commentId + " not found");
                        err.status = 404;
                        return next(err);
                    }
                },
                (err) => next(err)
            )
            .catch((err) => next(err));
    });

module.exports = bookRouter;
