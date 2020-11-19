const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.get("/", (_, res) => {
  res.send("This is the home page");
});

app.listen(4000, () => {
  console.log("Server is running on port 4k");
})