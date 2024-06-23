import mongoose from 'mongoose';


const DeliveryAddressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
       cartItems:{
          type:Array,
          required:true,
          default:[]
       },
        address: {
            type: String,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        city: {
            type: String,
            required: true,
        },
        country: {
            type: String,
            required: true,
        },
        zipcode: {
            type: Number,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            required: true,
            enum: ['Food Processing', 'Out For Delivery', 'Delivered'],
            default: 'Food Processing'
        }
    },{timestamps:true});

    
    export const DeliveryAddress = new mongoose.model("DeliveryAddress",DeliveryAddressSchema)