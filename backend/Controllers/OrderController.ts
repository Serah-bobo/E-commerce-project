import Order from "../Models/OrderSchema"; 
import {Request,Response} from "express"

interface orderRequest extends Request{
    userID?: string;
    user?: {
        role: string;
      };
}

//create order
export const createOrder=async(req: orderRequest, res: Response)=>{
    try{
       
        
        const{name,products,phone,address}=req.body;
        //create order
        const order=new Order({
            owner:req.userID,
            name,
            products,
            phone,
            address
        });
        //save database in database
        const savedOrder=await order.save();
        res.status(200).json({
            message:"order created successfully",
            order:savedOrder
        })
    }catch(error){
        res.status(500).json({message:error})
        return;
    }
}

//get all orders(for admin)
export const getAllOrders=async(req:orderRequest,res:Response)=>{
    try{
         //check if is admin
          // Ensure only admins can update products
     if (!req.user || req.user.role !== "admin") {
        res.status(403).json({ message: "Access denied. Admins only." });
        return;
     }
        //populates owner filed with name and products filed with name of product,retrieves name field only
        const orders=await Order.find().populate("owner","name").populate("products","name")
        if(!orders ||orders.length === 0){
            res.status(404).json({message:"No orders found"})
            return;
        }
        res.status(200).json({orders})
    }catch(error){
        res.status(500).json({message:"server error"})
        return;
    }
}
//retrieve order for users

export const getOrderUsers=async(req:orderRequest,res:Response)=>{
    try{
        //find logged in user order and retrieve products filed with name only
        const orders=await Order.find({owner:req.userID}).populate("products","name")
        if(!orders || orders.length === 0){
            res.status(404).json({message:"No orders found"})
            return;
        }
        res.status(200).json({orders})
    }catch(error){
        res.status(500).json({message:"server error"})
        return;
    }
}
//update orders admin only
export const updateOrder=async(req:orderRequest,res:Response):Promise<void>=>{
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        // Update the order's status
        const updatedOrder = await Order.findByIdAndUpdate(
          id,
          { status },
          { new: true }
        );
    
        if (!updatedOrder) {
          res.status(404).json({ message: "Order not found" });
          return
        }
    
        res.status(200).json({ message: "Order status updated successfully", order: updatedOrder });
      } catch (error) {
        res.status(500).json({ message: "Error updating order status", error });
      }
}

// Delete an order (admin only)
export const deleteOrder = async (req: orderRequest, res: Response):Promise<void>=> {
    try {
      const { id } = req.params;
  
      const deletedOrder = await Order.findByIdAndDelete(id);
  
      if (!deletedOrder) {
         res.status(404).json({ message: "Order not found" });
         return;
      }
  
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting order", error });
    }
  };