#! /usr/bin/env node
require('dotenv').config();
console.log(
    'This script populates some test itemsto your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/GroceryApp?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Product = require("./models/product");
  const Category = require("./models/category");
  
  const products = [];
  const categories = [];
  
  const mongoose = require("mongoose");
 const category = require('./models/category');
  mongoose.set("strictQuery", false);
  
  const mongoDB = process.env.MONGODB_URI;
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createProducts();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(index, name,description) {
    if(name.length > 20 || description.length>100) {
        console.log(`Error: Name for category '${name}' exceeds maximum allowed length of 15 and ${description}, 100.`);
        return;
    }
    const newCategory = new Category({ name: name, description:description });
    await newCategory.save();
    categories[index] = newCategory;
    console.log(`Added category: ${name}`);
  }
  
  async function ProductCreate(index, name, description, category, price, quantity,productNumber) {
    if (description.length > 100) {
        console.log(`Error: Description for product '${name}' exceeds maximum allowed length of 100.`);
        return;
      }
    const productDetail = {
      name: name,
      description: description,
      category: category,
      price :price,
      quantity:quantity,
      productNumber:productNumber,
    };
  
    const product = new Product(productDetail);
    await product.save();
    products[index] = product;
    console.log(`Added product: ${name}`);
  }

  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Dairy","Dairy: Milk, cheese, yogurt - rich in calcium and protein."),
      categoryCreate(1, "Meat","Meat: Beef, chicken, pork - excellent source of protein."),
      categoryCreate(2, "Bread","Bread: Staple made from flour, water, and yeast."),
      categoryCreate(3, "Produce","Produce: Fresh fruits and veggies - packed with nutrients."),
      categoryCreate(4, "Canned Goods","Canned Goods: Preserved vegetables, fruits, soups in cans."),
    ]);
  }
  
  async function createProducts() {
    console.log("Adding authors");
    await Promise.all([
      ProductCreate(0, "Ribeye", "A prime cut of beef known for its exceptional tenderness, rich marbling, and robust, beefy flavor", categories[1], 17.99,15,"9781473211896"),
      ProductCreate(1, "Milk", "A nutritious dairy product, rich in essential nutrients and versatility in cooking and beverages", categories[0], 3.99,25,"9780756411336"),
      ProductCreate(2, "Bread", "White bread known for its soft texture,making it a popular choice for sandwiches", categories[2], 5.99,30,"9782765379504"),
      ProductCreate(3, "Broccoli", "Broccoli is a nutritious green vegetable prized for its high vitamin and fiber content", categories[3], 3.99,24,"9785745479528"),
      ProductCreate(4, "Baked Beans", "A flavorful dish made from cooked navy beans, sweetened with a tomato-based sauce.", categories[4], 2.99,5,"9789993335204"),
    ]);
  }
  