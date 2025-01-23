import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
        },
        email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
        },
        fullName:{
        type:String,
        required:true,
        trim:true
        },
        avatar:{
        type:String, //cloudnary url
        required:true,
        },
        coverImage:{
        type:String,  //cloudnary url
        },
        watchHistory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
        },
        
        password:{
        type:String,
        required:[true,'PASSWORD is required']
        },
        refreshToken:{
        types:String
        }
        
        
        
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next();
    this.password=bcrypt.hash(this.password,10);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken=function(){   
       
    return jwt.sign(                          //jwt m sign method generates token
        {
            _id:this.id,
            email:this.email,
            username:this.username,
            fullName:this.fullName,
},
process.env.REFESH_TOKEN_SECRET,
{
 expiresIn:process.env.REFRESH_TOKEN_EXPIRY
}
)


}

export const User=mongoose.model('User',userSchema);

