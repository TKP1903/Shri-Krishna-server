const httpStatus = require('http-status');
const { Course } = require('../../models');
const ApiError = require('../../utils/ApiError');

/**
 * Create a course
 * @param {Object} courseBody
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const createCourse = async (courseBody) => {
  if (await Course.isNameTaken(courseBody.name)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  return Course.create(courseBody);
};

/**
 * get course by id
 * @param {ObjectId} id
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const getCourseById = async (id) => {
  return Course.findById(id);
};

/**
 * get course by name
 * @param {string} name
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const getCourseByName = async (name) => {
  return Course.findOne({ name });
};

/**
 * Add video to course
 * @param {ObjectId} courseId
 * @param {ObjectId} videoId
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const addVideoToCourse = async (courseId, videoId) => {
  const course = await getCourseById(courseId);
  course.videos.push(videoId);
  await course.save();
  return course;
};

/**
 * delete video from course
 * @param {ObjectId} courseId
 * @param {ObjectId} videoId
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const deleteVideoFromCourse = async (courseId, videoId) => {
  const course = await getCourseById(courseId);
  course.videos.pull(videoId);
  await course.save();
  return course;
};

/**
 * Update course by id
 * @param {ObjectId} courseId
 * @param {Object} updateBody
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const updateCourseById = async (courseId, updateBody) => {
  const course = await getCourseById(courseId);
  if (updateBody.name && (await Course.isNameTaken(updateBody.name, courseId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
  Object.assign(course, updateBody);
  await course.save();
  return course;
};

/**
 * Delete course by id
 * @param {ObjectId} courseId
 * @returns {Promise<Course>}
 * @throws {ApiError}
 */
const deleteCourseById = async (courseId) => {
  const course = await getCourseById(courseId);
  await course.remove();
  return course;
};

/**
 * Query for courses
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} options.populate - Paths which should be populated with other documents
 * @returns {Promise<QueryResult>}
 * @throws {ApiError}
 */
const queryCourses = async (filter, options) => {
  const courses = await Course.paginate(filter, options);
  return courses;
};

const addUnitToCourse = async (courseId, unitId) => {
  const course = await getCourseById(courseId);
  course.units.push(unitId);
  await course.save();
};

module.exports = {
  createCourse,
  getCourseById,
  getCourseByName,
  addVideoToCourse,
  deleteVideoFromCourse,
  updateCourseById,
  deleteCourseById,
  queryCourses,
  addUnitToCourse,
};
