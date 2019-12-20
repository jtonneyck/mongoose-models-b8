const mongoose = require("mongoose")

module.exports = mongoose.model("user", {
    username: {type: String, required: true},
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    firstname: {type: String, required: [true, "Firstname is required"]},
    lastname: {type: String, required: [true, "Lastname is required"]},
    email: {
        type: String, 
        required  : [true, "Correct email is required"],
        validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    },
    profile_pic: String 
})