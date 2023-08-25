const mongoose = require("mongoose");
const Practice = require("../models/practice.model");
const createError = require("http-errors");

async function getAll() {
  return Practice.find();
}

async function create(practiceData) {
  return Practice.create(practiceData);
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const practice = await Practice.findById(id);

  if (!practice) {
    throw new createError(404, "practice not found");
  }

  return practice;
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }
  const practiceDeleted = await Practice.findByIdAndDelete(id); // findByIdAndDelete(id)

  if (!practiceDeleted) {
    throw new createError(404, "practice not found");
  }

  return practiceDeleted;
}

async function updateById(id, dataToUpdate) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const practiceUpdated = await Practice.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    // runValidators: true,
  });

  if (!practiceUpdated) {
    throw new createError(404, "practice not found");
  }

  return practiceUpdated;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
