const Product = require("../models/product");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");


// home page 
exports.index = asyncHandler(async (req,res,next) => {
    const [products,categories] = await Promise.all([
        Product.countDocuments({}).exec(),
        Category.countDocuments({}).exec(),
    ])
    res.render('index',{
        title: 'Groceria-Home',
        product_count:products,
        category_count: categories,
    })
})

//Display list of all Products
exports.product_list = asyncHandler(async function(req,res,next){
    const products = await Product.find({},"name price category" ).populate("category").exec();

    res.render("product_list", {
        title:"Our products",
        products:products,
    })
})

//Display detail page for specific product
exports.product_detail = asyncHandler(async (req,res,next) => {
    const products = await Product.findById(req.params.id).populate("category").exec();
    res.render("product_detail", {
        product:products,
    })
})

//Display product create form on GET
exports.product_create_get = asyncHandler(async function(req,res,next){
    const categories = await Category.find.exec();
    res.render("product_create",{
        category:categories,
    })
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