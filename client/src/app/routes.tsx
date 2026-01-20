import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Auth from "../features/auth/pages/Auth";
export const router = createBrowserRouter([
  {
    element: <MainLayout />, // layout here
    children: [
      { path: "/", element: <Landing /> },
      { path: "/auth", element: <Auth /> },
      { path: "/home", element: <Home /> },
    ],
  }
]);
