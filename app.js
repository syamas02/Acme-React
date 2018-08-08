const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = app;

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', require('./routes/route'));
app.use('/', (req, res) => {
  res.redirect('/api/');
});
app.use((req, res, next) => {
  next({ status });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send('<h1>There was an error </h1>');
});
