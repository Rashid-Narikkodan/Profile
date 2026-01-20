import type { LoginInput, RegisterInput } from "../../../types/auth"

export type RegisterErrors = Partial<Record<keyof RegisterInput, string>>
export type LoginError = Partial<Record<keyof LoginInput, string>>

export function validateRegister(data: RegisterInput): RegisterErrors {
  const errors: RegisterErrors = {}

  const { name, email, password, phone } = data

  /* ---------- Name ---------- */
  if (!name) {
    errors.name = "Name is required"
  } else if (name.length < 2 || name.length > 50) {
    errors.name = "Name must be between 2 and 50 characters"
  }

  /* ---------- Email ---------- */
  if (!email) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address"
  }

  /* ---------- Password ---------- */
  if (!password) {
    errors.password = "Password is required"
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain an uppercase letter"
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain a lowercase letter"
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain a number"
    } else if (!/[\W_]/.test(password)) {
      errors.password = "Password must contain a special character"
    }
  }

  /* ---------- Phone (optional) ---------- */
  if (phone && !/^\+?\d{10,15}$/.test(phone)) {
    errors.phone = "Invalid phone number format"
  }

  return errors
}


//login form
export function validateLogin(data: LoginInput): LoginError {
  const errors: RegisterErrors = {}

  const { email, password } = data

  /* ---------- Email ---------- */
  if (!email) {
    errors.email = "Email is required"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email address"
  }

  /* ---------- Password ---------- */
  if (!password) {
    errors.password = "Password is required"
  } else {
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters"
    } else if (!/[A-Z]/.test(password)) {
      errors.password = "Password must contain an uppercase letter"
    } else if (!/[a-z]/.test(password)) {
      errors.password = "Password must contain a lowercase letter"
    } else if (!/[0-9]/.test(password)) {
      errors.password = "Password must contain a number"
    } else if (!/[\W_]/.test(password)) {
      errors.password = "Password must contain a special character"
    }
  }
  return errors
}
