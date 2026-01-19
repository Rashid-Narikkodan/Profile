import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store/type";

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (!user) return null; // protected route already handles redirect

  return (
    <div className="w-full h-full">

      {/* Page shell */}
      <div className="relative w-full h-full rounded-xl overflow-hidden bg-linear-to-br from-black via-gray-900 to-purple-900">

        {/* Ambient glow */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] bg-purple-700 rounded-full blur-[120px] opacity-25" />
        <div className="absolute -bottom-37.5 right-[-150px] w-[400px] h-[400px] bg-indigo-700 rounded-full blur-[120px] opacity-20" />

        {/* Content */}
        <div className="relative z-10 p-10 flex flex-col gap-10">

          {/* Welcome */}
          <div>
            <h1 className="text-4xl font-bold text-white">
              Welcome, <span className="text-purple-400">{user.name}</span>
            </h1>
            <p className="text-gray-300 mt-2">
              You are logged in as <span className="text-purple-300 font-medium">{user.role}</span>
            </p>
          </div>

          {/* Primary actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {/* Profile */}
            <div className="bg-gray-900/70 backdrop-blur border border-purple-800/40 rounded-xl p-6 hover:border-purple-500 transition">
              <h3 className="text-xl font-semibold text-white mb-2">
                Your Profile
              </h3>
              <p className="text-gray-400 mb-4">
                View and manage your account information and security.
              </p>
              <button
                onClick={() => navigate("/profile")}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white transition"
              >
                Open Profile
              </button>
            </div>

            {/* Admin: Users */}
            {user.role === "admin" && (
              <div className="bg-gray-900/70 backdrop-blur border border-purple-800/40 rounded-xl p-6 hover:border-purple-500 transition">
                <h3 className="text-xl font-semibold text-white mb-2">
                  User Management
                </h3>
                <p className="text-gray-400 mb-4">
                  Create, update, block and manage system users.
                </p>
                <button
                  onClick={() => navigate("/users")}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white transition"
                >
                  Manage Users
                </button>
              </div>
            )}

            {/* Admin: Settings */}
            {user.role === "admin" && (
              <div className="bg-gray-900/70 backdrop-blur border border-purple-800/40 rounded-xl p-6 hover:border-purple-500 transition">
                <h3 className="text-xl font-semibold text-white mb-2">
                  System Settings
                </h3>
                <p className="text-gray-400 mb-4">
                  Configure roles, permissions, and platform behavior.
                </p>
                <button
                  onClick={() => navigate("/settings")}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded text-white transition"
                >
                  Open Settings
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
