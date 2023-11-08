const Product = require("../models/product");
const asyncHandler = require("express-async-handler")

//Display list of all Products
exports.product_list = asyncHandler(async function(req,res,next){
    res.send('coming soon');
})

//Display detail page for specific product
exports.product_detail = asyncHandler(async (req,res,next) => {
    res.send(`coming soon product id ${req.params.id}`);
})

//Display product create form on GET
exports.product_create_get = asyncHandler(async function(req,res,next){
    res.send('form coming soon')
})

//Display product create form on POST
exports.product_create_post = asyncHandler(async function(req,res,next){
    res.send('form coming soon')
})

//Display product delete form on GET
exports.product_delete_get = asyncHandler(async (req,res,next) => {
    res.send('form delete GET coming soon ')
})

//Display product delete form on POST
exports.product_delete_post = asyncHandler(async (req,res,next) => {
    res.send('form delete POST coming soon ')
})

//Display product update form on get 
exports.product_update_get = asyncHandler(async function(req,res,next) {
    res.send("NOT IMPLEMENTED: Product update GET");
})

//Display prdopcut form on on post 
exports.product_update_post = asyncHandler(async function(req,res,next) {
    res.send("NOT IMPLEMENTED: Product update Post ");
})