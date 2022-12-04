// miscllaneous routes
const express = require('express');
const axios = require('axios');
const httpStatus = require('http-status');

const router = express.Router();

router.get('/uploadUrl', async (req, res) => {
  try {
    const uploadUrl = await axios.get('https://doodapi.com/api/upload/server?key=131652vem0pxjwggoj207x');
    res.status(httpStatus.OK).send(uploadUrl.data);
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err.message);
  }
});

module.exports = router;
