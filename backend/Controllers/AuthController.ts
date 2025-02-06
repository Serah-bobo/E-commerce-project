import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../Models/UserModel"
import {Request,Response} from 'express'
dotenv.config()//to enable dotenv configuration in config file 

// Function to generate an authentication token
//the token contains info about user id signed using the secret key.once generated its sent to client to prove they are authenticated
const generateToken = async (id: string): Promise<string> => {
    try {
      // Check if the JWT secret key is available in the environment variables
      if (!process.env.JWT_SECRET) {
        // Throw an error if the secret key is not defined
        throw new Error("JWT_SECRET is not defined");
      }
  
      // Generate a token using the jwt.sign method
      // `id` is embedded into the payload (used for identifying the user)
      // The secret key is used to sign the token ensuring its integrity and security
      // The token will expire in 30 days
      const token = jwt.sign(
        { id },                       // Payload (user's id)
        process.env.JWT_SECRET,       // Secret key used for signing the token
        { expiresIn: "30d" }          // The token will expire in 30 days
      );
  
      // Return the generated token
      return token;
    } catch (error) {
      // If something goes wrong during token generation, throw an error
      throw new Error("Error generating token");
    }
  };
// Register a new user
export const registerUser = async (req: Request, res: Response)=> {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: 'User already exists!' });
    }

    // Create new user
    const newUser = new User({
      name,
      email,
      password,
      role
    });

    await newUser.save();
    const token = await generateToken(newUser._id.toString());
    res.status(201).json({ token, user: newUser });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
//login
export const loginUser=async(req: Request, res: Response) => {
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email})
    if(!user){
       return  res.status(400).json({msg:"user not found"});
    }
    //check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
          res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = await generateToken(user._id.toString());
    res.status(201).json({ token, user });
  }catch(err){
    res.status(500).json({ msg: err.message });
  }
}
// Get user details (protected route)
export const getUser = async (req: any, res: any) => {
  const user = await User.findById(req.userId);
  if (!user) {
      return res.status(404).json({ msg: 'User not found' });
  }
  res.json(user);
};
