const Balance = require("../models/accountBalance");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      res.json({ message: "User with given E-mail already exists" });
      return;
    }

    const hasehdPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      name: req.body.name,
      surname: req.body.surname,
      email: req.body.email,
      password: hasehdPassword,
      age: req.body.age,
    });

    const accountStartBalance = new Balance({
      userID: newUser._id,
    });

    await newUser.save();
    await accountStartBalance.save();

    res.json({ message: "User Created" });
    res.status(201);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { createUser };
