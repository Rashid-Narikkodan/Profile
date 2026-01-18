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

  if (data.name) updateData.name = data.name;
  if (data.email) updateData.email = data.email;
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
  // 1️⃣ fetch user
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // 2️⃣ upload file
  const uploaded = await uploadImage(file.buffer, { folder: "avatars" });

  // 3️⃣ delete old avatar
  if (user.avatar?.publicId) {
    await deleteImage(user.avatar.publicId);
  }

  // 4️⃣ update DB
  user.avatar = {
    url: uploaded.url,
    publicId: uploaded.publicId,
  };
  await user.save();

  return user;
};
