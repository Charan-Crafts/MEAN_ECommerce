const express = require('express');
const router = express.Router();

const authController = require("../controller/auth.controller")

const authMiddleware = require("../middleware/auth.middleware")

router.post("/register",authController.register)

router.post("/login",authController.login)

router.post("/logout",authController.logout)

router.post("/refresh-token",authController.refreshToken)

router.get("/me",authMiddleware,authController.getProfile)

module.exports = router;