const express = require('express');
const cartsModel = require('../dao/models/carts.model.js');
const productsModel = require('../dao/models/products.model.js');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let carts = await cartsModel.find();
        res.json({ result: "success", payload: carts });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        let cart = await cartsModel.findById(cartId);
        if (cart) {
            res.json({ result: "success", payload: cart });
        } else {
            res.status(404).json({ result: "error", message: "Cart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const newCart = req.body;
        const cart = new cartsModel(newCart);
        await cart.save();
        res.status(201).json({ result: "success", payload: cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
});  

router.put('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const updatedCart = req.body;
        let cart = await cartsModel.findByIdAndUpdate(cartId, updatedCart, { new: true });
        if (cart) {
            res.json({ result: "success", payload: cart });
        } else {
            res.status(404).json({ result: "error", message: "Cart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
});    

router.delete('/:cid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        let cart = await cartsModel.findByIdAndDelete(cartId);
        if (cart) {
            res.json({ result: "success", payload: cart });
        } else {
            res.status(404).json({ result: "error", message: "Cart not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
});    

router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const productId =  req.params.pid
        let cart = await cartsModel.findById(cartId);

        if (cart) {
            // Longitud original del array de productos
            const originalLength = cart.product.length;
            
            // Filtrar el producto con el ID proporcionado
            cart.product = cart.product.filter(product => product._id.toString() !== productId);
            
            // Verificar si se eliminó algún producto
            if (cart.product.length < originalLength) {
                await cart.save();
                res.json({ result: "success producto eliminado", payload: cart });
        } else {
            res.status(404).json({ result: "error", message: "Producto no encontrado para eliminar" });
        }
    }} catch (error) {
        console.log(error);
        res.status(500).json({ result: "error", message: error.message });
    }
}); 

module.exports = router;