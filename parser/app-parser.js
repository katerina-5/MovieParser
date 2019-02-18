const cluster = require('cluster');
const http = require('http');

require('dotenv').config();

const express = require('express');
const app = express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const libParser = require("./libs/parser");

const port = process.env.PARSER_PORT || 8080;
const hostname = "localhost";

const urlArray = ['/title/tt0108778/', '/title/tt2575988/', '/title/tt0238784/', '/title/tt1243957/', '/title/tt5523010/', '/title/tt1661199/', '/title/tt0414387/'];
// const urlBegin = process.env.URL || 'https://www.imdb.com';
const urlBegin = process.env.URL;

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < urlArray.length; i++) {
        cluster.fork();

        let url = urlBegin + urlArray[i];

        libParser.getJSON(url, function (err, data) {
            console.log(url);
            if (err !== null) {
                console.log('Something went wrong: ' + err);
            } else {
                libParser.mainParser(data);
            }
        });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    });
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server

    http.createServer((req, res) => {
        res.writeHead(200);
        res.end('hello world\n');
    }).listen(port);

    // server.listen(port, hostname);

    console.log(`Worker ${process.pid} started`);
}
