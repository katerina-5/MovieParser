const http = require('http');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const querystring = require('querystring');
const request = require('request');
require('dotenv').config();

module.exports = {
    getOneUrl,
    setStatusOfUrl,
    getUrlArray,
    mainParser,
    getJSON,
    postJSON,
    putJSON,
    modifyJSON,
    postDataToServer,
    findJsonObject
}

async function getOneUrl() {
    let url = await getUrlFromServer();

    if (url.status === "SOLVED") {
        url = null;
    }

    return url;
}

async function getUrlFromServer() {
    let url = "";
    let status = "NOT_ATTEMPTED";

    return new Promise((resolve, reject) => {
        http.get({
            hostname: 'localhost',
            port: `${process.env.PORT}`,
            // path: `/urls/another/:${status}`,
            path: '/urls/status',
            agent: false  // create a new agent just for this one request
        }, (res) => {
            // Do stuff with response
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const temp = JSON.parse(rawData);
                    console.log(temp);

                    url = temp;

                    resolve(url);
                } catch (e) {
                    console.error(e.message);
                    reject(e);
                }
            });
        });
    });
}

function getUrlArrayFromFile() {
    let urlArray = [];
    let text = "";

    let pathFile = __dirname + "\\urls.txt";
    console.log(pathFile);

    httpRequest = new XMLHttpRequest();
    // httpRequest.open("GET", "file://" + pathFile, true);
    httpRequest.open("GET", "urls.txt", true);
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200 || httpRequest.status == 0) {
                text = httpRequest.responseText;
            }
        }
    }
    httpRequest.send(null);

    console.log(text);
    // urlArray = text.split("\n");
}

async function getUrlArray() {
    const urlArray = await getFromServer();
    // console.log('=====================\n', urlArray);

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
                    // console.log(temp_arr);

                    for (let i = 0; i < temp_arr.length; i++) {
                        if (temp_arr[i].status === "NOT_ATTEMPTED") {
                            urlArray.push(temp_arr[i].url);

                            setStatusOfUrl(temp_arr[i], "SOLVED");
                        }
                    }

                    // console.log(urlArray);
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

async function isMovieInDatabase(url) {
    const result = await getMovie(url);

    console.log("Movie is in database: ", result);

    return result;
}

function getMovie(url) {
    let result = false;

    return new Promise((resolve, reject) => {
        http.get({
            hostname: 'localhost',
            port: `${process.env.PORT}`,
            path: `/movies/title:${url}`,
            agent: false  // create a new agent just for this one request
        }, (res) => {
            // Do stuff with response
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                    const temp = JSON.parse(rawData);
                    if (temp.url === url) {
                        console.log("Temp url: ", temp_arr[i].url);
                        console.log("Const url: ", url);
                        result = true;
                    }

                    // for (let i = 0; i < temp_arr.length; i++) {
                    //     if (temp_arr[i].url === url) {
                    //         console.log("Temp url: ", temp_arr[i].url);
                    //         console.log("Const url: ", url);
                    //         result = true;
                    //     }
                    // }

                    resolve(result);
                } catch (e) {
                    console.error(e.message);
                    reject(e);
                }
            });
        });
    });
}

async function mainParser(data) {
    let json = findJsonObject(data);
    console.log(json.name);
    // console.log("Actors: ", json.actor);

    const check = await isMovieInDatabase(json.url);

    if (check) {
        // PUT this movie
        putDataToServerById(modifyJSON(json));
    } else {
        // POST this movie
        postDataToServer(modifyJSON(json));
    }

    // console.log("Actors after modify: ", modifyJSON(json).actors);
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

function postJSON(json) {
    console.log(json);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'localhost:3000/movies/', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(json));
};

function putJSON(id, json) {
    console.log(json);

    let xhr = new XMLHttpRequest();
    xhr.open('PUT', `localhost:3000/movies/:${id}`, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(json));
};

function modifyJSON(json) {
    // json = JSON.parse(JSON.stringify(json).split('"@type":').join('"movieType":'));

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

function putDataToServerById(json) {
    console.log("PUT this movie: ", json.name);
    let id = json._id;

    const data = querystring.stringify(json);

    const options = {
        host: 'localhost',
        port: `${process.env.PORT}`,
        path: `/movies/:${id}`,
        method: 'PUT',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            // 'Content-Type': 'application/json',
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
