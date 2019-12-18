const express = require("express");
const app = express();

app.get("/", (req,res)=> {
    // stupid change
    Movie.find({})
    .then((movies)=> {
        res.render("movies/list", {movies:movies, username: req.session.currentUser.username});
    })
    .catch((err)=> {
        console.log("Err", err);
        res.send("ERROR ERROR");
    })

})


// app.get("/create", (req,res)=> {

//     .../

// })

// app.get("/update", (req,res)=> {

//     .../

// })

module.exports = app;