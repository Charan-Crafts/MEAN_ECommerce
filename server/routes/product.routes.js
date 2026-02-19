const express = require("express")

const router = express.Router()

const productController = require("../controller/product.controller")

const multerMiddleware = require("../middleware/multer.middleware")

const authMiddleware = require("../middleware/auth.middleware")

router.post("/bulk-upload",authMiddleware,productController.bulkUploadProducts)

router.post("/upload-image",authMiddleware,multerMiddleware.single("image"),productController.uploadImages)

router.post("/create",authMiddleware,productController.createNewProduct)

router.put("/update/:id",authMiddleware,productController.updateProduct)

router.delete("/delete/:id",authMiddleware,productController.softDeleteProduct)

router.get("/",productController.getAllProducts)

module.exports = router;