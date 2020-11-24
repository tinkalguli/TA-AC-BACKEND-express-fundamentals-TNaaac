const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");

const app = express();

app.use(logger("dev"));

app.use(cookieParser());

app.use(express.urlencoded({ extended : false }));

app.use(express.json());

app.use(express.static(__dirname + "/public"));

app.use((req, res, next) => {
    res.cookie("count", 1);
    console.log(req.cookies);
    next();
});

app.use((req, res, next) => {
    if (req.url === "/admin") {
        next("Unauthorised client");
    }
    next();
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.get("/speakers", (req, res) => {
    res.sendfile(__dirname + "/speakers.html");
});

app.get("/venue", (req, res) => {
    res.sendfile(__dirname + "/venue.html");
});

app.get("/schedule", (req, res) => {
    res.sendfile(__dirname + "/schedule.html");
});

app.get("/register", (req, res) => {
    res.sendfile(__dirname + "/register.html");
});

app.use((req, res, next) => {
    res.send("Page not found");
});

app.use((err, req, res, next) => {
    res.send(err);
});

app.listen(4000);