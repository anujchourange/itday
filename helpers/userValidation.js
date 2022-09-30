const { check, validationResult } = require("express-validator");
const { options } = require("./options");

exports.validateRegister = [...options];

exports.validateLogin = [...options.slice(1)];
