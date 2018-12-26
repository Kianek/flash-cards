const errors = require('restify-errors');
const rjwt = require('restify-jwt-community');
const config = require('../config');
const bcrypt = require('bcryptjs');
const auth = require('../auth');
const User = require('../models/User');
const Collection = require('../models/Collection');
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

  // Create Collection
  server.post(
    `${collectionsUrl}/create`,
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Extract collection info from request body
      const { subject } = req.body;

      try {
        // Attempt to locate the current user
        const user = await User.findById(req.user._id);
        console.log(user);
        if (!user) {
          return next(new errors.NotFoundError('No such user'));
        }

        // Determine whether the subject is a duplicate
        const subjectAlreadyExists = user.collections.find(
          col => col.subject === subject
        );
        console.log(subjectAlreadyExists);
        if (subjectAlreadyExists) {
          return next(
            new errors.ConflictError('That subject has already been added')
          );
        }

        // Add collection to user
        const newCollection = {
          subject,
          cards: [],
        };

        user.collections.unshift(newCollection);
        const updatedUser = await user.save();
        console.log(updatedUser);
        res.send(updatedUser.collections);
        return next();
      } catch (err) {
        return next(new errors.NotFoundError(err));
      }
      // Add collection to User
      // If collection with same name exists, reject attempt
    }
  );

  // Delete Single Collection

  // Delete All Collections
};
