import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

export const app: Application = express();

// Body parsers
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));

// CORS
// app.use(
//   cors({
//     origin: process.env.CORS_ORIGIN || "*",
//     credentials: true,
//   })
// );

// Logging (dev vs prod)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
} else {
  app.use(morgan("combined"));
}


app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "ok",
    service: "profile-api",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);


app.use((_req: Request, res: Response) => { //404
  res.status(404).json({
    success:false,
    message: "Route not found",
  });
});

app.use( //global error handler
  (
    err: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
        success:false,
      message: "Internal server error",
    });
  }
);
