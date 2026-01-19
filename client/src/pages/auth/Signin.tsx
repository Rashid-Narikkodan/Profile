import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../../store/authSlice";
import { login } from "../../api/auth";
import { useAppSelector } from "../../store/hooks";

type Props = {
  onClose: () => void;
  onOpenRegister: () => void;
};

const SigninModal: React.FC<Props> = ({ onClose, onOpenRegister }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useAppSelector((state)=>state.auth)

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    dispatch(loginStart());

    try {
      const payload = await login(form);
      dispatch(loginSuccess(payload));
      navigate("/home");
      onClose();
    } catch (err: unknown) {
      dispatch(
        loginFailure(
          err instanceof Error ? err.message : "Login failed"
        )
      );
    }
  };

  const handleOpenRegister = () => {
    onOpenRegister();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-linear-to-br from-gray-900 via-purple-900/40 to-gray-900 border border-purple-800/40 shadow-2xl">
        {/* Glow */}
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-700 rounded-full blur-3xl opacity-30" />

        <div className="relative p-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            Welcome back
          </h2>

          <p className="text-gray-400 mb-6">
            Sign in to continue securely.
          </p>

          {error && (
            <div className="mb-4 rounded bg-red-900/40 border border-red-700 text-red-200 px-4 py-2 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed py-2 rounded text-white font-medium shadow-lg shadow-purple-800/40 transition"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <button
              onClick={handleOpenRegister}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              Create profile
            </button>
          </p>

          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
};

export default SigninModal;
