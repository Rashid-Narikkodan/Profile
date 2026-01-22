import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { AuthUser, LoginInput, RegisterInput } from "../types/auth";
import { PublicUser } from "../types/user";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "./jwt.service";
import { AppError } from "../utils/AppError";
import RefreshToken from "../models/refresh.model";

import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../utils/validation";

//  1  ------------Registration Service----------
export const registerUser = async (input: RegisterInput) => {
  const { name, email, password, phone } = input;

  //validation
  if (!name || !email || !password)
    throw new AppError("Name, email, and password are required");
  if (name.length < 2 || name.length > 50)
    throw new AppError("Name must be between 2 and 50 characters");

  validateEmail(email);
  validatePassword(password);
  validatePhone(phone);

  //check for existence
  const existingUser = await User.findOne({ email });
  if (existingUser)
    throw new AppError("User already registered, please login", 400);

  //password encryption
  const passwordHash = await bcrypt.hash(password, 10);

  //create user and save
  const user = new User({
    name,
    password: passwordHash,
    email,
    phone: phone || null,
    status: "active",
  });
  await user.save();

  //JWT access and refresh token optionally
  const accessToken = signAccessToken(user.id, user.role);
  const { refreshToken, tokenId } = signRefreshToken(user.id,user.role);

  await RefreshToken.create({
    userId: user._id,
    tokenId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  //create a public user data
  const publicUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    status: user.status,
  };
  
  //return user data
  return { user: publicUser, token: { accessToken, refreshToken } };
};

//  2   -------Login Service----------
export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;
  
  // validation
  if (!email.trim() || !password.trim()) {
    throw new AppError("Email and password are required", 400);
  }
  
  validateEmail(email);

  // find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  // password verification (FIXED)
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new AppError("Invalid credentials", 400);
  
  
  // issue tokens
  const accessToken = signAccessToken(user.id, user.role);
  const { refreshToken, tokenId } = signRefreshToken(user.id,user.role);

  // persist refresh session (CRITICAL)
  await RefreshToken.create({
    userId: user._id,
    tokenId,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  
  const publicUser: AuthUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    status: user.status,
    role: user.role,
  };
  
  return {
    user: publicUser,
    token: {
      accessToken,
      refreshToken,
    },
  };
};

// ------ get Authenticated user ----------

export const authUser = async (id: string) => {
  const user = await User.findById(id).select("-password");

  if (!user) return null;

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    status: user.status,
    role: user.role,
  };
};


//  3  --------------Reresh Token---------------
export const refreshTokens = async (
  oldRefreshToken: string
): Promise<{ accessToken: string; refreshToken: string }> => {
  let payload;

  // 1. Verify refresh JWT
  try {
    payload = verifyRefreshToken(oldRefreshToken);
  } catch {
    throw new AppError("Invalid refresh token", 401);
  }

  const { sub: userId, tokenId,role  } = payload;

  // 2. Find refresh session
  const session = await RefreshToken.findOne({
    userId,
    tokenId,
  });

  if (!session) {
    throw new AppError("Refresh token expired or revoked", 401);
  }

  // 3. Rotate token (delete old session)
  // await RefreshToken.findByIdAndDelete(session.id)
  // 4. Issue new tokens
  const accessToken = signAccessToken(userId,role);

  const {
    refreshToken: newRefreshToken,
    tokenId: newTokenId,
  } = signRefreshToken(userId,role);

  // 5. Persist new refresh session
  await RefreshToken.create({
    userId,
    tokenId: newTokenId,
    expiresAt: new Date(
      Date.now() + 7 * 24 * 60 * 60 * 1000
    ),
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
};

export const logout = async (refreshToken?: string): Promise<void> => {
  // No token → already logged out
  if (!refreshToken) return;

  try {
    const payload = verifyRefreshToken(refreshToken);
    const { sub: userId, tokenId } = payload;

    await RefreshToken.deleteOne({ userId, tokenId });
  } catch {
    // Token invalid, expired, or reused
    // Treat as logged out anyway (idempotent)
  }
};
