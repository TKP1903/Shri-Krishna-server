const Joi = require('joi');
const { objectId } = require('./custom.validation');

const VideoEntry = Joi.object({
  title: Joi.string().required(),
  description: Joi.string(),
  teacher: Joi.string().custom(objectId),
  course: Joi.string().custom(objectId),
  download_url: Joi.string().required(),
  protected_embed: Joi.string().required(),
  protected_dl: Joi.string().required(),
  filecode: Joi.string().required(),
  single_img: Joi.string(),
  splash_img: Joi.string(),
  size: Joi.string(),
  length: Joi.string(),
  uploaded: Joi.string(),
});

const createVideo = {
  body: VideoEntry,
};

const getVideo = {
  params: Joi.object({
    videoId: Joi.string().custom(objectId),
  }),
};

const deleteVideo = {
  params: Joi.object({
    videoId: Joi.string().required().custom(objectId),
  }),
};

const updateVideo = {
  params: Joi.object({
    videoId: Joi.string().required().custom(objectId),
  }),
  body: VideoEntry,
};

module.exports = {
  createVideo,
  getVideo,
  updateVideo,
  deleteVideo,
};
