const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require('bcrypt');
const createError = require('http-errors')

app.get("/signup", (req,res)=> {
    res.render("user/signup");
})

app.post("/signup", (req,res, next)=> {

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err) return next(createError(500, "Hashing failed. Trying to hack us?"));
        // Store hash in your password DB.
        User.create({
            username: req.body.username,
            password: hash
        })
        .then((user)=> {
            res.redirect("/user/login");
        })
        .catch((error)=> {
            next(createError(500, "Woow, our database crashed. Please come back later."))
        })
    });
})

app.get("/login", (req,res)=> {
    res.render("user/login");
})

app.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(!user) res.status(403).render("error");
            else { 
                bcrypt.compare(req.body.password, user.password, function(err, correct) {
                    if(err) return res.render("error");
                    else if(correct) {
                        req.session.currentUser = user;
                        if(req.session.redirectUrl) {
                            res.redirect(req.session.redirectUrl) // redirect to the url the user was trying to go to (checkout the protect middleware in app.js)
                        } else {
                            res.redirect("/"); // default redirect url (if the user is going to login directly)
                        }
                    } else {
                        res.status(403).render("error", err);        
                    }
                });                
            }
        })
})

app.get("/logout", (req,res)=> {
    req.session.destroy(); // delete all data attached to the session
    res.redirect("/")
})
module.exports = app;