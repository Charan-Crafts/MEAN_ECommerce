const productService = require("../models/product.model")

const {AppError} = require("../middleware/errorHandler.middleware")

const productData = require("../utils/product.seed")

const cloudinaryConfig = require("../config/cloudinary.config")


const bulkUploadProducts = async(req,res,next)=>{

    try {

        const user = req.user;

        // console.log("User in bulk upload:", user);

        if(!user ||user.role !== "admin"){
            return next(new AppError("Unauthorized access",401))
        }

        const updatedProducts = productData.map(product =>{
            return {...product,createdBy:user.id}
        })

        const products = await productService.insertMany(updatedProducts)

        if(!products ){
            return next(new AppError("Failed to upload products",500))
        }

        return res.status(201).json({
            success:true,
            message:"Products uploaded successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

const getAllProducts = async(req,res,next)=>{

    const {page = 1,limit = 10 , name} = req.query;

    try {

        const end = page*limit;

        const start  = (page-1)*limit;

        let filter = {
            status:"active"
        }

        if(name){
            filter.name = {
                $regex:name,
                $options:"i"
            }
        }

        const products = await productService.find(filter).skip(start).limit(limit).sort({createdAt:-1})

        const totalCount = await productService.countDocuments(filter)

        if(!products || products.length === 0){
            return next(new AppError("No products found",404))
        }

        return res.status(200).json({
            success:true,
            message:"Products retrieved successfully",
            totalProducts:totalCount,
            currentPage:page,
            totalPages : Math.ceil(totalCount/limit),
            data:products
        })
        
    } catch (error) {
        next(error)
    }
}

const uploadImages = async(req,res,next)=>{

    try {

        const user = req.user;

        if(!user || user.role !=="admin"){
            return next(new AppError("Unauthorized access",401))
        }

        const file = req.file;

        if(!file){
            return next(new AppError("No file uploaded",400))
        }

        const result = await cloudinaryConfig.uploadToCloudinary(file.path);

        return res.status(200).json({
            success:true,
            message:"Image uploaded successfully",
            data:result
        })
        
    } catch (error) {
        
    }
}

const createNewProduct = async(req,res,next)=>{

    try {
        
        const user = req.user;

        if(!user || user.role !== "admin"){
            return next(new AppError("Unauthorized access",401))
        }

        const {name ,description,price,images,category,stock , brand} = req.body;

        const newProduct = await productService.create({
            name,description,price,images,category,stock,brand,createdBy:user.id
        })

        return res.status(201).json({
            success:true,
            message:"Product created successfully",
            data:newProduct
        })
    } catch (error) {
        next(error)
    }
}

const softDeleteProduct = async(req,res,next)=>{

    try {

        const user = req.user;

        if(!user || user.role !== "admin"){
            return next(new AppError("Unauthorized access",401))
        }

        const {id} = req.params;

        const product = await productService.findById(id)

        if(user.id.toString() !== product.createdBy.toString()){
            return next(new AppError("You are not authorized to delete this product",403))
        }

        if(!product){
            return next(new AppError("Product not found",404))
        }

        product.status = "inactive"

        await product.save();

        return res.status(200).json({
            success:true,
            message:"Product deleted successfully"
        })
        
    } catch (error) {
        next(error)
    }
}

const updateProduct = async(req,res,next)=>{

    try {

        const user = req.user;

        if(!user || user.role !== "admin"){
            return next(new AppError("Unauthorized access",401))
        }
        const {id} = req.params;
        const {name ,description,price,images,category,stock , brand} = req.body;

        const product = await productService.findById(id)

        if(user.id.toString() !== product.createdBy.toString()){
            return next(new AppError("You are not authorized to update this product",403))
        }

        if(!product){
            return next(new AppError("Product not found",404))
        }

        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.images = images || product.images;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.brand = brand || product.brand;
        await product.save();

        return res.status(200).json({
            success:true,
            message:"Product updated successfully",
            data:product
        })
        
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllProducts,
    bulkUploadProducts,
    uploadImages,
    createNewProduct,
    softDeleteProduct,
    updateProduct
}