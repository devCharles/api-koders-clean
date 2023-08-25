const bcryptjs = require("bcryptjs");

const saltRound = 10;

function encrypt(text) {
  return bcryptjs.hashSync(text, saltRound);
}

function verify(hash, text) {
  return bcryptjs.compareSync(text, hash);
}

module.exports = {
  encrypt,
  verify,
};
