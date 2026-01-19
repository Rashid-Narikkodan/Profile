import mongoose from "mongoose";
import User from "../models/user.model";
import { IUser } from "../types/user";
import { deleteImage } from "./cloudinary.service";

export const getAllUsersService = async (query: any) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Number(query.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const filter: Record<string, any> = {};

  if (query.role) filter.role = query.role;
  if (query.status) filter.status = query.status;

  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  const total = await User.countDocuments(filter);

  return {
    data: users,
    meta: {
      total,
      page,
      limit,
    },
  };
};

export const getUserByIdService = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findById(userId).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


export const toggleUserStatusService = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findById(userId).select('-password');

  if (!user) {
    throw new Error("User not found");
  }

  if (user.role === "admin") {
    throw new Error("Cannot block an admin user");
  }

  user.status = user.status === "active" ? "inactive" : "active";
  await user.save();

  return user;
};

export const updateUserService = async (
  userId: string,
  payload: Partial<IUser>
) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const allowedFields = ["name", "email", "phone", "status", "role"];
  const updateData: Record<string, any> = {};

  for (const key of allowedFields) {
    if (payload[key as keyof IUser] !== undefined) {
      updateData[key] = payload[key as keyof IUser];
    }
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    { new: true }
  ).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};


//hard delete teh user
export const deleteUserService = async (userId: string) => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error("Invalid user id");
  }

  const user = await User.findById(userId);

  if (!user) {
    return; // idempotent
  }

  if (user.role === "admin") {
    throw new Error("Cannot delete admin user");
  }

  // Avatar cleanup would go here later
  if(user.avatar?.publicId){
      await deleteImage(user.avatar.publicId)
    }

  await User.findByIdAndDelete(userId);
};
