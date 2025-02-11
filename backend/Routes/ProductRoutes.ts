import express from 'express'
import { getAllProducts,CreateProduct,getProductById,updateProduct,deleteProduct } from '../Controllers/ProductController'
import { AuthMiddleware } from '../Middleware/AuthMiddleware'
const router=express.Router()
router.route("/")
.get(getAllProducts)
.post(AuthMiddleware,CreateProduct)

//by id
router.route("/:id")
.get(getProductById)
.patch(AuthMiddleware,updateProduct)
.delete(AuthMiddleware,deleteProduct)

export default router;