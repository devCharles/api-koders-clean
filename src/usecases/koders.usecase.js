const Koder = require("../models/koders.model");

// GET /koders
async function getAll() {
  const allKoders = await Koder.find();
  return allKoders;
}

// POST /koders
async function create(koderData) {
  // creamos un objeto koder en memoria
  // const newKoder = await new Koder(koderData);

  // validamos el koder
  // const validationError = newKoder.validateSync();
  // console.log("isValidKoder: ", validationError);

  // lanzamos un error en caso de no ser valido
  // if (validationError) {
  //   throw new Error("Invalid koder");
  // }

  // guardamos en caso de ser valido
  // await newKoder.save();

  const newKoder = await Koder.create(koderData);
  return newKoder;
}

// GET /koders/:id
async function getById(id) {
  // const koder = await Koder.find({ _id: id });
  const koderExists = await Koder.exists({ _id: id });

  if (!koderExists) {
    throw new Error(`Koder id:${id} does not exits`);
  }

  const koder = await Koder.findById(id);

  return koder;
}

module.exports = {
  getAll,
  create,
  getById,
};
