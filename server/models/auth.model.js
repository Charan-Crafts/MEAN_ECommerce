const mongoose = require("mongoose")

const bcryptjs = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    refreshToken:{
        type:String
    }
},{timestamps:true})

userSchema.pre("save",async function (){

    if(!this.isModified("password")){
        return
    }

    const salt = await bcryptjs.genSalt(10)

    const hashedPassword = await bcryptjs.hash(this.password,salt)

    this.password = hashedPassword;

    
})

const user = mongoose.model("user",userSchema)

module.exports = user;
