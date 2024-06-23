import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const connectionString = process.env.MONGO_URI

const connectDB =()=>{
    try {
        mongoose.connect(connectionString).then(()=>console.log('Connected to database')).catch((error)=>console.log(error))
    } catch (error) {
        console.log(error)
        
    }
} 

export default connectDB;


