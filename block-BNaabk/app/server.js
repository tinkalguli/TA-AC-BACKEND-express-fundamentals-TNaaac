const express = require("express");

const app = express();

app.get("/", (_, res) => {
  res.send("Welcome");
});

app.listen(3000, () => {
  console.log("Server is running on 3k");
});