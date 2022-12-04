const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');

const uploadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: Number,
    required: true,
    trim: true,
  },
  id: {
    type: String,
    enum: ['video'],
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

uploadSchema.plugin(toJSON);
uploadSchema.plugin(paginate);

const Upload = mongoose.model('Upload', uploadSchema);

module.exports = Upload;
