const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { ApiError } = require('../utils/ApiError');
const { unitService } = require('../services');

/**
 * Adds new empty unit
 * @param {Object<Unit>} unitData
 * @returns {Promise<ObjectId>}
 * @throws {ApiError}
 */
const addEmptyUnit = catchAsync(async (req, res) => {
  const unit = await unitService.addEmptyUnit(req.body);
  res.status(httpStatus.CREATED).send(unit);
});

const updateUnit = catchAsync(async (req, res) => {
  // find unit by id
  const unit = await unitService.getUnitById(req.params.id);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  // update unit
  const updatedUnit = await unitService.updateUnit(req.body.unit);
  res.status(httpStatus.OK).send(updatedUnit);
});

const deleteUnit = catchAsync(async (req, res) => {
  const unit = await unitService.getUnitById(req.params.id);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  const isSuccess = await unitService.deleteUnit(unit);
  if (!isSuccess) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Unit not deleted');
  }
  res.status(httpStatus.OK).send();
});

const getUnitById = catchAsync(async (req, res) => {
  const unit = await unitService.getUnitById(req.params.id);
  if (!unit) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Unit not found');
  }
  res.status(httpStatus.OK).send(unit);
});

module.exports = {
  addEmptyUnit,
  updateUnit,
  deleteUnit,
  getUnitById,
};
