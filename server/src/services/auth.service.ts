import bcrypt from "bcryptjs";
import User from "../models/user.model";
import { RegisterInput } from "../types/auth";
import { PublicUser } from "../types/user";
import { signAccessToken } from "../utils/jwt";

// Registration Service
export const registerUser = async (input: RegisterInput) => {
  const { name, email, password, phone } = input;

  //validation
  if (!name || !email || !password)
    throw new Error("Name, email, and password are required");
if (name.length < 2 || name.length > 50)
    throw new Error("Name must be between 2 and 50 characters");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) throw new Error("Invalid email address");
  if (password.length < 8)
    throw new Error("Password must be at least 8 characters");
  if (!/[A-Z]/.test(password))
    throw new Error("Password must contain at least one uppercase letter");
  if (!/[a-z]/.test(password))
    throw new Error("Password must contain at least one lowercase letter");
  if (!/[0-9]/.test(password))
    throw new Error("Password must contain at least one number");
  if (!/[\W_]/.test(password))
    throw new Error("Password must contain at least one special character");
  if (phone && !/^\+?\d{10,15}$/.test(phone))
    throw new Error("Invalid phone number format");

  //check for existence
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered, please login");

  //password encryption
  const passwordHash = await bcrypt.hash(password,10)

  //create user and save
  const user = new User({
      name,
      password:passwordHash,
      email,
      phone:phone||null,
      status: "active"
    })
    await user.save()
    
    //JWT accessToken
    const accessToken = signAccessToken(user._id.toString(),user.role)

    //create a public user data
    const publicUser:PublicUser={
        _id:user._id.toString(),
        email:user.email,
        phone:user.phone,
        name:user.name,
        role:user.role,
        status:user.status,
        createdAt:user.createdAt,
        updatedAt:user.updatedAt
    }

    //return user data
    return {user:publicUser,token:accessToken}
};
