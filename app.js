const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { register } = require("./node/actions/register");

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

app.use("/register", register);

app.listen(4000, () => {
  console.log("Server has started");
});
