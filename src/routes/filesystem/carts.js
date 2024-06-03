const express = require("express");
const router = express.Router();

const CartManager = require("../cartManager.js");
const ProductManager = require("../productManager.js");
const productManager = new ProductManager("./productos.json");
const cartManager = new CartManager("./carrito.json");

router.post("/", (req, res) => {
  const cartData = req.body;
  cartManager.createCart(cartData);

  res.json(cartManager.carts);
});

router.post("/:cid/product/:pid", (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const cartId = req.params.cid;
    productManager.loadProducts();

    const product = productManager.products.find(product => product.id === productId);

    if (!product) {
      return res.status(400).json({ message: "Imposible agregar al carrito, PRODUCTO no encontrado" });
    }

    const cart = cartManager.carts.find(cart => cart.id === cartId);

    if (!cart) {
      return res.status(400).json({ message: "Imposible agregar al carrito, CARRITO no encontrado" });
    }

    const existingProductIndex = cart.products.findIndex(p => p.id === productId);

    if (existingProductIndex === -1) {
      
      cart.products.push({ id: productId, quantity: 1 });
    } else {
     
      cart.products[existingProductIndex].quantity++;
    }

    cartManager.saveCart();
    
    res.json(cart);

  } catch (error) {
    res.status(500).json({ message: "Error en servidor" });
  }
});

router.get("/:cid", (req, res) => {
  try {
    const cartId = req.params.cid;
    const cart = cartManager.carts.find((cart) => cart.id === cartId);

    if (!cart) {
      return res.status(400).json({ message: "Carrito no encontrado" });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error en servidor" });
  }
});

module.exports = router;
