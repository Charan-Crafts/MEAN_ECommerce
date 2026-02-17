const userModel = require("../models/auth.model")

const {AppError} = require("../middleware/errorHandler.middleware")

const jwt = require("jsonwebtoken")

exports.tokenGenerator = (payload)=>{

    const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})

    const refreshToken = jwt.sign(payload,process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    
    return {accessToken,refreshToken}
}

exports.register = async(req,res,next)=>{

    try {

        const {name,email,password,role} = req.body;

        if(!name || !email || !password){
            return next(new AppError("Name ,email and password are required",400))
        }

        const existingUser = await userModel.findOne({
            $or:[
                {email},
                {name}
            ]
        })

        if(existingUser){
            return next(new AppError("User with this email or name already Exists",400))
        }

        const newUser = await userModel.create({
            name,email,password,role
        })

        const payload = {
            id:newUser._id,
            name:newUser.name,
            email:newUser.email,
            role:newUser.role
        }

        const {accessToken,refreshToken} = this.tokenGenerator(payload)

        newUser.refreshToken = refreshToken;

        await newUser.save()

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })

        res.cookie("accessToken",accessToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })
        

        return res.status(201).json({
            success:true,
            message:"user registered successfully",
            data:payload,
            token:accessToken
        })
        
    } catch (error) {
        next(error)
    }
}

exports.login = async(req,res,next)=>{

    try {

        const {email,password} = req.body;

        if(!email || !password){
            return next(new AppError("Email and password are required",400))
        }

        const existingUser = await userModel.findOne({email})

        if(!existingUser){
            return next(new AppError("Invalid email or password",401))
        }

        const isPasswordMatch = await existingUser.comparePassword(password)

        if(!isPasswordMatch){
            return next(new AppError("Invalid email or password",401))
        }

        const payload = {
            id:existingUser._id,
            name:existingUser.name,
            email:existingUser.email,
            role:existingUser.role
        }

        const {accessToken,refreshToken} = this.tokenGenerator(payload)

        res.cookie("refreshToken",refreshToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })

        res.cookie('accessToken',accessToken,{
            httpOnly:true,
            sameSite:"strict",
            secure:false
        })

        existingUser.refreshToken = refreshToken;

        await existingUser.save()

        return res.staus(200).json({
            success:true,
            message:"User logged in successfully",
            data:payload,
            token:accessToken
        })
        
    } catch (error) {
        next(error)
    }
}

exports.logout = async(req,res,next)=>{

    try {

        res.clearCookie("accessToken")
        res.clearCookie("refreshToken")

        return res.status(200).json({
            success:true,
            message:"User logged out successfully"
        })
        
    } catch (error) {
        next(error)
    }
}