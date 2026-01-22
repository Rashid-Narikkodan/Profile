import React, { useState } from "react";
import Signin from "@/features/auth/components/Signin";
import Register from "@/features/auth/components/Register";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "@/hooks/redux";

const Auth: React.FC = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
    const navigate = useNavigate()
    const user = useAppSelector(state=>state.auth.user)
    if(user){
      navigate('/home')
    }
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-black via-gray-900 to-purple-900 relative overflow-hidden">

      {/* Ambient glows */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-700 rounded-full blur-[140px] opacity-30" />
      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-indigo-700 rounded-full blur-[140px] opacity-20" />

      {/* Auth Card */}
      <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-xl border border-purple-800/40 rounded-xl shadow-2xl p-8">

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            {mode === "login" ? "Sign in to Profile.io" : "Create your account"}
          </h1>
          <p className="text-gray-400 mt-2">
            {mode === "login"
              ? "Access your dashboard and manage your system"
              : "Start managing profiles and roles securely"}
          </p>
        </div>

        {/* Forms */}
        {mode === "login" ? <Signin onClose={()=>navigate('/')} onOpenRegister={()=>setMode('register')}/> : <Register onClose={()=>navigate('/')} onOpenLogin={()=>setMode('login')}/>}

        {/* Switch */}
        <div className="mt-6 text-center text-sm text-gray-400">
          {mode === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={() => setMode("register")}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Create one
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={() => setMode("login")}
                className="text-purple-400 hover:text-purple-300 transition"
              >
                Sign in
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
};

export default Auth;
