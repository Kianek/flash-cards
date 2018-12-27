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
      const { subject } = req.body;

      try {
        // Attempt to locate the current user
        const user = await User.findById(req.user._id);
        if (!user) {
          return next(new errors.NotFoundError('No such user'));
        }

        // Determine whether the subject is a duplicate
        const subjectAlreadyExists = user.collections.find(
          col => col.subject === subject
        );
        if (subjectAlreadyExists) {
          return next(
            new errors.ConflictError('That subject has already been added')
          );
        }

        // New object with the chosen subject name
        const newCollection = {
          subject,
          cards: [],
        };

        user.collections.unshift(newCollection);
        const updatedUser = await user.save();
        res.send(updatedUser.collections);
        return next();
      } catch (err) {
        return next(new errors.NotFoundError(err));
      }
    }
  );

  // Delete Single Collection
  server.del(
    `${collectionsUrl}/:col_id/delete`,
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      // Find user
      try {
        const user = await User.findById(req.user._id);

        if (!user) {
          return next(new errors.NotFoundError('Unable to find user'));
        }

        // Confirm that the chosen collection exists
        const { col_id } = req.params;
        const delCollection = user.collections.id(col_id);

        if (!delCollection) {
          return next(new errors.NotFoundError('Unable to find subject'));
        }

        // Create new array without the chosen collection
        const newCollections = user.collections.filter(
          c => c._id !== delCollection._id
        );
        console.log(newCollections);

        // Update the database
        user.collections = newCollections;
        const updatedUser = await user.save();

        // Send the new array to the client
        res.send(updatedUser.collections);
        return next();
      } catch (err) {
        return next(new errors.NotFoundError(err));
      }
    }
  );

  // Delete All Collections
  server.del(
    `${collectionsUrl}/delete-all`,
    rjwt({ secret: config.JWT_SECRET }),
    async (req, res, next) => {
      try {
        const user = await User.findById(req.user._id);

        if (!user) {
          return next(new errors.NotFoundError('User not found'));
        }

        // Set user's collections to an empty array
      } catch (err) {
        // TODO: fill in with proper error object
        return next(false);
      }
    }
  );
};
