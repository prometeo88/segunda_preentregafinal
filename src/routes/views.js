const express = require("express");
const router = express.Router();
const fs_ = require("fs");


const productsModel = require("../dao/models/products.model.js");


router.get('/', async (req, res) => {
  try {
      const { limit = 2, page = 1, sort, query } = req.query;

      
      let filter = {};
      if (query) {
          filter = { $or: [
              { title: { $regex: query, $options: 'i' } },
              { description: { $regex: query, $options: 'i' } },
              { category: { $regex: query, $options: 'i' } }
          ]};
      }


      const options = {
          limit: parseInt(limit, 10),
          page: parseInt(page, 10),
          sort: sort ? { title: parseInt(sort, 10) } : {}
           };
      

       const products = await productsModel.paginate(filter, options);
      products.prevLink = products.hasPrevPage ? `http://localhost:8080/?page=${products.prevPage}` : ``
      products.nextLink = products.hasNextPage ? `http://localhost:8080/?page=${products.nextPage}` : ``
      products.isValid = (page <= 0) || page > products.totalpages 
    

console.log(products)

      res.render('home', { products: products });
  } catch (error) {
      console.log(error);
      res.status(500).send({ result: "error", message: "Error interno del servidor al obtener los productos" });
  }
});


router.get('/api/messages', (req, res) => {
  res.render('messages');
});

module.exports = router;
