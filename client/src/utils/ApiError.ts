// src/utils/normalizeApiError.ts
import axios from "axios";

type BackendError = {
  success: false;
  message: string;
};

export function normalizeApiError(error: unknown): string {
  if (axios.isAxiosError<BackendError>(error)) {
    return error.response?.data?.message ?? "Request failed";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred";
}
