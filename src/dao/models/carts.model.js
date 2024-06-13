const mongoose = require('mongoose');

const cartsCollection = "Carts"

const cartsSchema = new mongoose.Schema({
  products: [{
    product: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Productos" 
    },
    quantity: { type: Number, required: true }  
  }]
});

  const cartsModel = mongoose.model(cartsCollection,cartsSchema)

  module.exports = cartsModel;
