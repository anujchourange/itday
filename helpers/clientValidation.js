const { check, validationResult } = require("express-validator");
exports.validateAddClient = [
  check("name")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("name field can not be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("name can not exceed 255 characters!")
    .bail(),
  check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("retainer_fee")
    .isNumeric()
    .bail()
    .custom((value) => {
      console.log(value, typeof value);
      if (isNaN(value)) {
        return Promise.reject("Value should be positive number");
      } else if (value < 0) {
        return Promise.reject("Value should be positive number");
      } else {
        return Promise.resolve(value);
      }
    }),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];

exports.validateUpdateClient = [
  check("name")
    .optional({ nullable: true })
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("name field can not be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("name can not exceed 255 characters!")
    .bail(),
  check("email")
    .optional({ nullable: true })
    .trim()
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  check("retainer_fee")
    .optional({ nullable: true })
    .isNumeric()
    .bail()
    .custom((value) => {
      console.log(value, typeof value);
      if (isNaN(value)) {
        return Promise.reject("Value should be positive number");
      } else if (value < 0) {
        return Promise.reject("Value should be positive number");
      } else {
        return Promise.resolve(value);
      }
    }),
  (req, res, next) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
