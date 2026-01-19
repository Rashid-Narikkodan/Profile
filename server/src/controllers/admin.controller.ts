import { Request, Response } from "express";
import {
  getAllUsersService,
  getUserByIdService,
  toggleUserStatusService,
  updateUserService,
  deleteUserService,
} from "../services/admin.service";

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
    data: user,
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
    data: user,
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
