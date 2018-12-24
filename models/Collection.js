const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  cards: [
    {
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
    },
  ],
});

CollectionSchema.plugin(timestamp);

const Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;
