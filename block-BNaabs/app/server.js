const express = require("express");

const app = express();

app.use(express.urlencoded({ extended : false} ));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/new", (req, res) => {
  res.sendFile(__dirname + "/new.html");
});

app.post("/new", (req, res) => {
  res.json(req.body);
});

app.get("/users/:username", (req, res) => {
  res.json(req.params.username);
});

app.listen(3000);