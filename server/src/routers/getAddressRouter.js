const express = require("express");
const getAddressRouter = express.Router();
const getAddress = require("../controllers/getAddressController");

getAddressRouter.get("/", getAddress);

module.exports = getAddressRouter;
