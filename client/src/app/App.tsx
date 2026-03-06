// App.tsx
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { bootstrapAuth } from "../features/auth/authState/auth.thunk";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import Loader from "@/components/ui/Loader";

const App = () => {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector((state) => state.auth.status);

  useEffect(() => {
    if (authStatus === "idle") {
      dispatch(bootstrapAuth());
    }
  }, [authStatus, dispatch]);

  if (authStatus === "idle" || authStatus === "loading") {
    return <Loader fullScreen className="bg-black/99 " />; // or null
  }

  return <RouterProvider router={router} />;
};


export default App;
