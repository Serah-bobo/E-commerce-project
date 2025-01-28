import express from 'express'
import { getAllProducts,CreateProduct,getProductById,updateProduct,deleteProduct } from '../Controllers/ProductController'
const router=express.Router()
router.route("/")
.get(getAllProducts)
.post(CreateProduct)

//by id
router.route("/:id")
.get(getProductById)
.patch(updateProduct)
.delete(deleteProduct)

export default router;