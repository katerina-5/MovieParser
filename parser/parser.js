const express = require('express');
const app = express();
const http = require('http');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

const port = "8080";
const hostname = "localhost";

const server = http.createServer((req, res, next) => {
    console.log(`server is listen in ${hostname}:${port}`);
    res.end("This is a movie parser");
});
server.listen(port, hostname);

const url = "https://www.imdb.com/title/tt0108778/";

app.get(url, function (req, res, next) {
    console.log(url);
    console.log(req.body);
    console.log(url.json());
});

const jsonObject = {
    "id": "12345",
    "name": "some name",
    "url": "https://www.imdb.com/title/tt0108778/"
};

console.log(JSON.parse(jsonObject));