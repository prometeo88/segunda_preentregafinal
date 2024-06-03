const express = require("express");
const router = express.Router();
const fs_ = require("fs");

const ProductManager = require("../../dao/filesystem/productManager.js");
const productManager = new ProductManager("./productos.json");

router.get('/', async (req, res) => {
    try {
        let products = await productManager.getProducts();
        let limit = parseInt(req.query.limit);

        if (!isNaN(limit) && limit > 0) {
            products = products.slice(0, limit);
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    await productManager.loadProducts();
    const product = productManager.getProductById(productId);
    if (product) {
      res.json(product);
    }
  } catch (error) {
    console.log("ERROR AL ENCONTRAR PRODUCTO");
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const addedProduct = await productManager.addProduct(newProduct);
    res.json(addedProduct);
  } catch (error) {
    console.log("Error al agregar producto:", error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updatedProduct = req.body;

    await productManager.loadProducts();
    const modifiedProduct = productManager.updateProduct(
      productId,
      updatedProduct
    );

    if (modifiedProduct) {
      res.json(modifiedProduct);
    }
  } catch (error) {
    console.log("Error al actualizar producto:", error);
    res.status(500).send("Error interno del servidor");
  }
});




module.exports = function(io) {
  router.delete("/:pid", async (req, res) => {
      try {
          const deletedProductId = parseInt(req.params.pid);
          console.log(deletedProductId)
          const deletedProduct = productManager.deleteProducts(deletedProductId);

          
         
          io.emit('productDeleted', deletedProductId);
          
          res.json(deletedProduct);
      } catch (error) {
          console.log("Error al eliminar productoasdsad", error);
          res.status(500).send("Error interno del servidor");
      }
  });

  return router;
};
