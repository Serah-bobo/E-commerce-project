import jwt from "jsonwebtoken";
import User from "../Models/UserModel";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userID?: string;
}

// Middleware to verify JWT and extract user info
export const AuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
):Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ msg: "No token, authorization denied" });
    return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = authHeader.split(" ")[1]; // ✅ Correct token extraction
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.userID = decoded.id; // ✅ Ensure correct field name

    // ✅ Check if user exists
    const user = await User.findById(req.userID);
    if (!user) {
      res.status(404).json({ msg: "User not found" });
    }

    next();
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    res.status(401).json({ msg: "Invalid token" });
  }
};
export const authorize = (...roles: string[]) => {
   return async (req: AuthenticatedRequest, res: Response, next: NextFunction):Promise<void> => {
     try {
       const user = await User.findById(req.userID); // ✅ Use `userID` consistently
       if (!user || !roles.includes(user.role)) {
      res.status(403).json({ msg: "Access denied" });
       }
       next();
     } catch (err) {
       res.status(500).json({ msg: err instanceof Error ? err.message : "An unknown error occurred" });
     }
   };
 };
 