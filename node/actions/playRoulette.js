const AccountBalance = require("../models/accountBalance");

const playRoulette = async (req, res) => { 
  try {
    const bet = parseInt(req.body.credits);
    const actuallBalance = await AccountBalance.findOne({ userID: req.user._id });
    if (actuallBalance.state < bet) {
      const toSend = {
        message: "You don't have enough credits!",
        result: "",
      };
      res.send(toSend);
      return;
    }
    const result = Math.floor(Math.random() * 36);

    if (req.body.variant === "gt18") {
      if (result > 18) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 5 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.body.variant === "lt19") {
      if (result < 19 && result != 0) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 5 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      if (result == 0) {
        const toSend = {
          message: "You got 0!",
          result: result,
        };
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.body.variant === "red") {
      if (result % 2 == 1) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 5 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      if (result == 0) {
        const toSend = {
          message: "You got 0!",
          result: result,
        };
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.body.variant === "black") {
      if (result % 2 == 0) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 8 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      if (result == 0) {
        const toSend = {
          message: "You got 0!",
          result: result,
        };
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.bodyvariant === "odd") {
      if (result % 2 == 1) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 8 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      if (result == 0) {
        const toSend = {
          message: "You got 0!",
          result: result,
        };
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.body.variant === "even") {
      if (result % 2 == 0) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 8 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      if (result == 0) {
        const toSend = {
          message: "You got 0!",
          result: result,
        };
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    if (req.body.variant === "luckyNumber") {
      if (result === parseInt(req.body.number)) {
        const toSend = {
          message: "You have won your bet!",
          result: result,
        };
        const newBalance = bet * 30 + actuallBalance.state;
        await AccountBalance.updateOne({ userID: req.user._id }, { $set: { state: newBalance } });
        res.send(toSend);
        return;
      }
      const toSend = {
        message: "You have lost your bet!",
        result: result,
      };
      const newBalance = actuallBalance.state - bet;
      await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });
      res.send(toSend);
      return;
    }

    const toSend = {
      message: "Chose one variant of game",
      result: "",
    };
    res.send(toSend);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { playRoulette };
