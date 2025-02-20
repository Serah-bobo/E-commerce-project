import { Types } from 'mongoose';
import Cart from '../Models/CartSchema'
import Product from '../Models/ProductModel'
import {Response,Request} from 'express'
import mongoose from 'mongoose'
interface AuthenticatedRequest extends Request {
    userID?: string;
    user?: any;
    token?: string;
  }

  //get cart
  export const getCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
     if (!req.userID) {
    res.status(401).json({ msg: "User not authenticated" });
    return;
    }
    try {
    const cart = await Cart.findOne({ owner: req.userID }).populate("items.itemID")
    if (!cart) {
          res.status(404).json({ message: "Cart not found" });
            return;
        }
        res.status(200).json({ cart });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

//add item in cart


export const addCart = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const { itemID, quantity } = req.body;
    const userID = req.userID;

    try {
        // Check if product exists
        const product = await Product.findById(itemID);
        if (!product) {
            res.status(404).json({ msg: "Product not found" });
            return; // Early return after sending response
        }

        // Find user's cart
        let cart = await Cart.findOne({ owner: userID }).populate("items.itemID");

        if (!cart) {
            // Create new cart if it doesn't exist
            cart = new Cart({
                owner: userID,
                items: [],
                totalPrice: 0
            });
        }

        // Check if product exists in cart
        const existingItem = cart.items.find(
            (item) => item.itemID._id.toString() === itemID
        );

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({
                itemID: product._id as Types.ObjectId,
                name: product.name,
                quantity: quantity,
                price: product.price
            });
        }

        // Recalculate total price
        cart.totalPrice = cart.items.reduce(
            (sum, item) => sum + item.quantity * item.price,
            0
        );

        await cart.save();
        
        // Single response at the end of successful operation
        res.status(200).json({
            success: true,
            msg: "Item added to cart",
            cart
        });
        console.log("✅ Item successfully added to cart:", cart);

    } catch (error) {
        // Only send error response if no response has been sent yet
        if (!res.headersSent) {
            res.status(500).json({
                success: false,
                msg: "Failed to add item to cart",
                error: error instanceof Error ? error.message : "Unknown error"
            });
        }
    }
};
//remove item from cart
export const removeProduct=async(req:AuthenticatedRequest,res:Response):Promise<void>=>{
    try{
     const { itemID } = req.params;
     const userID = req.userID;
     //find cart
     let cart=await Cart.findOne({owner:userID})
     if(!cart){
         res.status(404).json({msg:"Cart not found"})
         return
     }
     //remove
     cart.items = cart.items.filter((item) => item.itemID.toString() !== itemID)
     // Recalculate total price
     cart.totalPrice = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
     await cart.save()
     res.status(200).json({message:"item removed successfully", cart})
    }catch(error){
     res.status(500).json({msg:"server error"})
    }
 }