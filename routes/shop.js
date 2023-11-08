const express = require("express");
const router = express.Router();

//Require controller modules
const product_controller = require("../controllers/productController");
const category_controller = require("../controllers/categoryController");

//Product Routes 

//shop home page 
router.get("/",product_controller.index);

//Get request for created a product. must come before routes
// that display product (uses id)
router.get("/product/create", product_controller.product_create_get);

//Post request for creating product
router.post("/product/create", product_controller.product_create_post);

//Get request to delete book 
router.get("/product/:id/create",product_controller.product_delete_get);

//Post request to delete book 
router.post("/product/:id/create",product_controller.product_delete_post);

//Get request to updatebook
router.get("/product/:id/update", product_controller.product_update_get);

//Post request to updatebook
router.post("/product/:id/update", product_controller.product_update_post);

//Get request for one product item
router.get("/product/:id", product_controller.product_detail);

//Get request for all items in the product line
router.get("/products", product_controller.product_list);

//Category Routes 
//Get request for creating author. note this must come before route
// for id (ie display)
router.get("/category/create",category_controller.category_create_get)
 
//Post request for creating category
router.post("/category/create", category_controller.category_create_post);

//Get request for deleting category
router.get("/category/:id/delete",category_controller.category_delete_get);

//Post request for deleting category
router.post("/category/:id/delete",category_controller.category_delete_post);

//Get request for updating category
router.get("/category/:id/update", category_controller.category_update_get);

//Post request for updating category
router.post("/category/:id/update",category_controller.category_update_post);

//Get request for one category
router.get("/category/:id",category_controller.category_detail);

//Get reuqest for all categories
router.get("/category",category_controller.category_list);