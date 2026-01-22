import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

export const requireActiveUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user; // set by auth middleware

  if (!user) {
    return res.status(401).json({ message: "Unauthenticated" });
  }

  if (user.status !== "active") {
    throw new AppError("Account is inactive. Contact support.",403)
  }

  next();
};
