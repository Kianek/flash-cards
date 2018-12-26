const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  cards: [
    {
      subject: {
        type: String,
        trim: true,
      },
      question: {
        type: String,
        trim: true,
      },
      answer: {
        type: String,
        trim: true,
      },
      hint: {
        type: String,
        trim: true,
      },
    },
  ],
});

CollectionSchema.plugin(timestamp);

// const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = CollectionSchema;
