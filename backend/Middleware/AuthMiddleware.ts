import jwt from "jsonwebtoken";
import User from "../Models/UserModel";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userID?: string;
  user?: any;
  token?: string;
}

export const AuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  console.log("\n=== Starting Authentication ===");
  
  // Step 1: Check Authorization header
  const authHeader = req.header("Authorization");
  console.log("1. Auth Header received:", authHeader?.substring(0, 20) + "...");
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("❌ Failed at step 1: No valid auth header");
    res.status(401).json({ msg: "No token, authorization denied" });
    return;
  }

  try {
    // Step 2: Check JWT_SECRET
    console.log("2. Checking JWT_SECRET...");
    if (!process.env.JWT_SECRET) {
      console.log("❌ Failed at step 2: JWT_SECRET not defined");
      throw new Error("JWT_SECRET is not defined");
    }
    console.log("✅ JWT_SECRET is defined");

    // Step 3: Extract and verify token
    const token = authHeader.split(" ")[1];
    console.log("3. Token extracted:", token.substring(0, 20) + "...");
    
    // Try decoding without verification first (for debugging)
    const decodedWithoutVerify = jwt.decode(token);
    console.log("3a. Token decoded without verification:", decodedWithoutVerify);

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    console.log("3b. Token verified successfully:", decoded);

    req.token = token;
    req.userID = decoded.id;
    console.log("4. UserID extracted:", req.userID);

    // Step 4: Find user
    console.log("5. Looking for user in database...");
    const user = await User.findById(req.userID);
    console.log("5a. User found:", user ? "Yes" : "No");
    
    if (!user) {
      console.log("❌ Failed at step 5: User not found");
      res.status(404).json({ msg: "User not found" });
      return;
    }

    // Step 5: Check token in user's tokens array
    console.log("6. Checking token in user's tokens array...");
    console.log("6a. User's tokens:", user.tokens);
    
    const tokenExists = user.tokens.some((t: { token: string }) => t.token === token);
    console.log("6b. Token exists in array:", tokenExists);

    if (!tokenExists) {
      console.log("❌ Failed at step 6: Token not found in user's tokens array");
      res.status(401).json({ msg: "Invalid token or session expired" });
      return;
    }

    // Step 6: Authentication successful
    req.user = user;
    console.log("✅ Authentication successful for user:", user.email);
    console.log("=== Authentication Complete ===\n");
    
    next();
  } catch (err) {
    console.log("❌ Failed with error:", err instanceof Error ? err.message : err);
    res.status(401).json({ msg: "Invalid token" });
    return;
  }
};
export const authorizeAdmin = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = await User.findById(req.userID);
    if (!user || user.role !== "admin") {
       res.status(403).json({ msg: "Access denied. Admins only." });
       return;
    }
    next();
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err });
  }
};
