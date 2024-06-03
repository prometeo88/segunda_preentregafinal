const { json } = require("express");
const fs = require("fs");

class CartManager {
  constructor(filePath) {
    this.carts = [];
    this.nextId = 1;
    this.path = filePath;
  }

  generarIdUnica(){
    return Date.now().toString(36) + Math.random().toString(36).substring(2,5)
  }

  isIdCartDuplicate(id){
    return this.carts.some(cart => cart.id === id)
  }

  createCart(cart){ 
      if (this.isIdCartDuplicate(cart.id)) {
      console.log("ERROR: El carrito ya existe");
      return;
      }

      cart.id = this.generarIdUnica();
      cart.products = [];

      this.carts.push(cart)
      this.saveCart()

    }
    saveCart(){
      try {
        const data = JSON.stringify(this.carts,null,2);
        fs.writeFileSync(this.path,data);
        console.log("Carrito Guardado con exito")
        
      } catch (error) {
        console.log("ERROR: NO SE PUDO GUARDAR EL CARRITO")
        
      }
    }
    loadCart(){
      try {
        const data = fs.readFileSync(this.path,'utf8')
        this.carts = JSON.parse(data)
                
      } catch (error) {
        console.log("ERROR: NO SE PUDO CARGAR EL CARRITO")
        
      }
    }
    
  }



module.exports = CartManager;
