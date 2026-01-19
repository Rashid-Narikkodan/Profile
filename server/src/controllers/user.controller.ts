import { Request, Response, NextFunction } from "express";
import { EditUserInput } from "../types/user";
import { editUser, updateUserAvatar,getUserById, deleteAccountService,deleteAvatarService  } from "../services/user.service";

export const editUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data: EditUserInput = req.body;

    const user = await editUser(userId, data);

    return res.status(200).json({success:true,user});
  } catch (error:any) {
    return res.status(400).json({success:false,message:error.message})
  }
};

export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const user = await updateUserAvatar(userId, req.file);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id;

    if(!userId) throw new Error('User not Authenticated')

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Return user (omit sensitive fields)
    const { password, ...safeUser } = user.toObject(); 
    res.json({
      success: true,
      user: safeUser,
    });
  } catch (err) {
    next(err); // pass to global error handler
  }
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
