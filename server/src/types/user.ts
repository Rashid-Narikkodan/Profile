import { Document } from "mongoose";

export type Avatar={
  url:string,
  publicId:string
}
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar:Avatar;
  phone:string;
  role: "user" | "admin";
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
export interface PublicUser {
  id: string;
  name: string;
  email: string;
  avatar?:Avatar;
  phone?:string;
  role: 'user' | 'admin';
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}
export interface EditUserInput{
  name?:string,
  email?:string,
  phone?:string,
}