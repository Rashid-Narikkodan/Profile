import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  sub: string;
  role: 'user'|'admin';
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  console.log("Hit auth middleware");

  // 1. Header presence
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      message: "Authorization header missing",
    });
  }

  // 2. Bearer format
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      success: false,
      message: "Invalid authorization format",
    });
  }

  // 3. Verify token
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as JwtPayload;

    // 4. Attach trusted context
    req.user = {
      id: decoded.sub,
      role: decoded.role,
    };

    next();
  } catch(error) {
    console.log(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
