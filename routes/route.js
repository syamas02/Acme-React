const express = require('express');
const router = express.Router();
const path = require('path');

const { models } = require('../db/db');
const Users = models.Users;
const Departments = models.Departments;

router.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
