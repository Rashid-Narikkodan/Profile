import { Request, Response } from "express";
import { RegisterInput,LoginInput } from "../types/auth";
import { registerUser,loginUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const data:RegisterInput = req.body;
    const {user} = await registerUser(data);
    res.status(201).json({success:true,user,message:'New User Registered'});
  } catch (err: any) {
    res.status(400).json({success:false, message: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const data: LoginInput = req.body;

    const { user, accessToken } = await loginUser(data);

    res.status(200).json({
      success: true,
      user,
      accessToken,
      message:'User Logged in successfully'
    });
  } catch (err: any) {
    res.status(err.statusCode || 401).json({
      success: false,
      message: err.message || "Invalid credentials",
    });
  }
};