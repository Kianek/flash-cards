const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = server => {
  // Register Account
  server.get('/', (req, res, next) => {
    res.send('test');
    next();
  });

  // Edit Account

  // Delete Account
};
