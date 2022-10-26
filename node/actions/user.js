const User = require("../models/user");
const bcrypt = require("bcryptjs");

const user = async (req, res) => {
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

    await newUser.save();

    res.json({ message: "User Created" });
    res.status(201);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { user };
