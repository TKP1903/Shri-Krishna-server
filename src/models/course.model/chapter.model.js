const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const chapterSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  videos: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'Video',
    },
  ],
});

chapterSchema.plugin(toJSON);
chapterSchema.plugin(paginate);

const Chapter = mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
