import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";

const isProduction = process.env.NODE_ENV === "production";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const path = req.originalUrl;

  if (err instanceof AppError) {
    console.log('\n')
    console.error(
      [
        "---- APPLICATION ERROR ----",
        `Time      : ${timestamp}`,
        `Request   : ${method} ${path}`,
        `Status    : ${err.statusCode}`,
        `Message   : ${err.message}`,
        !isProduction && err.stack
        ? `Stack     :\n${err.stack}`
        : null,
        "---------------------------",
      ]
      .filter(Boolean)
      .join("\n")
    );
    console.log('\n')

    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  // ---------- Unknown / system errors ----------
  const message =
    err instanceof Error ? err.message : "Unknown error occurred";
  const stack =
    err instanceof Error ? err.stack : String(err);

  console.error(
    [
      "---- UNHANDLED ERROR ----",
      `Time      : ${timestamp}`,
      `Request   : ${method} ${path}`,
      `Message   : ${message}`,
      !isProduction && stack
        ? `Stack     :\n${stack}`
        : null,
      "-------------------------",
    ]
      .filter(Boolean)
      .join("\n")
  );

  res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};
