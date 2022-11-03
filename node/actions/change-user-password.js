const User = require("../models/user");
const bcrypt = require("bcryptjs");

const changeUserPassword = async (req, res) => {
  try {
    const loggedUser = await User.findOne({ _id: req.user._id });

    bcrypt.compare(req.body.password, loggedUser.password, async (err, result) => {
      if (result) {
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, 10);

        await User.updateOne({ _id: req.user._id }, { password: hashedNewPassword });
        res.json({ message: "Password successfully changed" });
      } else {
        res.json({ message: "Wrong current password" });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { changeUserPassword };
