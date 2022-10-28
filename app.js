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
const { logout } = require("./node/actions/logout")

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

app.post("/logout", logout);

app.listen(4000, () => {
  console.log("Server has started");
});
