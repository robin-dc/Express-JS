const express = require("express")
const productRouter = express.Router()

const {
    getProduct,
    updateProduct,
    deleteProduct,
    getAllProducts,
    createProduct
} = require('../controller/product.controller')

productRouter.get('/:id', getProduct)

productRouter.patch('/:id', updateProduct)

productRouter.delete('/:id', deleteProduct)

productRouter.get('/', getAllProducts)

productRouter.post('/', createProduct)



module.exports = productRouter
