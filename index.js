const http = require('http');
require('dotenv').config();

// const hostname = process.env.HOSTNAME || "localhost";
const port = process.env.SOME_PORT;

// console.log(`${hostname}:${port}`);

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, () => {
    console.log(`Server running at http://:${port}/`);
    // console.log(`Server listening on port: ${port}`);
});