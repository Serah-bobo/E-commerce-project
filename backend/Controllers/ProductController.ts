import Product from "../Models/ProductModel";
import { Request, Response } from "express"

// Extend the Request interface to include userID and user
interface CustomRequest extends Request {
  userID?: string;
  user?: {
    role: string;
  };
}
import { IProduct } from "../Models/ProductModel";
//get all products
export const getAllProducts=async (req: Request, res: Response): Promise<void>=>{
try{
    const products=await Product.find()
    if(products.length===0){
        res.status(404).json({message:"No products found"})
        return;
    }
    res.status(200).json({products});
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
    return;
}
}
// Create a new product
export const CreateProduct = async (req: CustomRequest, res: Response):Promise<void> => {
    try {
     
      
      const { name, description, category, price } = req.body;
      const image = req.file ? `/uploads/${req.file.filename}` : ""; // Store image path
      
     
      
    // Ensure only admins can create products
    if (!req.user || req.user.role !== "admin") {
       res.status(403).json({ message: "Access denied. Admins only." });
       return;
    }
      // Validation: Ensure that the required fields are present
      if ( !name || !description || !category || !price || !image ) {
         res.status(400).json({ message: 'All fields are required' });
         return;
      }
     

      
      // Create a new product
      const product = new Product({
        name,
        description,
        category,
       image,
        price,
        owner: req.userID
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
      return;
    }
  };
  
  //fetch an item by  an id
  export const getProductById=async (req: Request, res: Response):Promise<void>=>{
    try{
      const productId=req.params.id;
      const product=await Product.findById(productId);
      if(!product){
        res.status(404).json({message:"product not found"});
        return;
      }
      res.status(200).json({product})
    }catch(error){
      res.status(500).json({message:"server error"})
      return;
    }
  }

// Update a product by its ID
export const updateProduct = async (req: CustomRequest, res: Response):Promise<void> => {
  try {
     // Ensure only admins can update products
     if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
   }
    const { name, description, category, price } = req.body;
    const productId = req.params.id;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }
     // Handle image update if a file is uploaded
     let image = product.image; // Keep existing image by default
     if (req.file) {
       image = req.file.path; // Multer saves file and sets the path
     }
    // Find the product and update its details
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        name,
        description,
        category,
        price,
        image,
      },
      { new: true } // Returns the updated product
    );

    if (!updatedProduct) {
       res.status(404).json({ message: 'Product not found' });
       return;
    }

     res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
     res.status(500).json({ message: 'Server Error', error });
     return;
  }
};

// Delete a product
export const deleteProduct = async (req: CustomRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || req.user.role !== "admin") {
      res.status(403).json({ message: "Access denied. Admins only." });
      return;
    }

    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      res.status(404).json({ message: "Product not found" });
      return;
    }

   
    await Product.findByIdAndDelete(productId);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};