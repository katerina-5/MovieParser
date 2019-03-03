const cluster = require('cluster');
const http = require('http');
require('dotenv').config();

const express = require('express');
const app = express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const port = process.env.PARSER_PORT;
console.log(`Parser is listening on port ${process.env.PARSER_PORT}`);

const urlBegin = process.env.URL;
const urlArray = new Array();

// GET urls from server

http.get({
    hostname: 'localhost',
    port: `${process.env.PORT}`,
    path: '/urls/',
    agent: false  // create a new agent just for this one request
}, (res) => {
    // Do stuff with response
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
        try {
            const temp_arr = JSON.parse(rawData);
            console.log(temp_arr);

            for (let i = 0; i < temp_arr.length; i++) {
                // console.log(temp_arr[i]);
                console.log(temp_arr[i].url);
                console.log(temp_arr[i].status);
                if (temp_arr[i].status === "NOT_ATTEMPTED") {
                    urlArray.push(temp_arr[i].url);
                }
            }

            console.log(urlArray);
        } catch (e) {
            console.error(e.message);
        }
    });
});

console.log("Url array in parser: " + urlArray);

// Multithreading parser

// if (cluster.isMaster) {
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers.
//     for (let i = 0; i < urlArray.length; i++) {
//         cluster.fork();

//         let url = urlBegin + urlArray[i];

//         libParser.getJSON(url, function (err, data) {
//             console.log(url);
//             if (err !== null) {
//                 console.log('Something went wrong: ' + err);
//             } else {
//                 libParser.mainParser(data);
//             }
//         });
//     }

//     cluster.on('exit', (worker, code, signal) => {
//         console.log(`Worker ${worker.process.pid} died`);
//     });
// } else {
//     // Workers can share any TCP connection
//     // In this case it is an HTTP server

//     http.createServer((req, res) => {
//         res.writeHead(200);
//         res.end('hello world\n');
//     }).listen(port);

//     console.log(`Worker ${process.pid} started`);
// }

function getUrlArray() {
    return urlArray;
}

module.exports = {
    getUrlArray
};