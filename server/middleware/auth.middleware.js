const jwt = require("jsonwebtoken")

const {AppError} = require("./errorHandler.middleware")

const authMiddleware = (req,res,next)=>{

    let token ;

    try {

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]
        }

        else if (req.cookies && req.cookies.accessToken){
            token = req.cookies.accessToken
        }

        if(!token){
            return next(new AppError("Unauthorized , No Token Provided",401))
        }

        const decode = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)

        req.user = decode
        
        next()
        
    } catch (error) {
        next(error)
    }
}

module.exports = authMiddleware;