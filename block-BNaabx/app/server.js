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

// function static(req, res, next) {
//     if(req.url.split('.').pop() === 'css') {
//         res.setHeader('Content-Type', 'text/css');
//         fs.readFile("/public" + req.url, (err, content) => {
//             if(err) return console.log(err);
//             res.end(content);
//         });
//     }

//     if(req.url.split('.').pop() === 'js') {
//         res.setHeader('Content-Type', 'text/js');
//         fs.readFile("./public" + req.url, (err, content) => {
//             if(err) return console.log(err);
//             res.end(content);
//         })
//     }

//     if(["jpeg", "jpg", "svg", "png"].includes(req.url.split('.').pop())) {
//         if (req.url.split('.').pop() == "svg") {
//             res.setHeader('Content-Type', 'image/' + req.url.split('.').pop() + "+xml");
//         }  else res.setHeader('Content-Type', 'image/' + req.url.split('.').pop());
//         fs.readFile("./public" + req.url, (err, content) => {
//             if(err) return console.log(err);
//             res.end(content);
//         });
//     }
//     next();
// }

app.use(logger);
app.use(json);
// app.use(static);

app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(5000);