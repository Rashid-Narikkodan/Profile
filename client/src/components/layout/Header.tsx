import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import type { RootState } from "../../store/type";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.auth.user);

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth");
  };

  return (
    <header
      className={`
        bg-gray-900
        text-gray-200
        border-b border-purple-800/40
        backdrop-blur-md
        ${isHome ? "bg-linear-to-r from-gray-900 via-purple-900/40 to-gray-900" : ""}
      `}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

        {/* Logo */}
        <div className="text-2xl font-semibold tracking-wide text-white">
          Profile.io
        </div>

        {/* Nav */}
        <nav className="flex space-x-6">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/users" className="hover:text-white transition">
                Users
              </Link>
              <Link to="/settings" className="hover:text-white transition">
                Settings
              </Link>
            </>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-300">{user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-gray-800 hover:bg-gray-700 px-4 py-1 rounded transition"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate("/auth")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded font-medium shadow-lg shadow-purple-800/40 transition"
            >
              Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
};

export default Header;
