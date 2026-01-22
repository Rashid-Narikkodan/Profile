import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../hooks/redux"

const PublicRoute = () => {
  
  const status = useAppSelector((state) => state.auth.status)

  if (status === "authenticated") {
    return <Navigate to="/home" replace />
  }

  return <Outlet />
}

export default PublicRoute
