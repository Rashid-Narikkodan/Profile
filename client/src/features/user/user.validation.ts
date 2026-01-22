import type { EditUserInput } from "@/types/user"

export type EditUserError = Partial<Record<keyof EditUserInput, string>>

export function validateEditInputs(data: EditUserInput): EditUserError {
  const errors: EditUserError = {}

  const { name, email, phone } = data

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

  /* ---------- Phone (optional) ---------- */
  if (phone && !/^\+?\d{10,15}$/.test(phone)) {
    errors.phone = "Invalid phone number format"
  }

  return errors
}


