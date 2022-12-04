const mongoose = require('mongoose');
const { toJSON, paginate } = require('../../plugins');

/**
 * name: string;
 * description: string;
 * teacher: {
 *   name: string;
 *   email?: string;
 * };
 *
 * course: {
 *   name: string;
 *   code: string;
 * };
 *
 * download_url: string;
 * single_img: string;
 * filecode: string;
 * splash_img: string;
 * size: string;
 * length: string;
 * uploaded: string;
 * protected_embed: string;
 * protected_dl: string;
 */

const videoSchema = mongoose.Schema({
  uploadId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Upload',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  teacher: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Course',
  },
  download_url: {
    type: String,
    required: true,
    trim: true,
  },
  single_img: {
    type: String,
    required: true,
    trim: true,
  },
  filecode: {
    type: String,
    required: true,
    trim: true,
  },
  splash_img: {
    type: String,
    required: true,
    trim: true,
  },
  size: {
    type: String,
    required: true,
    trim: true,
  },
  length: {
    type: String,
    required: true,
    trim: true,
  },
  uploaded: {
    type: String,
    required: true,
    trim: true,
  },
  protected_embed: {
    type: String,
    required: true,
    trim: true,
  },
  protected_dl: {
    type: String,
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

videoSchema.plugin(toJSON);
videoSchema.plugin(paginate);

/**
 * Check if video name already is taken
 * @param {string} name
 * @param {ObjectId} excludeVideoId
 * @returns {Promise<boolean>}
 */
videoSchema.statics.isNameTaken = async function (name, excludeVideoId) {
  const video = await this.findOne({ title: name, _id: { $ne: excludeVideoId } });
  return !!video;
};

/**
 * @typedef Video
 */
const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
