import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../types/user";

const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    avatar: {
      url:{type:String},
      publicId:{type:String}
    },
    phone:{type:String},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true,
  }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
