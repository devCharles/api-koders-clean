const jsonwebtoken = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;

function sign(payload = {}) {
  return jsonwebtoken.sign(payload, JWT_SECRET, { expiresIn: "2d" });
}

function verify(token) {
  return jsonwebtoken.verify(token, JWT_SECRET);
}

module.exports = {
  sign,
  verify,
};
