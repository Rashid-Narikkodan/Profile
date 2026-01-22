import { AppError } from "../utils/AppError"
import { Response, Request, NextFunction } from "express"

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  const isAppError = err instanceof AppError
  const statusCode = isAppError ? err.statusCode : 500
  const message = isAppError ? err.message : 'Internal server error'

  console.log('--------------------------------')
  console.log('isAppError - ', isAppError)
  console.log('statusCode - ', statusCode)
  console.log('message - ',message)
  console.log('--------------------------------')
  console.log('error - ',err)
  console.log('--------------------------------')
  res.status(statusCode).json({
    success: false,
    message,
  })
}