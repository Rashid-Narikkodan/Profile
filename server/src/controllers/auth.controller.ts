import { NextFunction, Request, Response } from "express";
import { RegisterInput, LoginInput } from "../types/auth";
import { registerUser, loginUser, logout, authUser, refreshTokens } from "../services/auth.service";

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

export const getMe = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const { id } = req.user;

    const user = await authUser(id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};



export const refreshController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken

    if (!refreshToken) {
      return res.status(401).json({ message: "Missing refresh token" })
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await refreshTokens(refreshToken)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      // path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })

    return res.status(200).json({ accessToken })
  } catch (error) {
    next(error)
  }
}


const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    await logout(refreshToken);

    res.clearCookie("refreshToken", cookieOptions);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
};
