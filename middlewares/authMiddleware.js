const createHttpError = require("http-errors");
const JWT = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  if (!req.headers["authorization"])
    return next(createHttpError.Unauthorized());
  const token = req.headers["authorization"].split(" ")[1]; // req.headers["authorization"] = '[0]Bearer [1]token'

  JWT.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) {
      const message =
        err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
      next(createHttpError.Unauthorized(message));
    }
    req.userId = payload;
    next();
  });
};

module.exports = verifyToken;
