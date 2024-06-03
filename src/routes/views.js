const express = require("express");
const router = express.Router();
const fs_ = require("fs");

const ProductManager = require("../dao/filesystem/productManager.js");
const productManager = new ProductManager("./productos.json");

router.get("/", async (req, res) => {
  try {
    const loadProducts = await productManager.loadProducts();
    console.log(loadProducts);
    res.render("home", { loadProducts });
  } catch (error) {
    console.log("Error al cargar archivos:", error);
    res.status(500).send("Error al cargar archivos");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const loadRTProducts = await productManager.loadProducts();
    res.render("realTimeProducts", { loadRTProducts });
  } catch (error) {
    console.log("Error al cargar archivos:", error);
    res.status(500).send("Error al cargar archivos");
  }
});

router.get('/api/messages', (req, res) => {
  res.render('messages');
});

module.exports = router;
