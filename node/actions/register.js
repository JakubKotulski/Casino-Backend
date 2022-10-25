const User = require("../models/user");
const bcrypt = require("bcryptjs");

const register = (req, res) => {
  User.findOne({ email: req.body.email }, async (err, doc) => {
    if (err) throw err;
    if (doc) res.json({ message: "User with given E-mail already exists" });
    if (!doc) {
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
    }
  });
};

module.exports = { register };
