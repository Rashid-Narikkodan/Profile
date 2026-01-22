import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "@/app/store";

const Landing = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();
  const handlePrimaryAction = () => {
    if (!user) {
      navigate("/auth");
    }else{
      navigate("/home");
    }
  };

  return (
    <div className="relative flex w-full h-screen items-center justify-center overflow-hidden rounded-xl bg-linear-to-br from-black via-gray-900 to-purple-900">

      {/* Background gradients */}
      <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-700 rounded-full blur-[140px] opacity-30" />
      <div className="absolute -bottom-50 -right-50 w-125 h-125 bg-indigo-700 rounded-full blur-[140px] opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-center px-6 py-20">
        <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
     
            <>
              Build & Manage Profiles with 
              <span className="text-purple-400 ml-2">Profile.io</span>
            </>
        </h1>

        <p className="text-gray-300 text-lg mb-10">
            A modern platform to manage user profiles, roles, and access — built for scale, security, and speed.
        </p>


        <button
          onClick={handlePrimaryAction}
          className="bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-lg text-lg font-semibold transition-all shadow-xl hover:shadow-purple-800/30"
        >
          {user ? "Go to Dashboard" : "Get Started"}
        </button>

        {!user && (
          <p className="mt-6 text-sm text-gray-400">
            Sign in to create an account or access your dashboard.
          </p>
        )}
      </div>
    </div>
  );
};

export default Landing;
