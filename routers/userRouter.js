const mongoose = require("mongoose");
const express = require("express");
const userRouter = express.Router();
const bodyParser = require("body-parser");
const User = require("../models/users");
var authenticate = require('../authenticates');
var passport = require("passport");
userRouter.use(bodyParser.json());
userRouter.get("/", (req, res, next) => {
    res.send("hello");
});
userRouter.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username }, (err, user) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.json({ err: err });
        } else if (user != null) {
            var err = new Error("User " + req.body.username + " already exists!");
            err.status = 403;
            return next(err);
        } else {
            User.create(req.body, (err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ err: err });
                    return;
                }
                passport.authenticate("local")(req, res, () => {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({ success: true, status: "Registration Successful!" });
                });
            });
        }
    });
});

userRouter.post('/login', passport.authenticate("local"), (req, res) => {
    var token = authenticate.getToken({ _id: req.user._id });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ success: true, token: token, status: 'You are successfully logged in!' });

});

userRouter.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy();
        res.clearCookie("session-id");
        res.redirect("/");
    } else {
        var err = new Error("You are not logged in!");
        err.status = 403;
        next(err);
    }
});

module.exports = userRouter;
