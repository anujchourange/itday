const { check, validationResult } = require("express-validator");
exports.options = [
  check("name")
    .exists()
    .bail()
    .trim()
    .escape()
    .not()
    .isEmpty()
    .withMessage("name field can not be empty!")
    .bail()
    .isLength({ max: 255 })
    .withMessage("name can not exceed 255 characters!")
    .bail(),
  check("password")
    .exists()
    .bail()
    .trim()
    .not()
    .isEmpty()
    .withMessage("password field can not be empty!")
    .bail()
    .isLength({ min: 6, max: 100 })
    .withMessage("Password must be at least 6 characters")
    .bail(),
  check("email")
    .exists()
    .bail()
    .trim()
    .isEmail()
    .normalizeEmail()
    .not()
    .isEmpty()
    .withMessage("Invalid email address!")
    .bail(),
  (req, res, next) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ errors: errors.array() });
    next();
  },
];
