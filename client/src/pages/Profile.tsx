import { ArrowLeftCircle } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchUser } from "@/features/user/userState/user.thunk";
import Loader from "@/components/ui/Loader";
import { fetchUserByAdmin } from "@/features/user/adminState/admin.thunk";
import ProfileCard from "@/features/user/components/ProfileCard";
import ProfileDetails from "@/features/user/components/ProfileDetails";
import { BackgroundGlows } from "@/features/user/components/BackgroundGlow";


export default function Profile() {
const dispatch = useAppDispatch();

const { id } = useParams();
const isAdmin = Boolean(id);

const { data:user, fetchStatus } = useAppSelector((state) =>
  isAdmin ? state.admin : state.user
);


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

if (!user) {
  return null;
}


  return (
    <div className="min-h-screen w-screen rounded bg-gray-950 text-gray-100 relative overflow-hidden">
      <Link to={`${isAdmin?"/users":"/home"}`} >
      <div className="absolute top-5 left-5 p-2">
      < ArrowLeftCircle  size={34}  />
      </div>
      </Link>
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





