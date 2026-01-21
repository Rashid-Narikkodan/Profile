import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../userState/user.thunk";
import Loader from "../../../components/ui/Loader";
import { BiLeftArrow } from "react-icons/bi";

export default function ProfilePage() {
  const dispatch = useAppDispatch();
  const { data: user, error, status } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!user) dispatch(fetchUser());
  }, [dispatch, user]);

  if(!user) return

  if (status === 'loading') return <Loader />;
  if (error) return <ErrorState />;

  return (
    <div className="min-h-screen w-screen rounded bg-gray-950 text-gray-100 relative overflow-hidden">
      <BiLeftArrow />
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
            <ProfileDetails user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}


/* --------------------- Error --------------------- */
const ErrorState = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 text-red-400">
    Failed to load profile
  </div>
);

/* --------------------- Background Glows --------------------- */
const BackgroundGlows = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-700/20 rounded-full blur-3xl animate-pulse-slow" />
    <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-indigo-700/15 rounded-full blur-3xl animate-pulse-slow delay-1000" />
    <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-fuchsia-600/10 rounded-full blur-3xl animate-pulse-slow delay-2000" />
  </div>
);

/* --------------------- Profile Card --------------------- */
type ProfileCardProps = {
  user: {
    avatar?: { url?: string };
    name?: string;
    role?: string;
    status?: string;
    createdAt?: string | Date;
  };
};
const ProfileCard = ({ user }: ProfileCardProps) => (
  <div className="bg-gradient-to-b from-purple-900/60 to-indigo-950/70 backdrop-blur-xl
                  rounded-3xl border border-white/10 shadow-2xl
                  p-10 text-center max-w-md mx-auto">
    {/* Avatar */}
    <div className="relative mx-auto w-40 h-40 mb-8">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 blur-2xl opacity-50 animate-pulse" />
      <img
        src={
          user?.avatar?.url ||
          "https://ui-avatars.com/api/?name=User&background=6b46c1&color=fff&size=160"
        }
        alt={user?.name || "User"}
        className="relative w-40 h-40 rounded-full object-cover
                   border-4 border-indigo-500/40 shadow-xl"
      />
    </div>

    {/* Name */}
    <h1 className="text-3xl font-bold mb-1 tracking-tight">
      {user?.name || "———"}
    </h1>

    {/* Role */}
    <p className="text-indigo-300/90 text-lg font-medium mb-5 capitalize">
      {user?.role || "—"}
    </p>

    {/* Status */}
    <StatusBadge status={user?.status} />

    {/* Meta */}
    <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400">
      <div className="flex justify-between">
        <span>Member since</span>
        <span className="text-gray-200">
          {user?.createdAt
            ? new Date(user.createdAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })
            : "—"}
        </span>
      </div>
    </div>
  </div>
);


/* --------------------- Status Badge --------------------- */
const StatusBadge = ({ status }: { status?: string }) => {
  const isActive = status === "active";
  return (
    <div
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium ${
        isActive
          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
          : "bg-rose-500/20 text-rose-300 border border-rose-500/30"
      }`}
    >
      <span
        className={`w-2 h-2 rounded-full ${isActive ? "bg-emerald-400" : "bg-rose-400"} animate-pulse`}
      />
      {status || "unknown"}
    </div>
  );
};

/* --------------------- Profile Details --------------------- */
type ProfileDetailsProps = {
  user: {
    name?: string;
    email?: string;
    phone?: string;
    role?: string;
    status?: string;
    updatedAt?: string | Date;
  };
};
const ProfileDetails = ({ user }: ProfileDetailsProps) => (
  <div
    className="bg-gradient-to-br from-purple-950/50 via-indigo-950/50 to-gray-950/70
               backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl
               p-12"
  >
    <h2 className="text-3xl font-semibold mb-10 bg-gradient-to-r from-indigo-300 to-purple-300 bg-clip-text text-transparent">
      Profile Information
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
      <InfoField label="Full Name" value={user?.name} />
      <InfoField label="Email Address" value={user?.email} />
      <InfoField label="Phone Number" value={user?.phone} />
      <InfoField label="Role" value={user?.role} capitalize />
      <InfoField label="Account Status" value={user?.status} capitalize />
      <InfoField
        label="Last Updated"
        value={
          user?.updatedAt
            ? new Date(user.updatedAt).toLocaleString('en-GB', {
                dateStyle: 'medium',
                timeStyle: 'short',
              })
            : '—'
        }
      />
    </div>
    <div className="mt-10 pt-6 border-t border-white/10 text-sm text-gray-400">
      <div className="flex justify-end">
       <button className="bg-purple-700 p-3 rounded text-white font-bold">Edit Profile</button>
      </div>
    </div>
  </div>
);

/* --------------------- Info Field --------------------- */
type InfoFieldProps = {
  label: string;
  value?: string;
  capitalize?: boolean;
  type?: "text" | "email" | "phone";
};

const InfoField = ({ label, value = '—', capitalize = false }: InfoFieldProps) => (
  <div className="space-y-2">
    <dt className="text-sm tracking-wide text-indigo-200/80 font-medium">
      {label}
    </dt>
    <dd
      className={`text-lg font-medium text-gray-100 break-words ${
        capitalize ? 'capitalize' : ''
      }`}
    >
      {value||'Not Available'}
    </dd>
  </div>
);
