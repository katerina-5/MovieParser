const http = require('http');
require('dotenv').config();

const hostname = process.env.HOSTNAME;
const port = process.env.SOME_PORT;

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
});

server.listen(port, () => {
    // console.log(`Server running at http://${hostname}:${port}/`);
    console.log(`Server listening on port: ${port}`);
});