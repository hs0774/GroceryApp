const mongoose = require("mongoose");

const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{ type:String,required:true, minLength:3,maxLength:30},
    description:{ type:String,required:true, minLength:3,maxLength:100},
    category: {type:Schema.Types.ObjectId, ref:"Category",required: true},
    price: {type:Number, min:0,required:true},
    quantity:{type:Number, min:0,required:true},
    productNumber:{ type:String,required:true, minLength:3,maxLength:30},
})

ProductSchema.virtual('url').get(function() {
    return `/shop/product/${this._id}`
});

module.exports = mongoose.model('Product',ProductSchema);

