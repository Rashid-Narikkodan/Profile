import mongoose, { Schema, Model } from "mongoose";
import { IUser } from "../types/user";
// 2️⃣ Create Mongoose schema
const UserSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    profileUrl: {type:String},
    role: { type: String, enum: ["user", "admin"], default: "user" },
    status: { type: String, enum: ["active", "inactive"], default: "active" },
  },
  {
    timestamps: true, // automatically adds createdAt and updatedAt
  }
);

// 3️⃣ Create Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
