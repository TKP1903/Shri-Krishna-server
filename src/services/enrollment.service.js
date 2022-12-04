const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { getUserById } = require('./user.service');
const { getCourseById } = require('./course.service');

/**
 * Add user to a course
 * @param {ObjectId} courseId
 * @param {ObjectId} userId
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const addUserToCourse = async (courseId, userId) => {
  const user = await getUserById(userId);
  const course = await getCourseById(courseId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  course.users.push(userId);
  await course.save();
  return course;
};

/**
 * Remove user from a course
 * @param {ObjectId} courseId
 * @param {ObjectId} userId
 * @returns {Promise<Course>}
 */
const removeUserFromCourse = async (courseId, userId) => {
  const user = await getUserById(userId);
  const course = await getCourseById(courseId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  course.users.pull(userId);
  await course.save();
  return course;
};

module.exports = {
  addUserToCourse,
  removeUserFromCourse,
};
