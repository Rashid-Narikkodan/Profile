import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { fetchUser } from "../userState/user.thunk";

const Profile = () => {
  const user = useAppSelector((state) => state.user.data);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Profile Card */}
        <div className="rounded-2xl bg-purple-700 p-6 text-white shadow-lg flex flex-col justify-between">
          <div className="flex flex-col items-center text-center">
            <img
              src={user?.avatar?.url || "/avatar-placeholder.png"}
              alt={user?.name}
              className="h-24 w-24 rounded-full border-4 border-white object-cover"
            />

            <h2 className="mt-4 text-xl font-semibold">
              {user?.name || "—"}
            </h2>

            <p className="text-sm text-indigo-100 capitalize">
              {user?.role || "—"}
            </p>

            <span
              className={`mt-3 inline-block rounded-full px-3 py-1 text-xs font-medium ${
                user?.status === "active"
                  ? "bg-green-500/20 text-green-200"
                  : "bg-red-500/20 text-red-200"
              }`}
            >
              {user?.status || "—"}
            </span>
          </div>

          <div className="mt-8 border-t border-white/20 pt-4 text-sm text-indigo-100">
            <p>Member since</p>
            <p className="font-medium text-white">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString()
                : "—"}
            </p>
          </div>
        </div>

        {/* RIGHT: User Information */}
        <div className="md:col-span-2 rounded-2xl bg-white p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            User Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <InfoItem label="Full Name" value={user?.name || "—"} />
            <InfoItem label="Email" value={user?.email || "—"} />
            <InfoItem label="Phone" value={user?.phone || "—"} />
            <InfoItem label="Role" value={user?.role || "—"} />
            <InfoItem
              label="Account Status"
              value={user?.status || "—"}
              capitalize
            />
            <InfoItem
              label="Last Updated"
              value={
                user
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : "—"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({
  label,
  value,
  capitalize,
}: {
  label: string;
  value: string;
  capitalize?: boolean;
}) => {
  return (
    <div className="border-b border-gray-100 pb-2">
      <p className="text-sm text-gray-600">{label}</p>
      <p
        className={`mt-1 text-base font-medium text-gray-800 ${
          capitalize ? "capitalize" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
};

export default Profile;
