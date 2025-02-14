import jwt from "jsonwebtoken";
import User from "../Models/UserModel";
import { Request, Response, NextFunction } from "express";

interface AuthenticatedRequest extends Request {
  userID?: string;
  user?: any;
  token?: string;
}

// ✅ Middleware to verify JWT and extract user info
export const AuthMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
     res.status(401).json({ msg: "No token, authorization denied" });
     return;
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const token = authHeader.split(" ")[1]; // ✅ Extract token
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

    req.token = token; // ✅ Store token in request
    req.userID = decoded.id; // ✅ Store userID in request

    // ✅ Check if user exists
    const user = await User.findById(req.userID);
    if (!user) {
       res.status(404).json({ msg: "User not found" });
       return;
    }

    req.user = user; // ✅ Attach user object to request

    // ✅ Ensure token is in the user's token array
    if (!user.tokens.some((t: { token: string }) => t.token === token)) {
       res.status(401).json({ msg: "Invalid token or session expired" });
       return;
    }

    next();
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
     res.status(401).json({ msg: "Invalid token" });
     return;
  }
};

// ✅ Role-based authorization middleware
export const authorize = (...roles: string[]) => {
  return async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const user = await User.findById(req.userID);
      if (!user || !roles.includes(user.role)) {
         res.status(403).json({ msg: "Access denied" });
         return;
      }
      next();
    } catch (err) {
       res.status(500).json({ msg: err instanceof Error ? err.message : "An unknown error occurred" })
       return;
    }
  };
};
