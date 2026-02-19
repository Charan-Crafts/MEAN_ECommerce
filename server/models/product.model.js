const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema({
    url:{
        type:String
    },
    public_id:{
        type:String
    }
},{_id:false})

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type:Number, required:true},
    stock:{type:Number,required:true},
    category:{type:String,required:true},
    images:[imageSchema],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    status:{type:String,enum:["active","inactive"],default:"active"},
    brand:{type:String,required:true},
    numberOfReviews:{type:Number,default:0},
    rating:{type:Number,default:0}
},{timestamps:true})

const productModel = mongoose.model("Product",productSchema)

module.exports = productModel;