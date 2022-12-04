// miscllaneous routes
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const userController = require('../../controllers/user.controller');

const router = express.Router();

router.route('/checkLogin/:userId').get(auth(''), validate(userValidation.getUser), userController.doNothing);

router.route('/hasAccess/:userId').post(auth(''), validate(userValidation.hasRights), userController.hasRights);

module.exports = router;
