const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const CardSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
    require: true,
    trim: true,
  },
  question: {
    type: String,
    require: true,
    trim: true,
  },
  answer: {
    type: String,
    require: true,
    trim: true,
  },
  hint: {
    type: String,
    require: true,
    trim: true,
  },
});

CardSchema.plugin(timestamp);

const Card = mongoose.model('Card', CardSchema);
module.exports = Card;
