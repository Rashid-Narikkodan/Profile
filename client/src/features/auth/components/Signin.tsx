import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BsEye, BsEyeSlash } from "react-icons/bs";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginUser } from "../authState/auth.thunk";
import { validateLogin, type LoginError } from "../auth.validation";

type Props = {
  onClose: () => void;
  onOpenRegister: () => void;
};

const SigninModal: React.FC<Props> = ({ onClose, onOpenRegister }) => {
  /* ================= Redux ================= */
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { status, loginError: error } = useAppSelector(
    (state) => state.auth
  );

  const isLoading = status === "loading";

  /* ================= Local State ================= */
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginError|null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  /* ================= Handlers ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const nextForm = { ...form, [name]: value };
    setForm(nextForm);

    if (hasSubmitted) {
      const validationErrors = validateLogin(nextForm);
      setErrors(
        Object.keys(validationErrors).length ? validationErrors : null
      );
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true);

    const validationErrors = validateLogin(form);
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors(null);

    const result = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(result)) {
      onClose();
      navigate("/home");
    }
  };

  /* ================= Render ================= */
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-xl bg-linear-to-br from-gray-900 via-purple-900/40 to-gray-900 border border-purple-800/40 shadow-2xl">
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
            {/* Email */}
            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full bg-gray-800 border text-white px-4 py-2 rounded focus:outline-none ${
                  errors?.email
                    ? "border-red-500"
                    : "border-purple-800/40 focus:border-purple-500"
                }`}
              />
              {errors?.email && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-300 text-sm">Password</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border text-white px-4 py-2 rounded focus:outline-none ${
                    errors?.password
                      ? "border-red-500"
                      : "border-purple-800/40 focus:border-purple-500"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-white"
                >
                  {showPassword ? <BsEye size={22} /> : <BsEyeSlash size={22} />}
                </button>
              </div>

              {errors?.password && (
                <p className="text-red-400 text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-4 bg-purple-600 ${
                isLoading ? "bg-purple-800" : "hover:bg-purple-700"
              } disabled:opacity-50 py-2 rounded text-white font-medium transition`}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Don’t have an account?{" "}
            <button
              onClick={onOpenRegister}
              className="text-purple-400 hover:text-purple-300 underline"
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
