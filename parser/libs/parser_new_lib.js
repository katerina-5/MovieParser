const http = require('http');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const querystring = require('querystring');
const request = require('request');
require('dotenv').config();

module.exports = {
    getOneUrl,
    getUrlArray,
    mainParser,
    getJSON
}

async function getOneUrl() {
    let url = await getUrlFromServer();
    return url;
}

async function getUrlFromServer() {
    let url = "";
    let status = "NOT_ATTEMPTED";

    return new Promise((resolve, reject) => {
        http.get({
            hostname: 'localhost',
            port: `${process.env.PORT}`,
            path: '/urls/status',
            agent: false  // create a new agent just for this one request
        }, (res) => {
            // Do stuff with response
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    console.log(rawData);
                    const temp = JSON.parse(rawData);
                    console.log(temp);

                    url = temp;

                    resolve(url);
                } catch (e) {
                    console.error(e.message);
                    resolve({});
                }
            });
        });
    });
}

async function getUrlArray() {
    const urlArray = await getFromServer();
    return urlArray;
}

async function getFromServer() {
    let urlArray = new Array();

    return new Promise((resolve, reject) => {
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

                    for (let i = 0; i < temp_arr.length; i++) {
                        if (temp_arr[i].status === "NOT_ATTEMPTED") {
                            urlArray.push(temp_arr[i].url);

                            setStatusOfUrl(temp_arr[i], "SOLVED");
                        }
                    }

                    resolve(urlArray);
                } catch (e) {
                    console.error(e.message);
                    reject(e);
                }
            });
        });
    });
}

function setStatusOfUrl(json, status) {
    console.log("PUT this status: ", status);
    console.log("to this url id: ", json._id);

    json.status = status;

    const data = querystring.stringify(json);

    const options = {
        host: 'localhost',
        port: `${process.env.PORT}`,
        path: `/urls/:id`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        },
        params: {
            id: json._id
        }
    };

    const httpreq = http.request(options, function (response) {
        response.setEncoding('utf8');
        response.on('data', function (chunk) {
            console.log("body: " + chunk);
        });
        response.on('end', function () {
        });
    });
    httpreq.write(data);
    httpreq.end();
}

async function mainParser(data) {
    let json = findJsonObject(data);
    console.log(json.name);
}

function getJSON(url, callback) {
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

function modifyJSON(json) {
    json = JSON.stringify(json);

    json = json.replace("\"@type\":", "\"movieType\":");
    json = json.replace("\"genre\":", "\"genres\":");
    json = json.replace("\"actor\":", "\"actors\":");
    json = json.replace("\"director\":", "\"directors\":");
    json = json.replace("\"creator\":", "\"creators\":");

    json = json.split('"@type":').join('"someType":');

    return JSON.parse(json);
};

function postDataToServer(json) {
    console.log("POST this movie: ", json.name);

    const data = querystring.stringify(json);

    const options = {
        host: 'localhost',
        port: `${process.env.PORT}`,
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
        });
    });
    httpreq.write(data);
    httpreq.end();
};

function findJsonObject(data) {
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
