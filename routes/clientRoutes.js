const express = require("express");
const router = express.Router();
const {
  addClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const verifyToken = require("../middlewares/authMiddleware");
const isJson = require("../middlewares/isJsonMiddleware");
// import  validateClient data
const {
  validateAddClient,
  validateUpdateClient,
} = require("../helpers/clientValidation");

router
  .route("/clients")
  .post(isJson, verifyToken, validateAddClient, addClient)
  .get(verifyToken, getClients);

router
  .route("/clients/:id")
  .get(verifyToken, getClient)
  .put(isJson, verifyToken, validateUpdateClient, updateClient)
  .delete(verifyToken, deleteClient);

module.exports = router;
