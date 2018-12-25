const auth = require('../auth');
const config = require('../config');
const jwt = require('jsonwebtoken');
const errors = require('restify-errors');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const usersUrl = '/api/users';

module.exports = server => {
  // Register Account
  // Public
  server.post(`${usersUrl}/register`, async (req, res, next) => {
    const { name, email, password, security } = req.body;

    // Check whether this user is already registered
    User.findOne({ email }, (err, user) => {
      if (user) {
        res.json({ msg: 'That email is already registered' });
        return next();
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
            return next();
          } catch (err) {
            return next(new errors.InternalError(err));
          }
        });
      });
    });
  });

  // Log In
  // Public
  server.post(`${usersUrl}/login`, async (req, res, next) => {
    const { email, password } = req.body;

    try {
      // Authenticate User
      const user = await auth.authenticate(email, password);

      // Create JWT
      const token = jwt.sign(user.toJSON(), config.JWT_SECRET, {
        expiresIn: '15m',
      });

      const { iat, exp } = jwt.decode(token);

      // Respond with token
      res.send({ iat, exp, token });
      return next();
    } catch (err) {
      // User Unauthorized
      return next(new errors.UnauthorizedError(err));
    }
  });

  // Edit Account
  // Private

  // Delete Account
  // Private
};
