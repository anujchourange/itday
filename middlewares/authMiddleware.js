const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    if (!req.headers["authorization"])
      return next(createHttpError.Unauthorized());
    const token = req.headers["authorization"].split(" ")[1]; // req.headers["authorization"] = '[0]Bearer [1]token'

    JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        next(createHttpError.Unauthorized(message));
        req.userId = undefined;
        return;
      }
      req.userId = payload.aud;
      next();
    });
  } catch (error) {
    next(error);
  }
};
