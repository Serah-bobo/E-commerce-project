import mongoose from "mongoose"
import { Schema, Document, Types } from "mongoose"
import { Validator } from "mongoose"
//interface 
export interface IProduct extends Document {
    owner: Types.ObjectId;        // Reference to a User, as a mongoose ObjectId
    name: string;                  // Name of the product (String)
    description: string;           // Description of the product (String)
    category: string;              // Category of the product (String)
    price: number;                 // Price of the product (Number)
  }
  
const ProductSchema=new Schema({
    //A product would have the owner field referencing a specific User document,
    //  helping to maintain the relationship between products and users in your application.
    owner : {
        type: Types.ObjectId,//owner is a reference to user document, objectId refers to user who own the product
        required: true,
        ref: 'User'//referencing to user model owner references a specific user
     },
     name: {
        type: String,
        required: true,
        trim: true
     },
     description: {
       type: String,
       required: true
     },
     category: {
        type: String,
        required: true
     },
     price: {
        type: Number,
        required: true
     }
},{timestamps:true})
const Product=mongoose.model<IProduct>("product",ProductSchema)
export default Product;
