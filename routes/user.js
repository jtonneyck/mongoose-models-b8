const express = require("express");
const app = express();
const User = require("../models/user");

app.get("/signup", (req,res)=> {
    res.render("user/signup");
})

app.post("/signup", (req,res)=> {
    // horrible! plain text password
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then((user)=> {
        res.redirect("/user/login");
    })
    .catch((error)=> {
        res.render("error", error)
    })
})

app.get("/login", (req,res)=> {
    res.render("user/login");
})

app.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(!user) res.status(403).send("Invalid username");
            else if(user.password === req.body.password) { // horrible! plain text password!
                // logged the user in
                req.session.currentUser = user;
                res.send("Logged in");
            }
            else {
                res.status(403).send("Invalid password");            
            }
        })
})

app.get("/logout", (req,res)=> {
    req.session.destroy(); // delete all data attached to the session
    res.redirect("/")
})
module.exports = app;