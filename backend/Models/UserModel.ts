import mongoose from "mongoose"
import {Schema,Document} from "mongoose"
import validator from "validator"
const roleEnum = ["user", "admin", "moderator"];
interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    tokens: { token: string }[];
}

const UserSchema=new Schema({
    name:{
        type:String,
        required: true,
         trim: true
    },
    email:{
        type: String,
   required: true,
   unique: true,
   lowercase: true,
    validate( value: string ): void {
         if( !validator.isEmail( value )) {
             throw new Error( "email is invalid")
              }
          }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        maxLength:12,
        trim: true,//remove an extra white spaces
        validate(value: string): void {
           if(value.toLowerCase().includes("password")) {
           throw new Error("password must not contain password") //password cannot contain password 
          }
           }
    },
    tokens: [{
      token: {
      type: String,
      required: true
        }
      }],
      // Adding the role field with a default value
      //enum list possible values
    role: {
        type: String,
        enum: roleEnum,//
        default: "user", // Default role is 'user'
        required: true,
      },
    
},{timestamps:true})
const User = mongoose.model<IUser>('User', UserSchema);
export default User;