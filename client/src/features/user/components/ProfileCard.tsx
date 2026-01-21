import LogoutButton from "../../../components/ui/LogoutButton";
import StatusBadge from "./StatusBadge";

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
  <div className="bg-linear-to-b from-purple-900/60 to-indigo-950/70 backdrop-blur-xl
                  rounded-3xl border border-white/10 shadow-2xl
                  p-10 text-center max-w-md mx-auto">
    {/* Avatar */}
    <div className="relative mx-auto w-40 h-40 mb-8">
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 blur-2xl opacity-50 animate-pulse" />
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
      <LogoutButton />
    </div>
  </div>
);

export default ProfileCard