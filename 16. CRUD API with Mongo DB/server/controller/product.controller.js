const Product = require('../models/product.model')

const getProduct = async (req, res) => {
    try{
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    }
    catch(err){
        res.status(500)
        throw new Error("Internal Server Error")
    }
}

const createProduct =  async (req, res) => {
    try{
        const product = await Product.create(req.body)
        res.status(201).json(product)
    }
    catch(err){
        res.status(500)
        throw new Error("Internal Server Error")
    }
}

const deleteProduct = async (req, res, next) => {
    try{
        const { id } = req.params

        const deletedProduct = await Product.findByIdAndDelete(id)
        if(!deletedProduct) {
            return res.status(404).json({message: "Product not found!"})
        }
        res.status(200).json({message: "Product deleted successfully"})
    }
    catch(err){
        res.status(500)
        const error = new Error("Internal Server Error")
        error.statusCode = 500
        next(error)
    }
}

const updateProduct = async (req, res, next) => {
    try{
        const { id } = req.params
        const data = req.body

        const updatedProduct = await Product.findByIdAndUpdate(id, data, {new: true})
        if(!updatedProduct) {
            return res.status(404).json({message: "Product not found!"})
        }
        res.status(200).json(updatedProduct)
    }
    catch(err){
        res.status(500)
        const error = new Error("Internal Server Error")
        error.statusCode = 500
        next(error)
    }
}

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({})
        res.status(200).json(products)
    }
    catch(err){
        res.status(500)
        throw new Error("Internal Server Error")
    }
}

module.exports = {
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    createProduct
}
