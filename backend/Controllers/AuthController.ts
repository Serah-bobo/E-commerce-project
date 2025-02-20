import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../Models/UserModel";
import { Request, Response } from 'express'


// Extend the Request interface to include token and User properties
interface AuthenticatedRequest extends Request {
  token?: string;
  user?: InstanceType<typeof User>;
}

// Define the AuthenticatedRequest interface
interface AuthenticatedRequest extends Request {
  userID?: string;
}
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
export const registerUser = async (req: Request, res: Response):Promise<void>=> {
  const { name, email, password, role } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
       res.status(400).json({ msg: 'User already exists!' });
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
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
  }
};
//login
export const loginUser=async(req: Request, res: Response):Promise<void> => {
  const {email,password}=req.body;
  try{
    const user=await User.findOne({email})
    if(!user){
        res.status(400).json({msg:"user not found"});
        return;
    }
    //check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
          res.status(400).json({ msg: 'Invalid credentials' });
          return;
    }

    const token = await generateToken(user._id.toString());
user.tokens.push({ token });
console.log("Saving token to DB:", token); // Debugging log
await user.save();
console.log("User tokens after saving:", user.tokens);

    res.status(201).json({ token, user });
  }catch(error){
    res.status(500).json({ msg: (error as Error).message });
  }
}
// Get  user details (protected route)
export const getUser = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  console.log("Extracted User ID:", req.userID); // Debugging log

  if (!req.userID) {
     res.status(400).json({ msg: "User ID is missing from request" });
  }

  const user = await User.findById(req.userID);
  if (!user) {
     res.status(404).json({ msg: "User not found" });
  }

  res.json(user);
};


export const getAllUsers=async (req: Request, res: Response):Promise<void>=>{
  const getUsers=await User.find({},{password:0})//exclude password field
  res.status(200).json(getUsers)
}
//log out a single session
{/*export const logOut = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    if (!req.user || !req.token) {
       res.status(400).json({ msg: "User is not authenticated" });
       return;
    }

    // ✅ Remove only the current session token
    req.user.tokens = req.user.tokens.filter((t: { token: string }) => t.token !== req.token);
    await req.user.save();

    res.json({ msg: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ msg: (error as Error).message });
  }
};*/}
