const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const config = require('../config');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const User = require('../models/User');
const collectionsUrl = '/api/collections';

module.exports = server => {
  // server.get(
  //   collectionsUrl,
  //   rjwt({ secret: config.JWT_SECRET }),
  //   async (req, res, next) => {
  //     res.send('Collections test');
  //     return next();
  //   }
  // );

  // Get all collections for the user
  server.get(
    collectionsUrl,
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const result = await User.findById(req.user._id);

        if (result) {
          res.send(result.collections);
          return next();
        }
      } catch (err) {
        return next(new errors.NotFoundError(err));
      }
    }
  );

  // Get Single Collection

  // Delete Single Collection
};
