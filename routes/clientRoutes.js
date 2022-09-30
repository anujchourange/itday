const express = require("express");
const {
  addClient,
  getClients,
  getClient,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");
const verifyToken = require("../middlewares/authMiddleware");
const router = express.Router();

// import  validateClient data
const {
  validateAddClient,
  validateUpdateClient,
} = require("../helpers/clientValidation");

router
  .route("/clients")
  .post(verifyToken, validateAddClient, addClient)
  .get(verifyToken, getClients);

router
  .route("/clients/:id")
  .get(verifyToken, getClient)
  .put(verifyToken, validateUpdateClient, updateClient)
  .delete(verifyToken, deleteClient);

module.exports = router;
