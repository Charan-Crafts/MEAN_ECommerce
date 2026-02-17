const mongoose = require("mongoose")


const connection = async()=>{
    try {

        const response = await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to MONGODB",response.connection.host);
        
    } catch (error) {
        console.error("Error connecting to MONGODB",error);

        process.exit(1)
    }
}

module.exports = connection;