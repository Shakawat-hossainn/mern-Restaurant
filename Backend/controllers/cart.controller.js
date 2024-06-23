import {Cart} from '../models/cart.model.js'
import {User} from'../models/user.model.js'
import { Product } from '../models/product.model.js'
const addToCart = async(req, res,next) => {
    // console.log(req.user)
   const {userId} = req.user
   const {productId,quantity} = req.body
   try {
    
       const newCartItem = new Cart({userId, productId, quantity})
       await newCartItem.save()
       await newCartItem.populate('userId');
        await newCartItem.populate('productId');
       res.status(201).json({
           newCartItem
       })
   } catch (error) {
    next(error)
    
   }

}
const getCart=async(req,res,next) => {
    //console.log(req.user)
    const {userId} = req.user
    try {
        const cart = await Cart.find({userId}).populate('userId').populate('productId');
       
        res.status(200).json({
            cart
        })
    } catch (error) {
        next(error)
    }
}
const deleteCart = async(req, res,next) => {
    try {
        const product = await Cart.findByIdAndDelete(req.params.cartId)
        res.status(200).json({
            product
        })
    } catch (error) {
        next(error)
    }
}
const updateCartItemQuantity = async (req, res) => {
    const { id } = req.params;
    const { quantity } = req.body;
  
    try {
      const cartItem = await Cart.findById(id);
  
      if (!cartItem) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
  
      cartItem.quantity = quantity;
      await cartItem.save();
  
      res.status(200).json(cartItem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

export {addToCart,getCart,deleteCart,updateCartItemQuantity}