import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl:string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
