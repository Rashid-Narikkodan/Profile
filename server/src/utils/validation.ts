
import { AppError } from "./AppError";

export const validatePassword = (password:string)=>{
     if (password.length < 8)
        throw new AppError("Password must be at least 8 characters",400);
      if (!/[A-Z]/.test(password))
        throw new AppError("Password must contain at least one uppercase letter",400);
      if (!/[a-z]/.test(password))
        throw new AppError("Password must contain at least one lowercase letter",400);
      if (!/[0-9]/.test(password))
        throw new AppError("Password must contain at least one number",400);
      if (!/[\W_]/.test(password))
        throw new AppError("Password must contain at least one special character",400);
}
export const validateEmail=(email:string)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email address");
}
export const validatePhone=(phone?:string)=>{      
  if (phone && !/^\+?\d{10,15}$/.test(phone))
    throw new Error("Invalid phone number format");

}
