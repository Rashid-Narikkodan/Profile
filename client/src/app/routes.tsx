import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout"
import Landing from "../pages/Landing"
import Home from "../pages/Home"
import Auth from "../features/auth/pages/Auth"
import ProtoctedRoute from "../components/ProtectedRoute"
import PublicRoute from "../components/PublicRoute"
import Profile from "../features/user/pages/Profile"
import Users from "../features/user/pages/Users"

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <Landing /> },
      {
        element: <PublicRoute />,
        children: [
          { path: "/auth", element: <Auth /> },
        ],
      },
      {
        element: <ProtoctedRoute />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/me", element: <Profile /> },
          { path: "/users", element: <Users /> },
          { path: "/users/:id", element: <Profile /> },
        ],
      },
    ],
  },
])
