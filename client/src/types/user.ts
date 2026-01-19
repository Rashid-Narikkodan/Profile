
export type PublicUser = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "user";
  status: "active" | "suspended";
  lastLoginAt?: Date;
  refreshToken?: string;
  createdAt: Date;
  updatedAt: Date;
};