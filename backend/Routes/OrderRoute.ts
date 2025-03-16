import {AuthMiddleware,authorizeAdmin} from "../Middleware/AuthMiddleware";
import { getAllOrders,createOrder,getOrderUsers,updateOrder,deleteOrder } from "../Controllers/OrderController";
import express from "express"

const router=express.Router();
//admin routes
//get order 
router.route("/admin/order")
.get(AuthMiddleware,authorizeAdmin,getAllOrders)
router.route("/admin/order/:id")
.patch(AuthMiddleware,authorizeAdmin,updateOrder)
.delete(AuthMiddleware,authorizeAdmin,deleteOrder)

//user routes
router.route("/user/order")
.get(AuthMiddleware,getOrderUsers)
 .post(AuthMiddleware, createOrder);

 export default router;