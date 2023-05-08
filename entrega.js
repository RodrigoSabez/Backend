const fs = require("fs");

import express  from "express";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/products', async (req, res) => {
  try {
    const {limit} = req.query;
    const products = await productManager.getProducts();
    if(limit) {
      res.status(200).json(product.slice(0, limit));
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(200).json({message: 'hubo un error'});
  }
})

app.get('/products/:id', async (req, res) => {
  try {
    const {id} = req.params;
    const product = await productManager.getProductsById(parseInt(id));
    if (!product) {
      return req.status(404).json({error:'product not found'});
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({message:'hubo un error'});
  }
} );

app.listen(PORT,() => {
  console.log(`listening on port ${port}`);
});




class ProductManager {
    constructor(path) {
      this.path = 'productos.json';
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

    async readData() {
      try{
        if(fs.existsSync(this.path)){
        const data = await fs.promises.readFile(this.path,'utf-8');
        return JSON.parse(data);
        }
        await fs.promises.readFile(this.path,JSON.stringify([]));
        return[];
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async addProduct(product){
      try{ 
      let data = await this.readData();

        let checkCode = this.readData.find((p) => p.code === product.code);
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
        data.push(newProduct);
        this.id++;


        const productsString = JSON.stringify(data, null, 2);
        await fs.promises.writeFile(this.path, productsString);

        return 'Product added';
      } catch (error){
        throw new error (e);
      }
    }

    async getProducts(){
      try{
        return this.products;
      } catch (error){
        throw new error (e);
      }
    }

    async getProductsById(id){
      try{ 
        let found = data.find((p) => p.id === id);
        if (!found) {
          return 'Not found';
        }
        return found;
      } catch (error){
        throw new error (e);
      }
    }

    async updateproduct(updateId, dataUpdate){
      try { 
      const productsIndex = data.findIndex(element = element.i===updateId)

      if(productsIndex === -1){
        return {error: "el producto no se encontro"}
      } else{
        if(typeof(dataUpdate) ==='object'){
          data[productsIndex] = {dataUpdate , id: updateId}
          const productsString = JSON.stringify(this.products, null, 2)
          await fs.promises.writeFile(this.path, productsString);

          return "Update product"
        }else {
          return "error: the object has not been sent"
        }
      } 
    } catch (error){
      throw new error (e);
    }
  }

    async deleteProduct(deleteId){
      try{ 
      const productIndex = data.findIndex(element = element.i=== deleteId)
      if(productIndex >= 0){
        let products = data.filter((item) => item.id !== deleteId)
        const productsString = JSON.stringify(products, null, 2)
        await fs.promises.writeFile(this.path, productsString);
      
        return "eliminated object"
      }else{
        return "product with no ID"
      }
    } catch (error){
      throw new error (e);
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

  const asyncFn = async () => {

  }
  asyncFn()


  console.log(productManager.updateproduct(1,product3))