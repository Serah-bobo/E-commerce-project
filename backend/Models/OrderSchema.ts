import mongoose from "mongoose";
import { Document,Schema,Types } from "mongoose";
import Product from "./ProductModel";
export interface IOrder extends Document{
owner:Types.ObjectId,
  name:string,
  products: Types.ObjectId[],
  totalPrice: number,
  status: string,
  address:{
    street:string,
    city:string,
    postalCode:string,
    country:string,
  },
  phone:string,
}
//schema
const orderSchema=new Schema({
    owner: {
        type: Types.ObjectId,
        required: true,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
        trim:true,
    },
    products: [{
        type: Types.ObjectId,
        required: true,
        ref: 'Product',
    }],
    totalPrice: {
        type: Number,
        default:0,
    },
    status: {
        type: String,
        required: true,
        enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        default:"Pending",
    },
    phone:{
        type: String,
        required: true,
        trim:true,
        validate: {
            validator: function (v: string) {
              return /^(\+?\d{1,3}[- ]?)?\d{10}$/.test(v); 
            },
            message: (props) => `${props.value} is not a valid phone number!`,
          },
    },
    address:{
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    }
},{
    timestamps: true,
}
)
// Pre-save hook to calculate totalPrice
orderSchema.pre("save", async function (next) {
    if (this.isModified("products")) {
      const productDetails = await Product.find({
        _id: { $in: this.products },
      });
      const total = productDetails.reduce((sum, product) => {
        return sum + product.price; // Sum up the prices of all products
      }, 0);
      this.totalPrice = total;
    }
    next();
  });


const Order = mongoose.model<IOrder>('Order', orderSchema);
export default Order;