const express = require("express");
const router = express.Router();
const fs_ = require("fs");


const productsModel = require("../dao/models/products.model.js");


router.get("/", async (req, res) => {
  try {
    const loadProducts = await productsModel.find();
    console.log(loadProducts);
    res.render("home", { loadProducts });
  } catch (error) {
    console.log("Error al cargar archivos:", error);
    res.status(500).send("Error al cargar archivos");
  }
});


router.get('/api/messages', (req, res) => {
  res.render('messages');
});

module.exports = router;
