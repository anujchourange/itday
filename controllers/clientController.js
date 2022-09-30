const createHttpError = require("http-errors");
const Client = require("../models/clientModel");

/**
 * @desc Add New Client
 * @route POST /api/v1/clients
 * @access private
 **/
exports.addClient = async (req, res, next) => {
  try {
    const { name, email, retainer_fee } = req.body;
    // Check if client already exists
    // email should be unique per user
    const doesExist = await Client.find({ email, user: req.userId }); // returns array so we should check if its null
    if (doesExist.length)
      throw createHttpError.Conflict(`email of the client is already in use`);

    // add client if its new
    const client = await Client.create({
      name,
      email,
      retainer_fee,
      user: req.userId,
    });

    if (client) {
      client.__v = undefined; // removing unnecessary properties from response
      res.status(201).json(client);
    } else {
      res.status(400);
      throw createHttpError.BadRequest();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Fetch all clients
 * @route GET /api/v1/clients
 * @access private
 **/
exports.getClients = async (req, res, next) => {
  try {
    if (!req.userId) throw createHttpError.Unauthorized();

    const clients = await Client.find({ user: req.userId }).select("-__v");

    if (!clients.length) throw createHttpError.NotFound(`No clients found`);

    if (clients.length) {
      res.status(200).json(clients);
    } else {
      res.status(400);
      throw createHttpError.BadRequest();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Find a client by id
 * @route GET /api/v1/clients/:id
 * @access private
 **/
exports.getClient = async (req, res, next) => {
  try {
    if (!req.params.id) throw createHttpError.BadRequest("Invalid data");

    let client = await Client.findById(req.params.id).select("-__v");

    if (!client) throw createHttpError.NotFound(`No client found`);

    // make sure the logged in user matches with the client user
    if (client.user.toString() !== req.userId)
      throw createHttpError.Unauthorized("Unauthorized");

    if (client) {
      res.status(200).json(client);
    } else {
      res.status(400);
      throw createHttpError.BadRequest();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Update a client by id
 * @route PUT /api/v1/clients/:id
 * @access private
 **/
exports.updateClient = async (req, res, next) => {
  try {
    if (!req.params.id) throw createHttpError.BadRequest("Invalid data");

    let client = await Client.findById(req.params.id).select("-__v");

    if (!client) throw createHttpError.NotFound(`No client found`);

    // make sure the logged in user matches with the client user
    if (client.user.toString() !== req.userId)
      throw createHttpError.Unauthorized("Unauthorized");

    const updateClient = await Client.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ); // new:true option will return updated document

    if (updateClient) {
      res.status(200).json(updateClient);
    } else {
      res.status(400);
      throw createHttpError.BadRequest();
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Remove a client by id
 * @route DELETE /api/v1/clients/:id
 * @access private
 **/
exports.deleteClient = async (req, res, next) => {
  try {
    if (!req.params.id) throw createHttpError.BadRequest("Invalid data");

    let client = await Client.findById(req.params.id);

    if (!client) throw createHttpError.NotFound(`No client found`);

    // make sure the logged in user matches with the client user
    if (client.user.toString() !== req.userId)
      throw createHttpError.Unauthorized("Unauthorized");

    await client.remove();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};
