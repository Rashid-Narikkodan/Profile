import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../userState/user.thunk";
import { fetchUserByAdmin } from "../userState/admin.thunk";
import Loader from "../../../components/ui/Loader";
import { ArrowLeftCircle } from "lucide-react";
import ProfileDetails from "../components/ProfileDetails";
import ProfileCard from "../components/ProfileCard";
import { useNavigate, useParams } from "react-router-dom";
import { showToast } from "../../toastSlice";
import { BackgroundGlows } from "../components/BackgroundGlow";

export default function ProfilePage() {
const dispatch = useAppDispatch();

const { id } = useParams();
const isAdmin = Boolean(id);

const { data:user, fetchError, fetchStatus } = useAppSelector((state) =>
  isAdmin ? state.admin : state.user
);

const navigate = useNavigate();

useEffect(() => {
  if (isAdmin && id) {
    dispatch(fetchUserByAdmin(id)); // admin: fetch user by id
  } else {
    dispatch(fetchUser());    // normal: fetch own profile
  }
}, [dispatch, id, isAdmin]);

if (fetchStatus === "loading") {
  return <Loader fullScreen={true} />;
}

if (fetchError) {
  dispatch(showToast(fetchError, "error"));
  return null;
}

if (!user) {
  return null;
}


  return (
    <div className="min-h-screen w-screen rounded bg-gray-950 text-gray-100 relative overflow-hidden">
      <div className="absolute top-5 left-5 p-2">
      < ArrowLeftCircle onClick={()=>navigate(-1)} size={34}  />
      </div>
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
            <ProfileDetails user={user}/>
          </div>
        </div>
      </div>
    </div>
  );
}





