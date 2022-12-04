const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { Subject } = require('../../models');

const isSubjectNameTaken = async (name, course) => {
  // find subject with same name in course
  const subject = await course.subjects.find((sub) => sub.name === name);
  return !!subject;
};

const getSubjectById = async (id) => {
  const subject = await Subject.findById(id).populate('units').populate('chapters');
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return subject;
};

/**
 * Create a subject
 * @param {Object} subjectBody
 * @param {Object} course
 * @returns {Promise<Subject>}
 * @throws {ApiError}
 */
const createSubject = async (course, subjectBody) => {
  if (await isSubjectNameTaken(subjectBody.name, course)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Subject name already taken');
  }
  const subject = await Subject.create(subjectBody);
  course.subjects.push(subject);
  await course.save();
  return subject;
};

module.exports = {
  isSubjectNameTaken,
  getSubjectById,
  createSubject,
};
