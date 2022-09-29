const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
const createHttpError = require("http-errors");

const User = require("../models/userModel");

/**
 * @desc Register New User
 * @route POST /api/v1/register
 * @access public
 **/
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const doesExist = await User.findOne({ email });

    if (doesExist) throw createHttpError.Conflict(`email already exists`);

    const user = await User.create({ name, email, password });

    console.log(user.id);

    const token = await signToken(user.id);

    if (user) {
      res.status(201).json({
        name: user.name,
        email: user.email,
        token,
      });
    } else {
      res.status(400);
      throw createHttpError.BadRequest();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Login User and return the jwt token
 * @route POST /api/v1/login
 * @response accessToken
 * @access public
 **/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw createHttpError.NotFound(`User not registered`);

    const isMatch = await user.comparePassword(password);

    if (!isMatch)
      throw createHttpError.Unauthorized("email or password is not valid");

    console.log(user.id);

    const token = await signToken(user.id);

    res.status(200).send({
      name: user.name,
      email: user.email,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// helper function
// sign access token
const signToken = (userId) => {
  return new Promise((resolve, reject) => {
    const payload = {};
    const secret = process.env.JWT_SECRET;
    const options = {
      expiresIn: "30d",
      issuer: "anuj.com",
      audience: userId,
    };
    JWT.sign(payload, secret, options, (err, token) => {
      if (err) {
        console.error(err.message);
        return reject(createHttpError.InternalServerError());
      }
      resolve(token);
    });
  });
};
