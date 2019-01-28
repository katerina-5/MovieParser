const mongoose = require('mongoose');
const connection = mongoose.connection;
mongoose.connect(
  'mongodb://admin:admin12345@ds213615.mlab.com:13615/movies-parser',
  { useNewUrlParser: true }
);
connection.on('connected', () => {
  console.info(`Mongoose connected to`);
});

connection.on('disconnected', () => {
  console.info(`Mongoose disconnected from`);
});

connection.on('error', err => {
  if (err instanceof Error) throw err;
  throw new Error(`Unable connect to database`);
});
