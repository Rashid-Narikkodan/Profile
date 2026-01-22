import { useNavigate } from "react-router-dom";
import type { PublicUser } from "../../../types/user";
import ActionButton from "./ActionButton";
import StatusBadge from "./StatusBadge";

const UserCard: React.FC<{
  user: PublicUser;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}> = ({ user, onDelete, onToggleStatus }) => {
  const userId = user._id;
  const navigate = useNavigate()

  return (
    <div className="bg-linear-to-b from-purple-950/80 to-gray-900/70 rounded-xl p-6 space-y-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-purple-300">{user.name}</h2>
        <StatusBadge           
        onClick={() => onToggleStatus(userId)} status={user.status} />
      </div>

      <div className="text-sm text-gray-400">{user.email}</div>
      <div className="capitalize text-gray-300 text-sm">{user.role}</div>

<div className="flex justify-between items-center">

      <div className="text-xs text-gray-500">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2 pt-2">
        <ActionButton
        label="View"
        onClick={()=>navigate(`/users/${userId}`)} 
        color="bg-cyan-600/50 border border-cyan-700"/>
        <ActionButton
          label="Delete"
          color="bg-red-500/90"
          onClick={() => onDelete(userId)}
          />
      </div>
          </div>
    </div>
  );
};
export default UserCard