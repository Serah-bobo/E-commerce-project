import express from 'express'
import { getAllProducts,CreateProduct,getProductById,updateProduct,deleteProduct} from '../Controllers/ProductController'
import { AuthMiddleware,authorizeAdmin } from '../Middleware/AuthMiddleware'
import upload from '../config/upload'
const router=express.Router()

router.route("/")
.get(getAllProducts)
.post(AuthMiddleware,authorizeAdmin, upload.single("image"), CreateProduct)

//by id
router.route("/:id")
.get(getProductById)
.patch(AuthMiddleware,authorizeAdmin,upload.single("image"),updateProduct)
.delete(AuthMiddleware,authorizeAdmin,deleteProduct)

export default router;