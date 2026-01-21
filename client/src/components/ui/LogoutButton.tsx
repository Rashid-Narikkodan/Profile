import { useNavigate } from "react-router-dom"
import { logoutUser } from "../../features/auth/authState/auth.thunk"
import { useAppDispatch } from "../../hooks/redux"

const LogoutButton = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <button className="bg-purple-700 rounded-md px-8 py-3" onClick={handleLogout}> Logout </button>
  )
}

export default LogoutButton