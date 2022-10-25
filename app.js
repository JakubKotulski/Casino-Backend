const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");


mongoose.connect("mongodb+srv://praktyki:praktyki2021@development.wtktz.mongodb.net/casino", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true,
}));

app.listen(4000, () => {
    console.log("Server has started");
})