const Client = require("../models/clientModel");

exports.addClient = async (req, res, next) => {
  const { name, email, retainer_fee } = req.body;
};
