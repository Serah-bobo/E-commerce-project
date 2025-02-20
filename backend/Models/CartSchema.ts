import mongoose from 'mongoose';
import { Schema,Document,Types } from 'mongoose';
export interface ICartItem {
  itemID: Types.ObjectId; // Correct the property name to match `cart.items`
  name: string;
  quantity: number;
  price: number;
}

export interface ICart extends Document {
  owner: Types.ObjectId;             
  items: ICartItem[];  // ⬅️ Fix this to store an array of objects, not ObjectId[]
  totalPrice: number;              
}

const cartSchema = new Schema({
  owner: {
    type: Types.ObjectId,  // Use Types
    required: true,
    ref: 'User',  // Reference to the User model
  },
  items: [{
    //referencing that itemid is the product id
    itemID: {
      type: Types.ObjectId,  // Use Types.ObjectId
      ref: 'Product',  // Reference to the product model
      required: true
    },
    name: {
      type: String,  // Name of the item
      required: true
    },
    quantity: {
      type: Number,  // Quantity of the item in the cart
      required: true,
      min: 1,  // Ensure at least 1 item is in the cart
      default: 1  // Default value if not provided
    },
    price: {
      type: Number,  // Price of the item (if it changes, can be set when the cart is updated)
      required: true
    }
  }],
  totalPrice: {
    type: Number,  // Total price of all items in the cart
    required: true,
    default: 0  // Initialize with 0, which can be updated later when calculating total
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);
export default Cart;
