require("dotenv").config()

const express = require("express")

const app = express()

const cookieParser = require("cookie-parser")

const cors = require("cors")

// DB connection

const connectDB = require("./config/mongoDB.config")



connectDB()

// Request Logger Middleware

const requestLogger = require("./middleware/request.logger.middleware")



app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"]
}))

app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use(cookieParser())

app.use(requestLogger)

const port = process.env.PORT 

app.get("/health",(req,res)=>{
    console.log("Health check endpoint hit");
    return res.status(200).json({
        success:true,
        message:"Server is running"
    })
})

const authRoutes = require("./routes/auth.routes")

app.use("/api/auth",authRoutes)
// Error handler Middleware

const {errorHandlerLogger} = require("./middleware/errorHandler.middleware")

app.use(errorHandlerLogger)

app.listen(port,()=>{
    console.log(`Server is running on PORT ${port}`)
})