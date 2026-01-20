import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

const RequireAuth = () => {
  const status = useAppSelector((state) => state.auth.status)

  if (status !== "authenticated") {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default RequireAuth
