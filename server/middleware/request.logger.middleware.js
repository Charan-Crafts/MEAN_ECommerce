const logger = require("../config/logger.config")

const requestLogger = (req,res,next)=>{

    logger.info({
        method:req.method,
        url:req.originalUrl,
        ip:req.ip
    })
    next()
}
module.exports = requestLogger;