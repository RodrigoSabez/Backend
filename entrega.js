const fs = require("fs");

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = [];
      this.id=1

      if(fs.existsSync(path)){
        const productString = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productString);
        this.products = products;
      } else{
        fs.fileWriteSync(path, "[]");
        const productString = fs.readFileSync(this.path, "utf-8");
        const products = JSON.parse(productString);
        this.products = products;
      }
    }



    addProduct(product){
        let checkCode = this.products.find((p) => p.code === product.code);
        if (checkCode) {
          // throw new Error('This code already exists');
          return 'This code already exists';
        }
        if (
          !product.title ||
          !product.description ||
          !product.price ||
          !product.thumbnail ||
          !product.code ||
          !product.stock
        ) {
          // throw new Error('Fields missing');
          return 'Fields missing';
        }
        let newProduct = { ...product, id: this.id };
        this.products.push(newProduct);
        this.id++;


        const productsString = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, productsString);

        return 'Product added';
    }

    getProducts(){
        return this.products;
    }

    getProductsById(id){
        let found = this.products.find((p) => p.id === id);
        if (!found) {
          return 'Not found';
        }
        return found;
    }

    updateproduct(updateId, dataUpdate){
      const productsIndex = this.products.findIndex(element = element.i===updateId)

      if(productsIndex === -1){
        return {error: "el producto no se encontro"}
      } else{
        if(typeof(dataUpdate) ==='object'){
          this.products[productsIndex] = {dataUpdate , id: updateId}
          const productsString = JSON.stringify(this.products, null, 2)
          fs.writeFileSync(this.path, productsString);

          return "Update product"
        }else {
          return "error: the object has not been sent"
        }
      } 
    }

    deleteProduct(deleteId){
      const productIndex = this.products.findIndex(element = element.i=== deleteId)
      if(productIndex >= 0){
        let products = this.products.filter((item) => item.id !== deleteId)
        const productsString = JSON.stringify(products, null, 2)
        fs.writeFileSync(this.path, productsString);
      
        return "eliminated object"
      }else{
        return "product with no ID"
      }
}    

}

let product = {
    title: "coca cola",
    description: "bebida gasificada sabor cola",
    price: 300,
    thumbnail:"https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fdiaonline.supermercadosdia.com.ar%2Fgaseosa-coca-cola-sabor-original-15-lts-16861%2Fp&psig=AOvVaw3gUYOTGEyUMSYSvHA7-_8k&ust=1681854136918000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNiZroXxsf4CFQAAAAAdAAAAABAE",
    code:"a1",
    stock: 100,
}

let product2 = {
    title: "galletas de avena",
    description: "alimento hecho a base de avena",
    price: 200,
    thumbnail:"https://www.google.com.ar/url?sa=i&url=https%3A%2F%2Fquaker.lat%2Fmx%2Fproductos-quaker%2Fbarras-y-galletas%2Fquaker-galleta-de-avena-frutos-rojos%2F&psig=AOvVaw2L4YDUzXteg8bhCLQZhREq&ust=1681854230927000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCOiQwbLxsf4CFQAAAAAdAAAAABAI",
    code: "b1",
    stock: 200,
  };

  let product3 = {
    title: "arroz",
    description: "arroz blanco",
    price: 50,
    thumbnail: "sin foto",
    code: "c1",
    stock: 300,
  };
  
  const productManager = new ProductManager("productos.json");

  console.log(productManager.updateproduct(1,product3))