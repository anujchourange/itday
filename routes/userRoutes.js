const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/userController");
const isJson = require("../middlewares/isJsonMiddleware");
// validate and sanitize user data
const {
  validateRegister,
  validateLogin,
} = require("../helpers/userValidation");

router.post("/register", isJson, validateRegister, register);
router.post("/login", isJson, validateLogin, login);

module.exports = router;
