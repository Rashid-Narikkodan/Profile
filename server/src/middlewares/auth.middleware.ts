import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/AppError";

interface JwtPayload {
  sub: string;
  role: "user" | "admin";
  status: "inactive" | "active";
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Authorization header missing", 401);

  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token)
    throw new AppError("Invalid authorization format", 401);

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!, {
      algorithms: ["HS256"],
    }) as JwtPayload;

    req.user = {
      id: decoded.sub,
      role: decoded.role,
      status: decoded.status,
    };

    next();
  } catch (error) {
    next(error);
  }
};
