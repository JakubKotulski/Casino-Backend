const Balance = require("../models/accountBalance");

const startBalance = async (req, res) => {
  try {
    const accountStartBalance = new Balance({
      userID: req.body.id,
    });

    await accountStartBalance.save();
  } catch (err) {
    console.log(err);
  }
};

module.exports = { startBalance };
