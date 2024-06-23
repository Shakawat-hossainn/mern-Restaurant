import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true,
            default:false
        },
        photo:{
            type:String,
            default:'https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'
        }
      
    }
    ,{timestamps:true});
    userSchema.index({ email: 1}, { unique: true })

    export const User = mongoose.model('User',userSchema);
