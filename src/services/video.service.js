const httpStatus = require('http-status');
const { Video } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a video
 * @param {Object} videoBody
 * @returns {Promise<Video>}
 * @throws {ApiError}
 */
const createVideo = async (videoBody) => {
  if (await Video.isNameTaken(videoBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  const video = await Video.create(videoBody);
  return video;
};

/**
 * Get video by id
 * @param {ObjectId} id
 * @returns {Promise<Video>}
 * @throws {ApiError}
 */
const getVideoById = async (id) => {
  const video = await Video.findById(id);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  return video;
};

/**
 * Get video by name
 * @param {string} name
 * @returns {Promise<Video>}
 * @throws {ApiError}
 */
const getVideoByName = async (name) => {
  const video = await Video.findOne({ name });
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  return video;
};

/**
 * Update video by id
 * @param {ObjectId} videoId
 * @param {Object} updateBody
 * @returns {Promise<Video>}
 * @throws {ApiError}
 */
const updateVideoById = async (videoId, updateBody) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  if (updateBody.name && (await Video.isNameTaken(updateBody.name, videoId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }

  Object.assign(video, updateBody);
  await video.save();
  return video;
};

/**
 * Delete video by id
 * @param {ObjectId} videoId
 * @returns {Promise<Video>}
 * @throws {ApiError}
 */
const deleteVideoById = async (videoId) => {
  const video = await getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  await video.remove();
  return video;
};

const getRecentUploads = async () => {
  const videos = await Video.find().sort({ createdAt: -1 });
  if (!videos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Videos not found');
  }
  return videos;
};

module.exports = {
  createVideo,
  getVideoById,
  getVideoByName,
  updateVideoById,
  deleteVideoById,
  getRecentUploads,
};
