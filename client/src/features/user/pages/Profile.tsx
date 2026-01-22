import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../userState/user.thunk";
import Loader from "../../../components/ui/Loader";
import { ArrowLeftCircle } from "lucide-react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCard from "../components/ProfileCard";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../toastSlice";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { data: user, fetchError, fetchStatus } = useAppSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  if(!user) return

  if (fetchStatus === 'loading') return <Loader fullScreen={true} />;
  if (fetchError){
    dispatch(showToast(fetchError,'error'))
  } 

  return (
    <div className="min-h-screen w-screen rounded bg-gray-950 text-gray-100 relative overflow-hidden">
      < ArrowLeftCircle onClick={()=>navigate(-1)} size={34} className="absolute top-5 left-5" />
      {/* Background Glows */}
      <BackgroundGlows />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Profile Card */}
          <div className="lg:col-span-4">
            <ProfileCard user={user} />
          </div>

          {/* Right: Profile Details */}
          <div className="lg:col-span-8">
            <ProfileDetails/>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------- Background Glows --------------------- */
export const BackgroundGlows = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 -left-40 w-125 h-125 bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-40 -right-40 w-160 h-125 bg-indigo-700/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
  </div>
);



