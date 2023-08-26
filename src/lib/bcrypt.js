const bcryptjs = require("bcryptjs");

const saltRounds = 10;

function encrypt(text) {
  return bcryptjs.hashSync(text, saltRounds);
}

function verify(hash, text) {
  return bcryptjs.compareSync(text, hash);
}

module.exports = {
  encrypt,
  verify,
};
