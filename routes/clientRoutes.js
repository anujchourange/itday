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

router
  .route("/clients")
  .post(verifyToken, addClient)
  .get(verifyToken, getClients);

router
  .route("/clients/:id")
  .get(verifyToken, getClient)
  .put(verifyToken, updateClient)
  .delete(verifyToken, deleteClient);

module.exports = router;
