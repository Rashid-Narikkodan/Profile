import { useEffect, useRef, useState } from "react";
import LogoutButton from "../../../components/ui/LogoutButton";
import StatusBadge from "./StatusBadge";
import { deleteAvatar, uploadUserAvatar } from "../userState/user.thunk";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Loader from '../../../components/ui/Loader'
import { Trash } from "lucide-react";
import Tooltip from "../../../components/ui/ToolTip";
import { showToast } from "../../toastSlice";

/* --------------------- Constants --------------------- */
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

/* --------------------- Types --------------------- */
type ProfileCardProps = {
  user: {
    avatar?: { url?: string };
    name?: string;
    role?: string;
    status?: string;
    createdAt?: string | Date;
  };
};

/* --------------------- Component --------------------- */
const ProfileCard = ({ user }: ProfileCardProps) => {
  const dispatch = useAppDispatch();
  const {avatarError,avatarStatus}=useAppSelector(state=>state.user)
  const isUploading = avatarStatus === 'loading'
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* --------------------- Helpers --------------------- */
  const resetSelection = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
  };

  const validateFile = (file: File): string | null => {
    if (!file.type.startsWith("image/")) {
      return "Only image files are allowed";
    }
    if (file.size > MAX_FILE_SIZE) {
      return "Image size must be less than 2MB";
    }
    return null;
  };

  /* --------------------- Handlers --------------------- */
  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    const selectedFile = fileInputRef.current?.files?.[0];
    if (!selectedFile) return;

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      resetSelection();
      return;
    }

    setError(null);
    resetSelection(); // cleanup previous preview if any

    const previewUrl = URL.createObjectURL(selectedFile);
    setFile(selectedFile);
    setPreview(previewUrl);
  };

  const handleAvatarSave = async () => {
    if (!file) return;

    const result = await dispatch(uploadUserAvatar(file));

    if (uploadUserAvatar.fulfilled.match(result)) {
      resetSelection();
    } else {
      dispatch(showToast("Avatar upload failed",'error'));
    }
  };

  const handleAvatarCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    resetSelection();
  };
  
  const handleDeleteAvatar = (e: React.MouseEvent<HTMLButtonElement>) => {
  e.stopPropagation();
  e.preventDefault();

  const confirmDelete = window.confirm("Are you sure you want to delete your avatar?");
  if (!confirmDelete) return;

  dispatch(deleteAvatar());
};


  /* --------------------- Cleanup --------------------- */
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  if(avatarError){
    dispatch(showToast(avatarError),'error')
  }

  /* --------------------- Render --------------------- */
  return (
    <div
      className="bg-linear-to-b from-purple-900/60 to-indigo-950/70 backdrop-blur-xl
                 rounded-3xl border border-white/10 shadow-2xl
                 p-10 text-center max-w-md mx-auto"
    >
      {error && (
        <div className="bg-red-400/70 border border-red-800 rounded p-4 mb-2">
          {error}
        </div>
      )}

    {/* Avatar */}
<button
  type="button"
  disabled={isUploading}
  onClick={handleAvatarClick}
  className={`relative mx-auto w-40 h-40 mb-8 rounded-full
             cursor-pointer disabled:cursor-not-allowed`}
>
  {/* Hidden file input */}
  <input
    ref={fileInputRef}
    type="file"
    className="hidden"
    accept="image/*"
    onChange={handleFileChange}
    disabled={isUploading}
  />

  {/* Glow background */}
  <Tooltip content="Click to add new avatar">
  <div className="absolute inset-0 rounded-full bg-linear-to-br
                  from-purple-500 to-indigo-600 blur-2xl
                  opacity-50 animate-pulse" />

  {/* Avatar image */}
  <img
    loading="lazy"
    src={
      preview ||
      user?.avatar?.url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user.name || "User"
      )}&background=6b46c1&color=fff&size=160`
    }
    alt={user?.name || "User"}
  className={`relative z-10 w-40 h-40 rounded-full object-cover
              border-4 border-indigo-500/40 shadow-xl
              ${isUploading ? "opacity-60" : ""}`}
              />
              </Tooltip>

  {/* Uploading overlay */}
{isUploading && (
  <div
    className="absolute inset-0 z-20 flex items-center justify-center
               bg-black/40 rounded-full"
    aria-busy="true"
  >
    <Loader />
  </div>
)}
{
user.avatar?.url &&
<button onClick={handleDeleteAvatar} className=" absolute bottom-1 right-1 bg-red-400 roudned p-2 rounded-full z-20">
<Tooltip content="Delete Avatar">
<Trash/>
</Tooltip>
</button>
}

</button>


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
