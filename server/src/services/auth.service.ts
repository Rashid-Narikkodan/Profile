import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { AuthUser, LoginInput, RegisterInput } from "../types/auth";
import { PublicUser } from "../types/user";
import { signAccessToken } from "../utils/jwt";
import {
  validateEmail,
  validatePassword,
  validatePhone,
} from "../utils/validation";

// --------------Registration Service----------
export const registerUser = async (input: RegisterInput) => {
  const { name, email, password, phone } = input;
  
  //validation
  if (!name || !email || !password)
    throw new Error("Name, email, and password are required");
  if (name.length < 2 || name.length > 50)
    throw new Error("Name must be between 2 and 50 characters");
  
  validateEmail(email);
  validatePassword(password);
  validatePhone(phone);
  
  //check for existence
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already registered, please login");

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
  const accessToken = signAccessToken(user.id,user.role)

  //create a public user data
  const publicUser: AuthUser = {
    id: user._id.toString(),
    email: user.email,
    role: user.role,
    status: user.status,
  };

  //return user data
  return { user: publicUser, accessToken };
};

//-------Login Service----------

export const loginUser = async (data: LoginInput) => {
  const { email, password } = data;

  //validation
  if (!email.trim() || !password.trim())
    throw new Error("Email and Password is required");
  validatePassword(password);
  validateEmail(email);

  //find user
  const user = await User.findOne({ email });

  //check for existence
  if (!user) throw new Error("User not registered, please Register");

  //check password matching
  const passHash = await bcrypt.hash(password, 10);
  const isValid = await bcrypt.compare(password, passHash);
  if (!isValid) throw new Error("Invalid Credentials");

  //create access token
  const accessToken = signAccessToken(user._id.toString(), user.role);

  //filter user data
  const publicUser: PublicUser = {
    _id: user._id.toString(),
    email: user.email,
    phone: user.phone,
    name: user.name,
    role: user.role,
    status: user.status,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  return { user: publicUser, accessToken };
};

// ------ get Authenticated user ----------

export const authUser = async (id: string) => {
  const user = await User.findById(id).select('-password')
  if (!user) throw new Error("User not found");
  return user;
};
