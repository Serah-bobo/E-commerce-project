import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../Models/UserModel"
dotenv.config()//to enable dotenv configuration in config file 

// Function to generate an authentication token
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