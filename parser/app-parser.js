const cluster = require('cluster');
const http = require('http');
const querystring = require('querystring');

const express = require('express');
const app = express();
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const port = process.env.PARSER_PORT || 8080;
const hostname = "localhost";

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
    };
    xhr.send();
};

const postJSON = function (json) {
    console.log(json);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'localhost:3000/movies/', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(json));
}

const modifyJSON = function (json) {
    // json = JSON.parse(JSON.stringify(json).split('"@type":').join('"movieType":'));

    json = JSON.stringify(json);

    json = json.replace("\"@type\":", "\"movieType\":");
    json = json.replace("\"genre\":", "\"genres\":");
    json = json.replace("\"actor\":", "\"actors\":");
    json = json.replace("\"director\":", "\"directors\":");
    json = json.replace("\"creator\":", "\"creators\":");

    json = json.split('"@type":').join('"someType":');

    return JSON.parse(json);
}

const postDataToServer = function (json) {
    console.log("POST this movie: ", json.name);

    const data = querystring.stringify(json);

    const options = {
        host: 'localhost',
        port: 3000,
        path: '/movies/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        response.on('end', function () {
            // res.send('ok');
        })
    });
    httpreq.write(data);
    httpreq.end();
}

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

        pos = foundPos + 1;
    }

    let json = data.substring(start, end);
    let resultJson = JSON.parse(json);
    return resultJson;
};

const urlArray = ['/title/tt0108778/', '/title/tt2575988/', '/title/tt0238784/', '/title/tt1243957/', '/title/tt5523010/', '/title/tt1661199/', '/title/tt0414387/'];
const urlBegin = process.env.URL || 'https://www.imdb.com';

if (cluster.isMaster) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < urlArray.length; i++) {
        cluster.fork();

        let url = urlBegin + urlArray[i];

        getJSON(url, function (err, data) {
            console.log(url);
            if (err !== null) {
                console.log('Something went wrong: ' + err);
            } else {
                let json = findJsonObject(data);
                console.log(json.name);
                console.log("Actors: ", json.actor);

                // postJSON(json);
                postDataToServer(modifyJSON(json));

                console.log("Actors after modify: ", modifyJSON(json).actors);
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
