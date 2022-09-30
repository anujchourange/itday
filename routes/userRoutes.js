const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");

// validate and sanitize user data
const {
  validateRegister,
  validateLogin,
} = require("../helpers/userValidation");

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

module.exports = router;
