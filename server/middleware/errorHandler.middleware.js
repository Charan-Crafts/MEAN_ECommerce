const logger = require("../config/logger.config")

class AppError extends Error{

    constructor(message,statusCode){
        super(message)
        this.statusCode = statusCode
        this.isOperational = true

        Error.captureStackTrace(this,this.constructor)
    }
}

const errorHandlerLogger = (errr,req,res,next)=>{

    logger.error({
        message:errr.message,
        stack:errr.stack,
        statusCode:errr.statusCode,
        method:req.method,
        url:req.originalUrl
    })

    return res.status(errr.statusCode || 500).json({
        success:false,
        messaage: errr.message || "Internal Server Error"
    })
}

module.exports = {
    AppError,
    errorHandlerLogger
}