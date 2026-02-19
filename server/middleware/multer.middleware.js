const multer = require("multer")

const fs = require("fs")

const path = require("path")

const uploadPath = path.join(__dirname,"../uploads/temp")

if(!fs.existsSync(uploadPath)){
    fs.mkdirSync(uploadPath,{recursive:true})
}

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,uploadPath)
    },
    filename:(req,file,cb)=>{
        const fileName = `${Date.now()}-${file.originalname}`
        cb(null,fileName)
    }
})

const upload = multer({storage})

module.exports = upload