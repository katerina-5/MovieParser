module.exports = {
  getBase
};

function getBase(req, res, next) {
  res.send('Hello, world!\nThis is a home page.');
}
