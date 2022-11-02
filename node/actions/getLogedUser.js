const AccountBalance = require("../models/accountBalance");

const getLogedUser = async (req, res) => {
  try {
    const balance = await AccountBalance.findOne({ userID: req.user._id });
    res.status(200);
    res.json(balance);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getLogedUser };
