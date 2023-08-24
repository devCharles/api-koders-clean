const Koder = require("../models/koders.model");

// GET /koders
async function getAll() {
  const allKoders = await Koder.find();
  return allKoders;
}

// POST /koders
async function create(koderData) {
  // Para validar usamos el mismo create
  // Lanza un objeto de error con propiedades:
  // name: 'ValidationError'
  // message: 'el error' error legible
  const newKoder = await Koder.create(koderData);
  return newKoder;
}

// GET /koders/:id
async function getById(id) {
  // Validar id antes de buscarlo con mongoose.isValidObjectId()
  //
  const koder = await Koder.findById(id);
  return koder;
}

module.exports = {
  getAll,
  create,
  getById,
};
