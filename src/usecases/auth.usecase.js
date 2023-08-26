const createError = require("http-errors");
const bcrypt = require("../lib/bcrypt");
const jwt = require("../lib/jwt");
const Koder = require("../models/koders.model");

async function login(email, password) {
  const koder = await Koder.findOne({ email });

  if (!koder) {
    throw new createError(401, "Invalid data");
  }

  const isValidPassword = bcrypt.verify(koder.password, password);

  if (!isValidPassword) {
    throw new createError(401, "Invalid data");
  }

  // generar jwt
  return jwt.sign({ id: koder._id });
}

module.exports = {
  login,
};
