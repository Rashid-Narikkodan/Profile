import { NextFunction, Request, Response } from "express";
import { RegisterInput, LoginInput } from "../types/auth";
import { registerUser, loginUser, authUser, refreshTokens } from "../services/auth.service";
import { signAccessToken } from "../services/jwt.service";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: RegisterInput = req.body;
    const { user, token } = await registerUser(data);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res
      .status(201)
      .json({
        success: true,
        user,
        accessToken: token.accessToken,
        message: "New User Registered",
      });
  } catch (err: any) {
    next(err);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data: LoginInput = req.body;

    const { user, token } = await loginUser(data);

    res.cookie("refreshToken", token.refreshToken, {
      httpOnly: true, // Cannot be accessed by JavaScript
      secure: process.env.NODE_ENV === "production", // Only sent over HTTPS in production
      sameSite: "strict", // Prevents CSRF attacks
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    });

    res.status(200).json({
      success: true,
      user,
      accessToken: token.accessToken,
      message: "User Logged in successfully",
    });
  } catch (err: any) {
    next(err);
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    if (!req.user) throw new Error("User not Authenticated");
    const { id } = req.user;

    // Fetch fresh user data from DB
    const user = await authUser(id);

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};


export const refreshController = async (
  req: Request,
  res: Response,
  next:NextFunction
) => {
  try{

    const refreshToken = req.cookies?.refreshToken;
    
    if (!refreshToken) {
      return res
      .status(401)
      .json({ message: "Missing refresh token" });
    }
    
    const { accessToken, refreshToken: newRefreshToken } = await refreshTokens(refreshToken);
    
    res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/auth/refresh",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  
  return res.status(200).json({
    accessToken,
  });
}catch(error){
  next(error)
}
};
