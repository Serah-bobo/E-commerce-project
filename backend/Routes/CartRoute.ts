import {AuthMiddleware} from "../Middleware/AuthMiddleware"
import { getCart,addCart,removeProduct } from "../Controllers/CartController"
import express from "express"

const router=express.Router()
//get cart route
router.get('/cart', AuthMiddleware,getCart)
//add cart route
router.post('/add',AuthMiddleware,addCart)
//delete item
router.delete('/remove/:itemID',AuthMiddleware,removeProduct)
export default router