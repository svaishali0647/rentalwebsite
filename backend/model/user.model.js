import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },



    

        otp: String,
       otpExpiry: Date,
    
      isVerified: { type:Boolean, default:false }, // ✅ new field






    listing:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }],
    booking:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Listing"
    }]
    


},



{timestamps:true})

const User = mongoose.model("User",userSchema)

export default User

