import mongoose from "mongoose";
import User from "../models/user.model";
import { IUser } from "../types/user";
import { deleteImage } from "./cloudinary.service";
import { RegisterInput } from "../types/auth";
import { AppError } from "../utils/AppError";
import { validateEmail, validatePassword, validatePhone } from "../utils/validation";
import bcrypt from 'bcryptjs'

export const getAllUsersService = async (query?: any) => {
  const page = Math.max(Number(query?.page) || 1, 1);
  const limit = Math.min(Number(query?.limit) || 10, 50);
  const skip = (page - 1) * limit;

  const filter: Record<string,any> = {};

  /* ---------- Exact filters ---------- */
  if (query.role) {
    filter.role = query.role;
  }

  if (query.status) {
    filter.status = query.status;
  }

  /* ---------- Search (partial, indexed fields) ---------- */
  if (query.search) {
    const search = query.search.trim();

    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ];
  }

  /* ---------- Query ---------- */
  const users = await User.find(filter)
    .select("-password")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await User.countDocuments(filter);

  return {
    data:users ,
    meta: {
      search:query.search,
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

  const allowedFields = ["name", "email", "phone", "status"];
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


export const createUserService = async (input: RegisterInput) => {
  const { name, email, password, phone } = input;

  //validation
  if (!name || !email || !password)
    throw new AppError("Name, email, and password are required");
  if (name.length < 2 || name.length > 50)
    throw new AppError("Name must be between 2 and 50 characters");

  validateEmail(email);
  validatePassword(password);
  validatePhone(phone);

  //check for existence
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError("User already registered, please login", 400);

  //password encryption
  const passwordHash = await bcrypt.hash(password, 10);

  //create user and save
  const user = new User({
    name,
    password: passwordHash,
    email,
    phone: phone || null,
    status: "active",
  });
  await user.save();
  console.log(user)
  //reurn user data
  return user;
};
