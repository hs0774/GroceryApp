const Product = require("../models/product");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { validationResult,body } = require("express-validator");


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
    const categories = await Category.find().exec();
    res.render("product_create", {
        title:'Create new Product',
        categories:categories,
    });
})

//Display product create form on POST
exports.product_create_post = [
    body("name", "Must be at least 3 characters and at most 30")
        .trim()
        .isLength({ min: 3, max: 30 })
        .escape(),
    body("description", "Must be at least 3 characters and at most 100")
        .trim()
        .isLength({ min: 3, max: 100 })
        .escape(),
    body("category", "Category must be selected")
        .trim()
        .notEmpty()
        .escape(),
    body("price", "Must have a price")
        .trim()
        .isFloat({ min: 0 })
        .withMessage("Must have a price at or above 0")
        .escape(),
    body("quantity", "Must have an amount")
        .trim()
        .isFloat({ min: 0 })
        .withMessage("Must have an amount at or above 0")
        .escape(),
    body("productNumber", "Must be filled")
        .trim()
        .isLength({ min: 3, max: 15 })
        .escape(),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);

        const newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            productNumber: req.body.productNumber,
        });

        if (!errors.isEmpty()) {
            const categories = await Category.find().exec();
            res.render("product_create", {
                title: 'Create new Product',
                categories: categories,
                product: newProduct,
                errors: errors.array()
            });
        } else {
            await newProduct.save();
            res.redirect(newProduct.url);
        }
    }),
];


//Display product delete form on GET
exports.product_delete_get = asyncHandler(async (req,res,next) => {
    const product = await Product.findById(req.params.id);
    
    if(!product){
        return res.redirect("/shop/products")
    }

    res.render("product_delete", {
        title: "Delete Product",
        product:product,
    })
    
})

//Display product delete form on POST
exports.product_delete_post = asyncHandler(async (req,res,next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.redirect("/shop/products");
    }
    await Product.findByIdAndDelete(req.body.id);
    res.redirect("/shop/products")
})

//Display product update form on get 
exports.product_update_get = asyncHandler(async function(req,res,next) {
    res.send("NOT IMPLEMENTED: Product update GET");
})

//Display prdopcut form on on post 
exports.product_update_post = asyncHandler(async function(req,res,next) {
    res.send("NOT IMPLEMENTED: Product update Post ");
})