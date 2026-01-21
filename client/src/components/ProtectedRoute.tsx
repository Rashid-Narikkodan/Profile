import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"
import Loader from "./ui/Loader"

const ProtectedRoute = () => {
  const status = useAppSelector((state) => state.auth.status)

  // 1. Wait until bootstrapAuth resolves
  if ( status === "loading") {
    return <Loader /> // show a spinner or blank screen
  }

  // 2. Only redirect if user is truly unauthenticated
  if (status === "unauthenticated") {
    return <Navigate to="/auth" replace />
  }

  // 3. Authenticated → render protected routes
  return <Outlet />
}

export default ProtectedRoute
