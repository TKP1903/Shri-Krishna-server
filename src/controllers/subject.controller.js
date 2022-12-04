const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/ApiError');
const { subjectService } = require('../services');

const emptySubject = {
  name: '',
  units: [],
};

/**
 * Adds new empty subject
 * @param {Object<Subject>} subjectData
 * @returns {Promise<ObjectId>}
 * @throws {ApiError}
 */
const addEmptySubject = catchAsync(async (subjectData) => {
  const data = { ...emptySubject, ...subjectData };
  const subject = subjectService.addEmptySubject(data);
  return subject;
});

const updateSubject = catchAsync(async (subjectData) => {
  const subject = subjectService.updateSubject(subjectData);
  return subject;
});

const deleteSubject = catchAsync(async (subjectData) => {
  const subject = subjectService.deleteSubject(subjectData);
  return subject;
});

const getSubjectById = catchAsync(async (subjectId) => {
  const subject = subjectService.getSubjectById(subjectId);
  if (!subject) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Subject not found');
  }
  return subject;
});

module.exports = {
  addEmptySubject,
  updateSubject,
  deleteSubject,
  getSubjectById,
};
