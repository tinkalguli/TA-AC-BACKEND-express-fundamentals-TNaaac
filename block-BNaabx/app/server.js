const express = require("express");
const fs = require("fs");

const app = express();

function logger(req, res, next) {
    let method = req.method;
    let url = req.url;
    let time = new Date();

    console.log(method, url, time);
    next();
}

function json(req, res, next) {
    let store = "";
    req.on("data", (chunk) => {
        store += chunk;
    });
    req.on("end", () => {
        req.body = store;
        console.log(req.body);
    });
    next();
}

function static(req, res, next) {
    fs.readFile(__dirname + "/public" + req.url, (err, content) => {
        if(err) return next();
        res.sendFile(__dirname + "/public" + req.url);
    });
}

app.use(logger);
app.use(json);
app.use(static);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(5000);