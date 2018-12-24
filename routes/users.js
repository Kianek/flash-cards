const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const usersUrl = '/api/users';

module.exports = server => {
  // Register Account
  server.post(`${usersUrl}/register`, async (req, res, next) => {
    const { name, email, password, security } = req.body;

    // Check whether this user is already registered
    User.findOne({ email }, (err, user) => {
      if (user) {
        res.json({ msg: 'That email is already registered' });
        next();
      }

      // If not registered, create new user, hash password, and save
      const newUser = new User({ name, email, password, security });
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, async (err, hash) => {
          // Hash Password
          newUser.password = hash;

          try {
            await newUser.save();
            res.send(201);
            next();
          } catch (err) {
            return next(new errors.InternalError(err));
          }
        });
      });
    });
  });

  // Edit Account

  // Delete Account
};
