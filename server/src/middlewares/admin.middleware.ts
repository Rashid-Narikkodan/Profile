import { Request, Response, NextFunction } from "express";

export const adminMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  if (req.user?.role !== "admin") {
    return next(new Error("Access denied: Admins only"));
  }

  next();
};
