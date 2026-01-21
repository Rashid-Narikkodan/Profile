import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { registerUser } from "../authState/auth.thunk";
import { useNavigate } from "react-router-dom";
import {
  validateRegister,
  type RegisterErrors,
} from "../auth.validation";

const RegisterModal: React.FC<{
  onClose: () => void;
  onOpenLogin: () => void;
}> = ({ onClose, onOpenLogin }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const [showPassowrd, setShowPassword] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [errors, setErrors] = useState<RegisterErrors>({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();
  const isLoading = useAppSelector((state) => state.auth.status === "loading");
  const dispatch = useAppDispatch();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if(hasSubmitted){
    const validationErrors = validateRegister(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
      }else{
        setErrors({})
      }
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmitted(true)
    const validationErrors = validateRegister(form);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }
    setErrors({});
    const result = await dispatch(registerUser(form));

    if (registerUser.fulfilled.match(result)) {
      navigate("/home");
      onClose();
    }
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
            Create your account
          </h2>

          <p className="text-gray-400 mb-6">
            Start managing profiles and access securely.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-gray-300 text-sm">Full name</label>
              <input
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              />
              {errors.name && (
                <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Email</label>
              <input
                name="email"
                // type="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none ${errors.email ? "focus:border-red-500" : "focus:border-purple-500"}`}
              />
              {errors.email && (
                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Password</label>

              <div className="relative">
                <input
                  name="password"
                  type={`${showPassowrd ? "text" : "password"}`}
                  required
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none ${errors.password ? "focus:border-red-500" : "focus:border-purple-500"}`}
                />
                {
                  showPassowrd ?
                  <BsEye
                  onClick={() => setShowPassword(!showPassowrd)}
                  className="absolute top-3 right-3"
                  size={24}
                  />:
                  <BsEyeSlash
                  onClick={() => setShowPassword(!showPassowrd)}
                  className="absolute top-3 right-3"
                  size={24}
                  />
                }
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <label className="text-gray-300 text-sm">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className={`w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none ${errors.phone ? "focus:border-red-500" : "focus:border-purple-500"}`}
              />
              {errors.phone && (
                <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className={`w-full mt-4 ${isLoading ? "bg-purple-800" : "bg-purple-600 hover:bg-purple-700"} py-2 rounded text-white font-medium shadow-lg shadow-purple-800/40 transition`}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              onClick={() => {
                onOpenLogin();
              }}
              className="text-purple-400 hover:text-purple-300 underline underline-offset-2"
            >
              Sign in
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

export default RegisterModal;
