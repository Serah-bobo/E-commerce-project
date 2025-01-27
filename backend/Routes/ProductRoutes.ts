import express from 'express'
import { getAllProducts,CreateProduct } from '../Controllers/ProductController'

const router=express.Router()
router.route("/")
.get(getAllProducts)
.post(CreateProduct)
export default router;