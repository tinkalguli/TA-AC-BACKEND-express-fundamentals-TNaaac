const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));

app.use(cookieParser());

app.use((req, res, next) => {
  console.log(req.cookies);
  res.cookie("name", "Tinkal");
  next();
});

app.use("/server", (req, res, next) => {
  next("Unauthorized User");
});

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.get("/", (req, res) => {
  res.type("text/html");
  res.send(`<h2 style="color: #fff; background: #222; text-align: center; padding: 2rem;">
            Welcome to express
            </h2>`);
});

app.get("/about", (req, res) => {
  res.send('My name is qwerty');
});

app.post("/form", (req, res) => {
  res.send(req.body);
});

app.post("/json", (req, res) => {
  res.type("text/plain");
  res.send(`name : ${req.body.name}  age : ${req.body.age}  email : ${req.body.email}`);
});

app.get("/users/:username", (req, res) => {
  let username = req.params.username;
  res.type("text/html");
  res.send(`<h2 style="color: #fff; background: #222; text-align: center; padding: 2rem;">
            ${username}
            </h2>`);
});

app.use((req, res, next) => {
  res.send(`<h2 style="color: #fff; background: #222; text-align: center; padding: 2rem;">
  Page not found
  </h2>`);
});

app.use((err, req, res, next) => {
  res.send(`<h2 style="color: #fff; background: #222; text-align: center; padding: 2rem;">
  ${err}
  </h2>`);
});

app.listen(3000);