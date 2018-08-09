const db = require('./db');
const { User, Department } = db.models;

const PORT = 1330;
const express = require('express');
const app = express();

const init = () => {
  db.sync()
    .then(() => console.log('Database synced'))
    .then(() => db.seed())
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
    });
};

init();

// User.findAll({}, departments => console.log(departments));
app.get('/api/departments', (req, res, next) => {
  Department.findAll({})
    .then(departments => res.send(departments))
    .catch(next);
});
app.get('/api/departments/:id', (req, res, next) => {
  Department.findById(req.params.id, {
    include: [User],
  })
    .then(departments => res.send(departments))
    .catch(next);
});
