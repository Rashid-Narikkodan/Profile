import User from "../models/user.model";
import { EditUserInput } from "../types/user";
import { Types } from "mongoose";
import { uploadImage, deleteImage } from "./cloudinary.service";

export const editUser = async ( userId: string, data: EditUserInput) => {
  
    if (!Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid user id");
    }

  // Whitelist fields explicitly
  const updateData: Partial<EditUserInput> = {};

  if (data.email){
    const user = await User.findOne({email:data.email})
    if(user) throw new Error('Already registered Email')
    else updateData.email = data.email;
  }
  if (data.name) updateData.name = data.name;
  if (data.phone) updateData.phone = data.phone;

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateData },
    {
      new: true,          // return updated doc
      runValidators: true // schema validation
    }
  ).select("-password");

  if (!updatedUser) {
    throw new Error("User not found");
  }

  return updatedUser;
};

export const updateUserAvatar = async (
  userId: string,
  file: Express.Multer.File
) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const uploaded = await uploadImage(file.buffer, { folder: "avatars" });

  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }

  user.avatar = {
    url: uploaded.url,
    publicId: uploaded.publicId,
  };
  await user.save();

  return user;
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