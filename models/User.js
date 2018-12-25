const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const CollectionSchema = require('./Collection');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  security: {
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
  },
  collections: [CollectionSchema],
});

UserSchema.plugin(timestamp);

const User = mongoose.model('User', UserSchema);
module.exports = User;
