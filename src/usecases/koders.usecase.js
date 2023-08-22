const Koder = require("../models/koders.model");

// GET /koders
async function getAll() {
  const allKoders = await Koder.find();
  return allKoders;
}

// POST /koders
async function create(koderData) {
  const newKoder = await Koder.create(koderData);
  return newKoder;
}

// GET /koders/:id
async function getById(id) {
  // const koder = await Koder.find({ _id: id });
  const koder = await Koder.findById(id);
  return koder;
}

module.exports = {
  getAll,
  create,
  getById,
};
