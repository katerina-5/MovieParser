const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

app.use(bodyParser.json());

const port = "8080";
const hostname = "localhost";

const server = http.createServer((req, res, next) => {
    console.log(`server is listen in ${hostname}:${port}`);
    res.end("This is a movie parser");
});

server.listen(port, hostname);

// const url = "https://www.imdb.com/title/tt0108778/";

// app.get(url, function (req, res, next) {
//     console.log(url);
//     console.log(req.body);
//     console.log(url.json());
// });

// const jsonObject = {
//     "id": "12345",
//     "name": "some name",
//     "url": "https://www.imdb.com/title/tt0108778/"
// };

// console.log(JSON.parse(jsonObject));

const getJSON = function (url, callback) {
    console.log(url);
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        let status = xhr.status;
        if (status === 200) {
            callback(null, xhr.responseText);
        } else {
            callback(status, xhr.responseText);
        }
        // console.log(status);
        // console.log("Response: ", xhr.responseText);
    };
    xhr.send();
};

const url = "https://www.imdb.com/title/tt0108778/";

getJSON(url, function (err, data) {
    // console.log(url);
    if (err !== null) {
        console.log('Something went wrong: ' + err);
    } else {
        // console.log('Your data: ' + data.json);
        findJsonObject(data);
        // console.log(data);
    }
});

const findJsonObject = function (data) {
    let start = data.indexOf("<script type=\"application/ld+json\">");

    let pos = 0;
    while (true) {
        let foundPos = data.indexOf("{", pos);
        if (foundPos == -1) break;

        if (foundPos > start) {
            start = foundPos;
            break;
        }

        pos = foundPos + 1;
    }

    let end;
    let target = "</script>";

    pos = 0;
    while (true) {
        let foundPos = data.indexOf(target, pos);
        if (foundPos == -1) break;

        if (foundPos > start) {
            end = foundPos;
            break;
        }

        // console.log("Temp position: ", foundPos); // нашли на этой позиции
        pos = foundPos + 1; // продолжить поиск со следующей
    }

    console.log(start);
    console.log(end);

    let json = data.substring(start, end);
    console.log("Json: ", json);
};