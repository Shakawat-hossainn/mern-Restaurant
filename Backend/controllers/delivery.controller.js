import { DeliveryAddress } from "../models/delivery.model.js";
import { User } from "../models/user.model.js";
import errorHandler from "../utils/error.js";
import { Cart } from "../models/cart.model.js";

const deliveryAddress = async (req, res, next) => {
    const { userId } = req.user;
    const { firstName, lastName, city, country, address, phone, zipcode, cartItems } = req.body;

    if (!firstName || !lastName || !city || !country || !address || !phone || !zipcode || !cartItems || cartItems.length === 0) {
        return next(errorHandler(400, 'All fields are required'));
    }

    try {
        const deliveryAddress = new DeliveryAddress({
            ...req.body,
            userId,
        });

        await deliveryAddress.save();
        await deliveryAddress.populate("userId");
        await Cart.deleteMany({ userId });

        res.status(201).json({
            deliveryAddress
        });
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const getOrders = async (req, res, next) => {
    const { userId } = req.user;
    try {
        const orders = await DeliveryAddress.find({ userId }).populate('userId').sort({ createdAt: -1 }); 

        res.status(200).json({
            orders
        });
    } catch (error) {
        next(error);
    }
};
const getAllOrders = async (req, res, next) => {
    
    try {
        const orders = await DeliveryAddress.find().populate('userId').sort({ createdAt: -1 });
        
        res.status(200).json({
            orders
        });
    } catch (error) {
        next(error);
    }
};

const updateOrderStatus = async (req, res, next) => {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!status) {
        return next(errorHandler(400, 'Status is required'));
    }

    try {
        const order = await DeliveryAddress.findById(orderId);
        if (!order) {
            return next(errorHandler(404, 'Order not found'));
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: 'Order status updated successfully',
            order
        });
    } catch (error) {
        next(error);
    }
};


  


export { deliveryAddress, getOrders,getAllOrders,updateOrderStatus };
