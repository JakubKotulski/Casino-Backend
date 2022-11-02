const mongoose = require("mongoose");
const User = require("./user");

const accountBalance = new mongoose.Schema({
  state: { type: Number, default: 500 },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
});

module.exports = mongoose.model("AccountBalance", accountBalance);
