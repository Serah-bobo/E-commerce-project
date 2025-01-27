import Product from "../Models/ProductModel";
import {Request, Response} from "express"
import { IProduct } from "../Models/ProductModel";
//get all products
export const getAllProducts=async (req: Request, res: Response): Promise<void>=>{
try{
    const products=await Product.find()
    if(products.length===0){
        res.status(404).json({message:"No products found"})
    }
    res.status(200).json({products})
}catch(error){
    res.status(500).json({message:"Server error"})
}
}
// Create a new product
export const CreateProduct = async (req: Request, res: Response):Promise<void> => {
    try {
      const { owner, name, description, category, price } = req.body;
  
      // Validation: Ensure that the required fields are present
      if (!owner || !name || !description || !category || !price) {
         res.status(400).json({ message: 'All fields are required' });
         return;
      }
  
      // Create a new product
      const product = new Product({
        owner,
        name,
        description,
        category,
        price,
      });
  
      // Save the product in the database
      const savedProduct = await product.save();
  
      // Return success response
      res.status(201).json({
        message: 'Product created successfully',
        product: savedProduct,
      });
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };
  