const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/ApiError');
const { courseService } = require('../services');

const emptyCourse = {
  name: '',
  description: '',
  code: '',
  price: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  subjects: [],
  teachers: [],
  students: [],
};

// TODO :: add await to all service calls
/**
 * Adds new empty course
 * @param {Object<Course>} courseData
 * @returns {Promise<ObjectId>}
 */
const addEmptyCourse = catchAsync(async (courseData) => {
  const data = { ...emptyCourse, ...courseData };
  const course = await courseService.addEmptyCourse(data);
  return course;
});

const updateCourse = catchAsync(async (courseData) => {
  const course = courseService.updateCourse(courseData);
  return course;
});

const deleteCourse = catchAsync(async (courseData) => {
  const course = courseService.deleteCourse(courseData);
  return course;
});

const getCourseById = catchAsync(async (courseId) => {
  const course = courseService.getCourseById(courseId);
  if (!course) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Course not found');
  }
  return course;
});

const getCourseByName = catchAsync(async (courseName) => {
  const course = courseService.getCourseByName(courseName);
  return course;
});

const getCourses = catchAsync(async (filter, options) => {
  const courses = courseService.getCourses(filter, options);
  return courses;
});

const addSubjectToCourse = catchAsync(async (courseId, subjectId) => {
  const course = courseService.addSubjectToCourse(courseId, subjectId);
  return course;
});

const removeSubjectFromCourse = catchAsync(async (courseId, subjectId) => {
  const course = courseService.removeSubjectFromCourse(courseId, subjectId);
  return course;
});

module.exports = {
  addEmptyCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  getCourseByName,
  getCourses,
  addSubjectToCourse,
  removeSubjectFromCourse,
};
