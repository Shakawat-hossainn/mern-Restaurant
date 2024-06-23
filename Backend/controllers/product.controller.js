import { Product } from "../models/product.model.js"
import errorHandler from "../utils/error.js"


const createProduct = async(req,res,next) =>{
   //console.log(req.user)
    // if(!req.user.isAdmin){
    //     next(errorHandler(401,"You are not allowed to create a product"))

    // }
    let image_filename = `${req.file.filename}`
    if(!req.body.title || !req.body.description){
        next(errorHandler(400,"All fields are required"))
    }

    const newProduct = new Product({
        ...req.body,
        image:image_filename,
        // userId:req.user.userId
    })
    try {
        const product = await newProduct.save()
        res.status(201).json({
           product
        })
        
    } catch (error) {
        next(error)
        
    }


}
const getProduct = async(req, res,next) => {
    try {
        const products = await Product.find()
        res.status(200).json({
            products
        })
    } catch (error) {
        next(error)
    }

}
const deleteProduct = async(req, res,next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId)
        res.status(200).json({
            product
        })
    } catch (error) {
        next(error)
    }
}

 


export {createProduct,getProduct,deleteProduct}