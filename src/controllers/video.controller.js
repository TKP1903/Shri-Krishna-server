const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { videoService, doodService } = require('../services');

const createVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  res.status(httpStatus.CREATED).send(video);
});

const recentUploads = catchAsync(async (req, res) => {
  const videos = await videoService.getRecentUploads();
  if (!videos) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Videos not found');
  }
  res.status(httpStatus.OK).send(videos);
});

const getVideo = catchAsync(async (req, res) => {
  const video = await videoService.getVideo(req.params.videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  res.status(httpStatus.OK).send(video);
});

const deleteVideo = catchAsync(async (req, res) => {
  const { videoId } = req.params;
  const video = await videoService.getVideoById(videoId);
  if (!video) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  // delete video from dood
  await doodService.deleteFile(video.filecode);
  // delete video from db
  await videoService.deleteVideoById(videoId);
  res.status(httpStatus.OK).send(video);
});

const updateVideo = catchAsync(async (req, res) => {
  const oldVideo = await videoService.getVideo(req.params.videoId);
  if (!oldVideo) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Video not found');
  }
  const newVideo = await videoService.updateVideo(oldVideo, req.body);
  res.status(httpStatus.OK).send(newVideo);
});

module.exports = {
  createVideo,
  recentUploads,
  getVideo,
  deleteVideo,
  updateVideo,
};
