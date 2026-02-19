const cloudinary = require("cloudinary").v2

const fs = require("fs")

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const uploadToCloudinary =async (filePath)=>{

    const response = await cloudinary.uploader.upload(filePath,{
        folder:"MEAN_ECOMMERCE"
    })

    fs.unlinkSync(filePath);

    return {
        public_id:response.public_id,
        url:response.secure_url
    }
}

module.exports = {uploadToCloudinary}

