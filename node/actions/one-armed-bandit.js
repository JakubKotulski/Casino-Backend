const AccountBalance = require("../models/accountBalance");

const oneArmedBandit = async (req, res) => {
  try {
    const balance = await AccountBalance.findOne({ userID: req.user._id });

    const bet = parseInt(req.body.bet);
    const rng1 = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    const rng2 = Math.floor(Math.random() * (7 - 1 + 1) + 1);
    const rng3 = Math.floor(Math.random() * (7 - 1 + 1) + 1);

    const rngs = { rng1, rng2, rng3 };

    if (balance.state <= 0 || balance.state < bet) {
      res.json({
        message: "No money",
        rngs: { rng1: "0", rng2: "0", rng3: "0", balance: balance },
      });
    } else {
      if (rngs.rng1 === 7 && rngs.rng2 === 7 && rngs.rng3 === 7) {
        const newBalance = balance.state + bet * 50;

        await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });

        res.json({ message: `You win ${bet * 50}`, rngs: rngs, balance: newBalance });
      } else if (rngs.rng1 === rngs.rng2 && rngs.rng2 === rngs.rng3) {
        const newBalance = balance.state + bet * 10;

        await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });

        res.json({ message: `You win ${bet * 10}`, rngs: rngs, balance: newBalance });
      } else if (rngs.rng1 === rngs.rng2 || rngs.rng2 === rngs.rng3 || rngs.rng1 === rngs.rng3) {
        const newBalance = balance.state + bet;

        await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });

        res.json({ message: `You win ${bet}`, rngs: rngs, balance: newBalance });
      } else {
        const newBalance = balance.state - bet;

        await AccountBalance.updateOne({ userID: req.user._id }, { state: newBalance });

        res.json({ message: "You lose", rngs: rngs, balance: newBalance });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { oneArmedBandit };
