const AccountBalance = require("../models/accountBalance");

const addCredits = async (req, res) => {
  try {
    const actuallBalance = await AccountBalance.findOne({ userID: req.user._id });
    await AccountBalance.updateOne(
      { userID: req.user._id },
      { state: actuallBalance.state + parseInt(req.body.credits) }
    );
    res.status(200);
    res.send({ message: "successfuly added credits to your account" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addCredits };
