const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const { createUser } = require("./node/actions/create-user");
const { login } = require("./node/actions/login");
const { getLogedUser } = require("./node/actions/getLogedUser");
const { changeUserPassword } = require("./node/actions/change-user-password");
const { logout } = require("./node/actions/logout");
const { addCredits } = require("./node/actions/addCredits");

const { playRoulette } = require("./node/actions/playRoulette");
const { oneArmedBandit } = require("./node/actions/one-armed-bandit");

mongoose.connect("mongodb+srv://praktyki:praktyki2021@development.wtktz.mongodb.net/casino", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://praktyki:praktyki2021@development.wtktz.mongodb.net/casino",
    }),
    ...(process.env.COOKIE_DOMAIN
      ? { cookie: { domain: process.env.COOKIE_DOMAIN, httpOnly: false, sameSite: "None", secure: true } }
      : {}),
  })
);

app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./node/passport-config")(passport);

app.post("/user", createUser);
app.post("/user/login", login);
app.get("/user/me", getLogedUser);
app.post("/user/change-password", changeUserPassword);
app.put("/user/credits", addCredits);

app.post("/game/roulette", playRoulette);
app.post("/one-armed-bandit", oneArmedBandit);

app.post("/logout", logout);

app.listen(4000, () => {
  console.log("Server has started");
});
