import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerStart,registerFailure,registerSuccess } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { register } from "../../api/auth";

const RegisterModal: React.FC<{ onClose: () => void,onOpenLogin:()=>void }> = ({ onClose,onOpenLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(registerStart());

    register(form)
  .then(user => dispatch(registerSuccess(user)))
  .catch(err => dispatch(registerFailure(err.message)));
    navigate("/home");
    onClose();
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
            </div>

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

            <div>
              <label className="text-gray-300 text-sm">Phone (optional)</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-purple-800/40 text-white px-4 py-2 rounded focus:outline-none focus:border-purple-500"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 py-2 rounded text-white font-medium shadow-lg shadow-purple-800/40 transition"
            >
              Create Account
            </button>

          </form>

          <p className="mt-6 text-sm text-gray-400 text-center">
            Already have an account?{" "}
            <button
              onClick={()=>{onOpenLogin()}}
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
