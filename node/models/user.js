const mongoose = require("mongoose");

const user = new mongoose.Schema({
    name: {type: String, require: true},
    surname: {type: String, require: true},
    email: {type: String, require: true},
    password: {type: String, require: true},
    age: {type: Number, require: true},
    avatar: {type: String, default: "//pic.onlinewebfonts.com/svg/img_312847.png"}
    
});

module.exports = mongoose.model("User", user);