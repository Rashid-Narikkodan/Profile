import { Request, Response, NextFunction } from "express";
import { EditUserInput } from "../types/user";
import { editUser, updateUserAvatar,getUserById, deleteAccountService,deleteAvatarService  } from "../services/user.service";
import { AppError } from "../utils/AppError";

export const editUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data: EditUserInput = req.body;

    const user = await editUser(userId, data);

    return res.status(200).json({success:true,user});

};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const avatar = await updateUserAvatar(userId, req.file);

    return res.status(200).json({
      success: true,
      avatar
    });
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user?.id;

    if(!userId) throw new AppError('User not Authenticated',401)

    const user = await getUserById(userId);

    if (!user) throw new AppError('User not Found',404)

    // Return user (omit sensitive fields)
    const { password, ...safeUser } = user.toObject(); 
    res.json({
      success: true,
      user: safeUser,
    });

};


export const deleteAvatar = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if(!userId) throw new Error('Unautherized user')
    await deleteAvatarService(userId);
  
  res.status(200).json({
    success: true,
    message: "Avatar deleted successfully",
  });
};

export const deleteAccount = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if(!userId) throw new Error('Unautherized user')
  await deleteAccountService(userId);

  res.status(200).json({
    success: true,
    message: "Account deleted successfully",
  });
};
