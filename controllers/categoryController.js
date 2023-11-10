const Category = require("../models/category");
const asyncHandler = require("express-async-handler")


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
    res.render("category_detail", {
        category:categories,
    })
});


//CREATE
//Create category form on GET
exports.category_create_get = asyncHandler(async (req,res,next) => {
    res.render("category_create", {title:'Create new Category'});
})

//Create category on post 
exports.category_create_post = asyncHandler(async (req,res,next) => {
    res.send('POST create form not implemented');
})


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

