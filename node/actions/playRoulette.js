const AccountBalance = require("../models/accountBalance");

const playRoulette = async (req, res) => {
  try {
    const bet = parseInt(req.body.credits);
    const actuallBalance = await AccountBalance.findOne({ userID: req.body.id });
    if (actuallBalance.state < bet) {
      const toSend = {
        message: "You don't have enough credits!",
        result: "",
      };
      res.send(toSend);
    } else {
      const result = Math.floor(Math.random() * 21);
      if (result === parseInt(req.body.number)) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 30 + actuallBalance;
        await AccountBalance.updateOne({ userID: req.body.id }, { $set: { state: newBalance } });
        res.send(toSend);
      } else {
        const toSend = {
          message: "You have lost your bet!",
          result: result,
        };
        const newBalance = actuallBalance.state - bet;
        await AccountBalance.updateOne({ userID: req.body.id }, { state: newBalance });
        res.send(toSend);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { playRoulette };
