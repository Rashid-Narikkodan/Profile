declare namespace Express {
  interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
      status: "inactive" | "active";
    };
    file?: Multer.File;
    files?: Multer.File[];
  }
}
