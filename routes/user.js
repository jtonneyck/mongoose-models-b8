const express = require("express");
const app = express();
const User = require("../models/user");
const bcrypt = require('bcrypt');

app.get("/signup", (req,res)=> {
    res.render("user/signup");
})

app.post("/signup", (req,res)=> {

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err) return res.send("error");
        // Store hash in your password DB.
        User.create({
            username: req.body.username,
            password: hash
        })
        .then((user)=> {
            res.redirect("/user/login");
        })
        .catch((error)=> {
            res.render("error", error)
        })
    });
})

app.get("/login", (req,res)=> {
    res.render("user/login");
})

app.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(!user) res.status(403).send("Invalid credentials.");
            else { 
                bcrypt.compare(req.body.password, user.password, function(err, correct) {
                    if(err) return res.send("error");
                    else if(correct) {
                        req.session.currentUser = user;
                        res.send("Logged in");
                    } else {
                        res.status(403).send("Invalid credentials.");        
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