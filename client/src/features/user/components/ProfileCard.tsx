import { useRef, useState } from "react";
import LogoutButton from "../../../components/ui/LogoutButton";
import StatusBadge from "./StatusBadge";
import { uploadUserAvatar } from "../userState/user.thunk";
import { useAppDispatch } from "../../../hooks/redux";

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
const ProfileCard = ({ user }: ProfileCardProps) => {
const dispatch = useAppDispatch()
const [preview, setPreview] = useState<string | null>(null);
const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement|null>(null)
const handleFileChange = () => {
  const selectedFile =fileInputRef.current?.files?.[0];
  if (!selectedFile) return;

  // validation
  if (!selectedFile.type.startsWith("image/")) return;
  if (selectedFile.size > 2 * 1024 * 1024) return;

  const previewUrl = URL.createObjectURL(selectedFile);

  setFile(selectedFile);
  setPreview(previewUrl);
};

  const handleAvatarClick = () => {
  fileInputRef.current?.click();
  };
const handleAvatarSave = async () => {
  if (!file) return;
  await dispatch(uploadUserAvatar(file))

  URL.revokeObjectURL(preview!);
  setPreview(null);
  setFile(null);
};
const handleAvatarCancel = (
  e: React.MouseEvent<HTMLButtonElement>
) => {
  e.stopPropagation(); // ✅ stops bubbling
  e.preventDefault();  // optional, for buttons in forms

  if (preview) URL.revokeObjectURL(preview);
  setPreview(null);
  setFile(null);
};


  return (
    <div
      className="bg-linear-to-b from-purple-900/60 to-indigo-950/70 backdrop-blur-xl
                  rounded-3xl border border-white/10 shadow-2xl
                  p-10 text-center max-w-md mx-auto"
    >
      {/* Avatar */}
      <div
        onClick={handleAvatarClick}
        className="relative mx-auto w-40 h-40 mb-8"
      >
        <input
        ref={fileInputRef} 
        type="file" 
        className="hidden"
        accept="image/*"
        onChange={handleFileChange}
        />
        <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-500 to-indigo-600 blur-2xl opacity-50 animate-pulse" />
        <img
        loading="lazy"
          src={preview||
            user?.avatar?.url ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || "User")}&background=6b46c1&color=fff&size=160`
          }
          alt={user?.name || "User"}
          className="relative z-1000 w-40 h-40 rounded-full object-cover
                   border-4 border-indigo-500/40 shadow-xl"
        />
    </div>
        {preview && (
  <div className="flex justify-center gap-4 -mt-2 mb-3">

    <button
      onClick={handleAvatarCancel}
      className="px-4 py-2 text-sm rounded-lg bg-gray-700 hover:bg-gray-600"
    >
      Cancel
    </button>
    <button
      onClick={handleAvatarSave}
      className="px-4 py-2 text-sm rounded-lg bg-purple-600 hover:bg-indigo-500"
    >
      Save
    </button>
  </div>
)}


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
        <div className="mt-2">
          <LogoutButton />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
