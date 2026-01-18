import { Document } from "mongoose";
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  profileUrl:string;
  phone:string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
export interface PublicUser {
  _id: string;
  name: string;
  email: string;
  profileUrl?:string;
  phone?:string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
