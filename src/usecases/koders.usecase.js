const mongoose = require("mongoose");
const Koder = require("../models/koders.model");
const createError = require("http-errors");
const bcrypt = require("../lib/bcrypt");

// GET /koders
async function getAll() {
  const allKoders = await Koder.find();
  return allKoders;
}

// POST /koders
async function create(koderData) {
  // falta validar si el koder existe
  const existingKoder = await Koder.findOne({ email: koderData.email });

  if (existingKoder) {
    throw new createError(412, "email already registered");
  }

  const passwordRegex = new RegExp(
    "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-.+]).{8,}$"
  );

  if (!passwordRegex.test(koderData.password)) {
    throw new createError(400, "Password too weak");
  }

  // guardar password encriptado
  koderData.password = bcrypt.encrypt(koderData.password);

  const newKoder = await Koder.create(koderData);
  return newKoder;
}

// GET /koders/:id
async function getById(id) {
  // Validar id antes de buscarlo con mongoose.isValidObjectId()
  if (!mongoose.isValidObjectId(id)) {
    // throw new Error("Invalid id");
    throw new createError(400, "Invalid id");
  }

  const koder = await Koder.findById(id);

  if (!koder) {
    throw new createError(404, "Koder not found");
  }

  return koder;
}

async function deleteById(id) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }
  const koderDeleted = await Koder.findByIdAndDelete(id); // findByIdAndDelete(id)

  if (!koderDeleted) {
    throw new createError(404, "Koder not found");
  }

  return koderDeleted;
}

async function updateById(id, dataToUpdate) {
  if (!mongoose.isValidObjectId(id)) {
    throw new createError(400, "Invalid id");
  }

  const koderUpdated = await Koder.findByIdAndUpdate(id, dataToUpdate, {
    new: true,
    runValidators: true,
  });

  if (!koderUpdated) {
    throw new createError(404, "Koder not found");
  }

  return koderUpdated;
}

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  updateById,
};
