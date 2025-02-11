import mongoose, { Types } from "mongoose"
import {Schema,Document} from "mongoose"
import validator from "validator"
const roleEnum = ["user", "admin"];
import bcrypt from "bcryptjs"
interface IUser extends Document {
  _id:Types.ObjectId
    name: string;
    role:string
    email: string;
    password: string;
    tokens: { token: string }[];
    matchPassword(enteredPassword: string): Promise<boolean>;
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
        maxLength:20,
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
// Method to match password while logging in
UserSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};
//hash passwords before saving
//runs before the document is saved in document hence the pre 
UserSchema.pre('save', async function(next) {
  // Check if the password field was modified 
  //this refers to the current field
  if (this.isModified('password')) {
    // Hash the password before saving
    //this.password refers to users password which will be hashed and 10 refers to how much time to be spent
    //in hashing the more rounds the  stronger the security
    this.password = await bcrypt.hash(this.password, 10);
  }

  // after hashing save the document
  next();
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;