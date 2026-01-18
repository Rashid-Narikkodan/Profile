import { Request, Response, NextFunction } from "express";
import { EditUserInput } from "../types/user";
import { editUser, updateUserAvatar  } from "../services/user.service";

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
  } catch (error) {
    next(error);
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

