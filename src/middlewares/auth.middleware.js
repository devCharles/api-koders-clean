const createError = require("http-errors");
const jwt = require("../lib/jwt");

function auth(request, response, next) {
  try {
    const { authorization } = request.headers;

    if (!authorization) {
      throw new createError(401, "token required");
    }

    const token = authorization.replace("Bearer ", "");
    const payload = jwt.verify(token);

    if (!payload) {
      throw new createError(401, "could not verify token");
    }

    next();
  } catch (error) {
    response.status(401);
    response.json({
      message: "unauthorized",
      error: error.message,
    });
  }
}

module.exports = auth;
