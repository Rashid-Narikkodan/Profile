import User from "../models/user.model";
import { EditUserInput } from "../types/user";
import { Types } from "mongoose";
import { uploadImage, deleteImage } from "./cloudinary.service";
import { AppError } from "../utils/AppError";
import { validateEmail, validatePhone } from "../utils/validation";

export const editUser = async (userId: string, data: EditUserInput) => {
 
  // Input validation
  if (!Types.ObjectId.isValid(userId)) throw new AppError("Invalid user id");
  
  const updateData: Partial<EditUserInput> = {};
  // Check if user existing
  if (data.email) {
    const existingUser = await User.findOne({
      email: data.email,
      _id: { $ne: userId },
    });
    if (existingUser) throw new AppError("Email already in use");
    validateEmail(data.email)
    updateData.email = data.email;
  }
  if (data.phone){
    validatePhone(data.phone)
    updateData.phone = data.phone;
  } 
  if (data.name) updateData.name = data.name; 

// update
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");

  if (!updatedUser) {
    throw new AppError("User not found");
  }
  
  return {
    name: updatedUser.name,
    email: updatedUser.email,
    phone: updatedUser.phone,
  };
};


export const updateUserAvatar = async (
  userId: string,
  file: Express.Multer.File
) => {
  const user = await User.findById(userId);
  if (!user) throw  new AppError("User not found");

  const uploaded = await uploadImage(file.buffer, { folder: "avatars" });

  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }

  user.avatar = {
    url: uploaded.url,
    publicId: uploaded.publicId,
  };
  await user.save();

  return user.avatar;
};

export const getUserById = async (userId:string) => {
  return await User.findById(userId)
}

export const deleteAccountService = async (userId: string) => {
  // 1. Delete avatar if exists
  deleteAvatarService(userId)

  // 2. Delete user document
  await User.findByIdAndDelete(userId);

};

export const deleteAvatarService= async (userId:string) =>{
  const user = await User.findById(userId)
  if(!user) return 
    // 1. Delete avatar if exists
  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }
}