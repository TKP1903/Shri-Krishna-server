const axios = require('axios');
const { cdn } = require('../config/config');
const { ApiError } = require('../utils/ApiError');
/**
 * get the secure upload url
 * expires and needs to be regenerated every time
 * @returns {Promise<string>}
 */
const getUploadUrl = async () => {
  try {
    const uploadUrl = await axios.get(`${cdn.url}/upload/server?key=${cdn.key}`);
    return uploadUrl;
  } catch (err) {
    return null;
  }
};

/**
 * upload the file to CDN
 * @param {string} uploadUrl
 * @param {FromData<file>} file
 * @returns {Promise<data>}
 */
const upload = async (uploadUrl, file) => {
  try {
    const res = await axios.post(uploadUrl, file, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    if (res.status === 200) {
      return res.data;
    }
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * change file name in CDN
 * @param {string} fileCode
 * @param {string} newName
 * @returns {Promise<data>}
 */
const rename = async (fileCode, newName) => {
  const url = new URL(`${cdn.url}/file/rename`);
  url.searchParams.append('key', cdn.key);
  url.searchParams.append('file_code', fileCode);
  url.searchParams.append('title', newName);
  try {
    const res = await axios.get(url.toString());
    if (res.status !== 200) {
      throw new ApiError(res.status, res.message);
    }
    if (!res.data && Number(res.data.status) !== 200) {
      throw new ApiError(res.data.status, res.data.msg);
    }
    return res.data;
  } catch (err) {
    throw new Error(err.message);
  }
};

/**
 * Mark the file as __deleted__ in CDN
 * ! file will still remain in CDN
 * @param {string} fileCode
 * @returns {Promise<boolean>}
 */
const deleteFile = async (fileCode) => {
  try {
    // since there is no delete endpoint, we will rename the file to __deleted__
    const res = await rename(fileCode, '__deleted__');
    return true;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = {
  getUploadUrl,
  upload,
  rename,
  deleteFile,
};
