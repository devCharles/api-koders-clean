const mongoose = require("mongoose");
const Practice = require("../models/practice.model");
const Koder = require("../models/koders.model");
const createError = require("http-errors");

async function getAll(titleFilter, koder) {
  const filters = {};

  if (titleFilter) {
    filters.title = new RegExp(titleFilter, "i");
  }

  if (koder && mongoose.isValidObjectId(koder)) {
    filters.koder = koder;
  }

  return Practice.find(filters).populate("koder");
}

async function create(practiceData) {
  // validar que el id del koder tiene un formato de id
  if (!mongoose.isValidObjectId(practiceData.koder)) {
    throw new createError(400, "Invalid koder id");
  }

  // validar que el koder exista
  const koder = await Koder.findById(practiceData.koder);

  if (!koder) {
    throw new createError(404, "Koder not found");
  }

  return Practice.create(practiceData);
}

async function getById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const practice = await Practice.findById(id).populate("koder");

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

  if (dataToUpdate.koder) {
    // throw new createError(445, "Koder should not be updated");
    if (!mongoose.isValidObjectId(dataToUpdate.koder)) {
      throw new createError(400, "Invalid koder id");
    }

    const koder = await Koder.findById(dataToUpdate.koder);
    if (!koder) {
      throw new createError(404, "Koder not found");
    }
  }

  dataToUpdate.updated = new Date();

  const practiceUpdated = await Practice.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
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
