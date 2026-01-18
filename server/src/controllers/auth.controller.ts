import { Request, Response } from "express";
import { RegisterInput } from "../types/auth";
import { registerUser } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const user = await registerUser(data);
    res.status(201).json({success:true,user,message:'New User Registered'});
  } catch (err: any) {
    res.status(400).json({success:false, message: err.message });
  }
};
