const Category = require("../models/category");
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");
const Product = require("../models/product")


//CRUD (not in order)

//READ
//Display category list 
exports.category_list = asyncHandler(async function(req,res,next){
    const categories = await Category.find({},"name" ).exec();

    res.render("category_list", {
        title:"Our Selections",
        categories:categories,
    })
});

//Display info on specific category
exports.category_detail = asyncHandler(async (req,res,next) => {
    const categories = await Category.findById(req.params.id, "name description").exec();
    res.render("category_detail", {category:categories})
});


//CREATE
//Create category form on GET
exports.category_create_get = asyncHandler(async (req,res,next) => {
    res.render("category_create", {title:'Create new Category'});
})

//Create category on post 
exports.category_create_post = [
    body("name", "Category must contain at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("description", "Description must contain at least 3 characters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),

    asyncHandler(async function(req,res,next){
        const errors = validationResult(req);

        const newCat = new Category({name:req.body.name,description:req.body.description});

        if(!errors.isEmpty()){
            res.render("category_create", {
                title: "Create new Category",
                category:newCat,
                errors:errors.array(),
            });
        } else {
            const categoryExists = await Category.findOne({name:req.body.name}).exec();
            if(categoryExists){
                res.redirect(categoryExists.url)
            } else {
               await newCat.save();
               res.redirect(newCat.url);
            }
        }
    })

]


//DELETE
//Delete form on GET
exports.category_delete_get = asyncHandler(async (req,res,next) => {
    const [categories,products] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({category:req.params.id}, "name description").exec(),
    ])

    if(categories === null){
        res.redirect("/shop/categories")
    }

    res.render("category_delete", {
        title:"Delete Category",
        categories:categories,
        products:products
    })
});

//Delete on Post
exports.category_delete_post = asyncHandler(async (req,res,next) => {
    const [categories,products] = await Promise.all([
        Category.findById(req.params.id).exec(),
        Product.find({category:req.params.id}, "name description").exec(),
    ])
    if(products.length>0){
        res.render("category_delete", {
            title: "Delete Category",
            categories:categories,
            products:products,
        })
        return;
    } else {
        await Category.findByIdAndDelete(req.body.id);
        res.redirect("/shop/categories")
    }
});

//UPDATE
//Update form on Get
exports.category_update_get = asyncHandler(async (req,res,next) => {
    const category = await Category.findById(req.params.id).populate("name description").exec();

   
      if(!category){
       const err = new Error("Category not found")
       err.status=404;
       return next(err);
      }
   
      res.render("category_create", {
       title: "Update Category",
       category:category,
      })
})

//Update on Post 
exports.category_update_post = [
    body("name", "Category must contain at least 3 characters")
    .trim()
    .isLength({min:3})
    .escape(),
    body("description", "Description must contain at least 3 characters")
    .trim()
    .isLength({min:3,max:100})
    .escape(),

    asyncHandler(async function(req,res,next){
        const errors = validationResult(req);

        const updatedCatData = {
            name:req.body.name,
            description:req.body.description,
        };

        if(!errors.isEmpty()){
            res.render("category_create", {
                title: "Update new Category",
                category:updatedCatData,
                errors:errors.array(),
            });
        } else {
            const categoryExists = await Category.findOne(updatedCatData).exec();
            if(categoryExists){
                res.redirect(categoryExists.url)
            } else {
                const updatedCat = await Category.findByIdAndUpdate(req.params.id,updatedCatData,{});
               res.redirect(updatedCat.url);
            }
        }
    })

]

