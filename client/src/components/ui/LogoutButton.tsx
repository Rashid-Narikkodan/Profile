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
    <button className="bg-purple-700 rounded-full px-6 py-3 font-bold text-sm text-white" onClick={handleLogout}> Logout </button>
  )
}

export default LogoutButton