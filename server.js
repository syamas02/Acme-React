const { sync, seed } = require('./db/db');
const PORT = 1330;
const express = require('express');
const app = express();

const init = () => {
  sync()
    .then(() => console.log('Database synced'))
    .then(() => seed())
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
      });
    });
};

init();
