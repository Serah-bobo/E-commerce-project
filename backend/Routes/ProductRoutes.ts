import express from 'express'
import { getAllProducts,CreateProduct,getProductById,updateProduct,deleteProduct} from '../Controllers/ProductController'
import { AuthMiddleware,authorizeAdmin } from '../Middleware/AuthMiddleware'

const router=express.Router()
router.route("/")
.get(getAllProducts)
.post(AuthMiddleware,authorizeAdmin,CreateProduct)

//by id
router.route("/:id")
.get(getProductById)
.patch(AuthMiddleware,authorizeAdmin,updateProduct)
.delete(AuthMiddleware,authorizeAdmin,deleteProduct)

export default router;