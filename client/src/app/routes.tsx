import { createBrowserRouter } from "react-router-dom"
import MainLayout from "@/components/layout/MainLayout"
import Landing from "@/pages/Landing"
import Home from "@/pages/Home"
import Auth from "@/pages/Auth"
import ProtoctedRoute from "@/routes/ProtectedRoute"
import PublicRoute from "@/routes/PublicRoute"
import Profile from "@/pages/Profile"
import Users from "@/pages/Users"

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
