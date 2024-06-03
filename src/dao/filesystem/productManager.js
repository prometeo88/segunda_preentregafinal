const fs = require('fs')

class ProductManager {
    constructor(filePath) {
        this.products = [];
        this.nextId = 1;
        this.path = filePath
        this.loadProducts();
    }

    addProduct(product) {
        if (!this.isProductValid(product)) {
            console.log("ERROR: el producto no es valido");
            return;
        }
        if (this.isCodeDuplicate(product.code)) {
            console.log("ERROR: EL CODIGO DEL PRODUCTO YA ESTA EN USO");
            return;
        }

        product.id = this.nextId++;
        this.products.push(product);
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (product) {
            return product;
        } else {
            console.log("ERROR: PRODUCTO NO ENCONTRADO");
        }
    }

    isProductValid(product) {
        return (
            typeof product.title === "string" &&
            typeof product.description === "string" &&
            typeof product.code === "string" &&
            typeof product.price === "number" &&
            typeof product.status === "boolean" &&
            typeof product.category === "string" &&
            typeof product.stock === "number" &&
            (!product.thumbnail || Array.isArray(product.thumbnail))
           
        );
    }

    isCodeDuplicate(code) {
        return this.products.some(p => p.code === code);
    }

    updateProduct(id, updatedProduct) {
        
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
        this.products[index] = { ...this.products[index], ...updatedProduct };
        this.saveProducts();
            console.log("Producto actualizado correctamente.");
            return this.products[index]
        } else {
            console.log("ERROR: PRODUCTO NO ENCONTRADO");
        }
}
    deleteProducts(id){
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) { 
            this.products.splice(index, 1);
            this.saveProducts();
            console.log("Producto eliminado con exito");
            return this.products[index]
        }else {
            console.log(this.products)
            console.log("Error al eliminar el producto ")
        }

        }

    saveProducts(){
        try {
            const data = JSON.stringify(this.products,null,2);
            fs.writeFileSync(this.path,data);
            console.log("Productos guardados correctamente en archivo")
        } catch (err){
            console.log("ERRROR: NO SE PUDO GUARDAR LOS PRODUCTOS")
        }
    };
        
      loadProducts(){
        try {
            const data = fs.readFileSync(this.path,'utf8')
            this.products = JSON.parse(data)
            console.log("ARCHIVO PRODUCTOS CARGADO CORRECTAMENTE")
            return this.products
        } catch (err) {
            console.log("ERROR: NO SE PUDO LEER LOS PRODUCTOS")
        }
    }
        
}



module.exports = ProductManager;