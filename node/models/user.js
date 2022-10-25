const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    age: {type: Number, require: true},
    
});

module.exports = mongoose.model("User", user);