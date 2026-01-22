// App.tsx
import { useEffect } from "react";
import { useAppDispatch } from "../hooks/redux";
import { bootstrapAuth } from "../features/auth/authState/auth.thunk";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(bootstrapAuth());
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default App;
