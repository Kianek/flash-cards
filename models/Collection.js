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
        trim: true,
      },
    },
  ],
});

CollectionSchema.plugin(timestamp);

// const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = CollectionSchema;
