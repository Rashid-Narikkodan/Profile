import type { PublicUser } from "../../../types/user";
import ActionButton from "./ActionButton";
import StatusBadge from "./StatusBadge";

const UserCard: React.FC<{
  user: PublicUser;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}> = ({ user, onDelete, onToggleStatus }) => {
  const userId = user._id;
  return (
    <div className="bg-linear-to-b from-purple-950/80 to-gray-900/70 rounded-xl p-6 space-y-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-purple-300">{user.name}</h2>
        <StatusBadge status={user.status} />
      </div>

      <div className="text-sm text-gray-400">{user.email}</div>
      <div className="capitalize text-gray-300 text-sm">{user.role}</div>

      <div className="text-xs text-gray-500">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2 pt-2">
        <ActionButton
          label={user.status === "active" ? "Deactivate" : "Activate"}
          color="bg-indigo-600"
          onClick={() => onToggleStatus(userId)}
        />
        <ActionButton
          label="Delete"
          color="bg-red-600"
          onClick={() => onDelete(userId)}
        />
      </div>
    </div>
  );
};
export default UserCard