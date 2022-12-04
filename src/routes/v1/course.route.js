const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');

const courseController = require('../../controllers/course.controller');
const courseValidation = require('../../validations/course.validation');