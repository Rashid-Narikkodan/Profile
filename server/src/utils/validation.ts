export const validatePassword = (password:string)=>{
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
}
export const validateEmail=(email:string)=>{
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) throw new Error("Invalid email address");
}
export const validatePhone=(phone?:string)=>{      
  if (phone && !/^\+?\d{10,15}$/.test(phone))
    throw new Error("Invalid phone number format");

}
