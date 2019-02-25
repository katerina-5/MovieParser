module.exports = {
  getBase
};

function getBase(req, res, next) {
  // res.send('Hello, world!\nThis is a home page.');
  // console.log(__dirname + '/index.html');
  res.sendFile(__dirname + '/index.html');
}
