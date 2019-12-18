const express = require("express");
const app = express();
const createError = require('http-errors')

app.get("/", (req,res, next)=> {

    Movie.find({})
    .then((movies)=> {
        res.render("movies/list", {movies:movies});
    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })

})


// app.get("/create", (req,res)=> {

//     .../

// })

// app.get("/update", (req,res)=> {

//     .../

// })

module.exports = app;