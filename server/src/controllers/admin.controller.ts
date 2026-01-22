import { NextFunction, Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  toggleUserStatusService,
  updateUserService,
  deleteUserService,
  createUserService,
} from "../services/admin.service";
import { RegisterInput } from "../types/auth";
import { deleteAvatarService, updateUserAvatar } from "../services/user.service";

//get all users
export const getAllUsers = async (req: Request, res: Response) => {
  const result = await getAllUsersService(req.query);

  res.status(200).json({
    success: true,
    users: result.data,
    meta: result.meta,
  });
};


//to get one user
export const getUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if(!userId) throw new Error('User Id not found')
  const user = await getUserByIdService(userId as string);

  res.status(200).json({
    success: true,
    user,
  });
};


// to togle user status
export const toggleStatus = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const user = await toggleUserStatusService(userId as string);

  res.status(200).json({
    success: true,
    message: `User ${user.status ? "inactive" : "active"} successfully`,
    data: user,
  });
};


// update user data
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const payload = req.body;

  const user = await updateUserService(userId as string, payload);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    user,
  });
};

//delete a user
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  await deleteUserService(userId as string);

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};


export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const inputs: RegisterInput = req.body;
    const user = await createUserService(inputs);

    res
      .status(201)
      .json({
    success: true,
    user,
      });
  } catch (err: any) {
    next(err);
  }
};

export const updateAvatarByAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.id
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Avatar file is required" });
    }

    const avatar = await updateUserAvatar(userId as string, req.file);

    return res.status(200).json({
      success: true,
      avatar
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAvatarByAdmin = async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if(!userId) throw new Error('Unautherized user')
    await deleteAvatarService(userId);
  
  res.status(200).json({
    success: true,
    message: "Avatar deleted successfully",
  });
};