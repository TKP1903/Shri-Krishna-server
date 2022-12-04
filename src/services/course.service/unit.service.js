const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const { Unit } = require('../../models');

const emptyUnit = {
  name: '',
  s_no: 0,
  chapters: [],
};

/**
 * Create a unit
 * @param {Object} unitBody
 * @returns {Promise<Unit>}
 */
const createUnit = async (course, unitBody) => {
  const data = { ...emptyUnit, ...unitBody };
  const newUnit = Unit.create(data);
  course.units.push(newUnit);
  await course.save();
  return newUnit;
};

/**
 * Update unit
 * @param {Object} oldUnit
 * @param {Object} updateBody
 * @returns {Promise<Unit>}
 */
const updateUnit = async (oldUnit, updateBody) => {
  Object.assign(oldUnit, updateBody);
  await oldUnit.save();
};

/**
 * Delete unit
 * @param {Object} unit
 */
const deleteUnit = async (unit) => {
  await unit.remove();
};

/**
 * Get unit by id
 * @param {ObjectId} id
 * @returns {Promise<Unit>}
 */
const getUnitById = async (id) => {
  const unit = await Unit.findById(id);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  return unit;
};

module.exports = {
  createUnit,
  updateUnit,
  deleteUnit,
  getUnitById,
};
