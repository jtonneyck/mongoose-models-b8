const express = require("express");
const app = express();
const Movie = require("./models/Movie");

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

app.use("/movies", require("./routes/movies"));


app.listen(3000,()=> {
    console.log("Webserver listening");
})