const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.url === "/about") {
    res.cookie("username", "suraj");
  }
  next();
});

app.use(logger("dev"));

app.use((req, res, next) => {
  console.log(req.cookies);
  next();
});

app.listen(3000, () => {
  console.log("Server is running on port 3k")
});