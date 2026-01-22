import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";
import Tooltip from "../ui/ToolTip";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useAppSelector((state) => state.auth.user);

  const isHome = location.pathname === "/home";

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
          <Link to="/home" className="hover:text-white transition">
            Home
          </Link>

          {user?.role === "admin" && (
            <>
              <Link to="/users" className="hover:text-white transition">
                Users
              </Link>
            </>
          )}
        </nav>

        {/* Actions */}
        {!user && (
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/auth")}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-1 rounded font-medium shadow-lg shadow-purple-800/40 transition"
            >
              Sign In
            </button>
          </div>
        )}

        {user && (
          <Link to={'/me'}>
          <Tooltip content="Profile">
            <div
              className="absolute inset-0 rounded-full bg-linear-to-br
                  from-purple-500 to-indigo-600 blur-2xl
                  opacity-50 animate-pulse"
            />

            {/* Avatar image */}
            <img
              loading="lazy"
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.name || "User",
              )}&background=6b46c1&color=fff&size=16`}
              alt={user?.name || "User"}
              className={`relative z-10 w-12 h-12 rounded-full object-cover
                border-4 border-indigo-500/40 shadow-xl`}
                />
          </Tooltip>
                </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
