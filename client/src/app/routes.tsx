import { createBrowserRouter } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout"
import Landing from "../pages/Landing"
import Home from "../pages/Home"
import Auth from "../features/auth/pages/Auth"
import RequireAuth from "../components/RequireAuth"
import PublicOnly from "../components/PublicOnly"

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        element: <PublicOnly />,
        children: [
          { path: "/auth", element: <Auth /> },
          { path: "/", element: <Landing /> },
        ],
      },

      {
        element: <RequireAuth />,
        children: [
          { path: "/home", element: <Home /> },
        ],
      },
    ],
  },
])
