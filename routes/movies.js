const express = require("express");
const app = express();

app.get("/", (req,res)=> {

    Movie.find({})
    .then((movies)=> {
        res.render("movies/list", {movies:movies});
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