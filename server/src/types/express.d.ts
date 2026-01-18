declare namespace Express {
  interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
    };
    file?: Multer.File;
    files?: Multer.File[];
  }
}
