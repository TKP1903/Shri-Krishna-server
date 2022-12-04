const Joi = require('joi');
const { objectId } = require('./custom.validation');

/**
 * Validation for a empty course entry without subject
 * @type {Joi.ObjectSchema}
 * @example
 * {
 */

const courseEmptyEntry = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string(),
    code: Joi.string().required(),
    price: Joi.number()
      .required()
      .custom((value, helpers) => {
        if (value <= 0) {
          return helpers.error(`${value} is not a valid price`);
        }
        return value;
      }),
  }),
};

const addSubject = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
  }),
  body: Joi.object().keys({
    subjectId: Joi.string().custom(objectId).required(),
  }),
};

const removeSubject = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
    subjectId: Joi.string().custom(objectId).required(),
  }),
};

const deleteCourse = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
  }),
};

const getCourseById = {
  params: Joi.object().keys({
    courseId: Joi.string().custom(objectId).required(),
  }),
};

const getCourses = {
  query: Joi.object().keys({
    name: Joi.string(),
    price: Joi.array().items(Joi.number()).length(2, 'Price must be an array of 2 numbers'),
    code: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

module.exports = {
  courseEmptyEntry,
  addSubject,
  removeSubject,
  deleteCourse,
  getCourseById,
  getCourses,
};
