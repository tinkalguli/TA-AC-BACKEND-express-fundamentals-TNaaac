const express = require("express");

const app = express();

app.use((req, res, next) => {
  if (req.url === "/admin") {
    return next("Unauthorized");
  }
  next();
});

app.get("/", (req, res) => {
  res.send("This is home page");
});

app.get("/about", (req, res) => {
  res.send("This is about page");
})

app.use((req, res, next) => {
  res.send("Page not found");
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(3000);