const { model } = require('mongoose');

const { HoldingSchema } = require("../schemas/HoldingSchema");

const HoldingsModel = new model("Holding", HoldingSchema);

module.exports = HoldingsModel;