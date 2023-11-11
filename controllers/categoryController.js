const Category = require("../models/category");
const asyncHandler = require("express-async-handler")
const { body, validationResult } = require("express-validator");


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
    res.send("Get delete not implemented")
});

//Delete on Post
exports.category_delete_post = asyncHandler(async (req,res,next) => {
    res.send("Post delete not implemented")
});

//UPDATE
//Update form on Get
exports.category_update_get = asyncHandler(async (req,res,next) => {
    res.send('Get update not implemented')
})

//Update on Post 
exports.category_update_post = asyncHandler(async (req,res,next) => {
    res.send("Get update not implemented")
})

