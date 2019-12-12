const Movie = require("./models/movie");

// READ
Movie.find({year: "2001"})
    .then((movies)=> {
        debugger
    })
    .catch((err)=> {
        console.log("Err", err);
    })

// CREATE - OPTION A - With the save method
// let turksFruit = new Movie({
//     title: "Turks Fruit",
//     director: "Paul Verhoeven",
//     year: "1973",
//     duration: "1h 52m",
//     genre: ["drama"],
//     rate: "9.0"
// })

// turksFruit.save()
//     .then(()=> {    
//         console.log("movie inserted into db");
//     })
//     .catch((err)=> {
//         console.log("Err", err);
//     })

// CREATE - OPTION B - With the create method
Movie.create({
    director: "Paul Verhoeven",
    year: "1973",
    duration: "1h 52m",
    genre: ["drama"],
    rate: "9.0"
})
.then((turksFruit)=> {
    console.log("Movie created");
})
.catch((err)=> {
    console.log("Err", err)
})


// UPDATE - OPTION 1 - Find first and update after
// Movie.findOne({title: "Turks Fruit"})
//     .then((movie)=> {
//         return movie.update({
//             director: "Jurgen Tonneyck"
//         })
//     })
//     .catch((err)=> {
//         console.log("Err", err);
//     })


// UPDATE OPTION 2 - Find and Update at the same time
Movie.findOneAndUpdate({title: "Turks Fruit"}, {year: "2019"})
    .then((movie)=> {
        console.log(movie)
    })
    .catch((error)=> {
        console.log("Err", error)
    })

// DELETE OPTION 1
// find and delete a document. Use the lesson or documentation.