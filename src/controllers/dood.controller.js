const httpStatus = require('http-status');
const { doodService } = require('../services');
const { ApiError } = require('../utils/ApiError');

const getUploadUrl = async (req, res) => {
  try {
    const uploadUrl = await doodService.getUploadUrl();
    res.status(httpStatus.OK).send(uploadUrl.data);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const upload = async (req, res) => {
  try {
    const data = await doodService.upload(req.body.uploadUrl, req.file);
    if (!data && data.status !== 200) {
      throw new Error('Upload failed');
    }
    res.status(httpStatus.OK).send(data);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

const rename = async (req, res) => {
  try {
    const data = await doodService.rename(req.body.fileCode, req.body.newName);
    if (!data && data.status !== 200) {
      throw new ApiError(httpStatus['401_NAME'], data.msg || 'Rename failed!');
    }
    res.status(httpStatus.OK).send(data);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
};

module.exports = {
  getUploadUrl,
  upload,
  rename,
};
