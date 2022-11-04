const passport = require("passport");

const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.json("The Email address or password is inccorect");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.json({ ...req.user.toJSON(), password: undefined });
      });
    }
  })(req, res, next);
};

module.exports = { login };
