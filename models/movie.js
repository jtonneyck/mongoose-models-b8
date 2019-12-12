const mongoose = require("mongoose");

Movie = mongoose.model("movies", {
    title: String,
    year: String,
    director: String,
    duration: String,
    genre: [String],
    rate: {type: String, required: true}
});

module.exports = Movie;