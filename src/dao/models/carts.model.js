const mongoose = require('mongoose');

const cartsCollection = "Carts"

const cartsSchema = new mongoose.Schema({
  product: [{
    product: { type: String},
    quantity:{ type: Number},
  }]
  });

  const cartsModel = mongoose.model(cartsCollection,cartsSchema)

  module.exports = cartsModel;
