const http = require('http');
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const querystring = require('querystring');

module.exports = {
    mainParser,
    getJSON,
    postJSON,
    modifyJSON,
    postDataToServer,
    findJsonObject
}

function getUrlArray() {
    // get from db - all urlQueue
    // for (i = 0; i < length; i++)
    // if (status === "NOT_ATTEMPTED")
    // add in urlArray
    // return urlArray
}

function mainParser(data) {
    let json = findJsonObject(data);
    console.log(json.name);
    console.log("Actors: ", json.actor);

    postDataToServer(modifyJSON(json));

    console.log("Actors after modify: ", modifyJSON(json).actors);
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
        port: 3000,
        path: '/movies/',
        method: 'POST',
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
        })
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