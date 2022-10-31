const AccountBalance = require("../models/accountBalance");

const getLogedUser = async (req, res) => {
  try {
    const balance = await AccountBalance.findOne({ userID: req.user._id });
    const userInfo = {
      user: req.user,
      balance: balance.state,
    };
    res.status(200);
    res.json(userInfo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getLogedUser };
