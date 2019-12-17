const express = require("express");
const app = express();
const Movie = require("./models/Movie");

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))

var session = require('express-session')
var sessionOptions = {
    secret: 'keyboard cat',
    cookie: {}
  }
  
app.use(session(sessionOptions));

app.set('views', './views');
app.set('view engine', 'hbs');

const mongoose = require("mongoose");

let options = { 
                useNewUrlParser: true,  
                useUnifiedTopology: true 
            };

mongoose.connect("mongodb://localhost:27017/video", options ,(err, connectionInfo)=> {
    if(err) console.log("ERROR", err);
    else console.log("connected to db");
})

app.use("/", (req,res, next)=> {
    console.log("HI I'm part of some middleware");
    next();
})

function protect(req,res, next) {
    if(req.session.currentUser) next();
    else res.redirect("/user/login");
}
app.use("/movies", protect)

app.use("/directors", protect )
app.use("/movies", require("./routes/movies"));
app.use("/user", require("./routes/user"));
app.use("/", require("./routes/home"));

app.listen(3000,()=> {
    console.log("Webserver listening");
})
