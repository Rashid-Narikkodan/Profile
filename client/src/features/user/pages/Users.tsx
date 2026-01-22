import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Pagination from "../../../components/ui/Pagination";
import UserCard from "../components/UserCard";
import RegisterModal from "../../auth/components/Register";
import {
  fetchUsers,
  deleteUser,
  toggleStatus,
} from "../userState/user.thunk";

/* ======================= UI COMPONENTS ======================= */

// const StatusBadge: React.FC<{ status: "active" | "inactive" }> = ({ status }) => (
//   <span
//     className={`px-3 py-1 rounded-full text-xs font-medium ${
//       status === "active"
//         ? "bg-green-600/30 text-green-400"
//         : "bg-red-600/30 text-red-400"
//     }`}
//   >
//     {status}
//   </span>
// );




/* ======================= CONTAINER ======================= */

const Users: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, fetchStatus, fetchError, meta } = useAppSelector(
    (state) => state.admin
  );

  /* ---------- Query State ---------- */
  const [search, setSearch] = useState("");
  const [hasAddUser, setHasAddUser] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);

  /* ---------- Debounce Search ---------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timer);
  }, [search]);

  /* ---------- Fetch Users ---------- */
  useEffect(() => {
    dispatch(
      fetchUsers({
        search: debouncedSearch,
        page,
        limit,
      })
    );
  }, [debouncedSearch, page, limit]);

  /* ---------- Actions ---------- */
  const handleDelete = (id: string) => {
    if (confirm("Delete this user?")) {
      dispatch(deleteUser(id));
    }
  };

  const handleToggleStatus = (id: string) => {
    dispatch(toggleStatus(id));
  };


  const handleAddUser=()=>{
    setHasAddUser(true)
  }

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-gray-900 via-purple-950 to-black text-white p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-purple-400">Users</h1>

        <div className="flex justify-end gap-6 items-center">
          <input
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search users..."
            className="px-4 py-3 rounded-lg bg-gray-800 border border-purple-500 text-white focus:border focus:border-purple-700"
          />
          <div className="border-r-2 border-r-white py-6">
            </div>
          <button onClick={handleAddUser} className="bg-purple-600 rounded-md px-6 py-3 text-white font-bold"> Add User </button>
        </div>
        </div>

        {/* Content */}
        {fetchStatus === "loading" && (
          <p className="text-center text-gray-400">Loading users...</p>
        )}

        {fetchStatus === "failed" && (
          <p className="text-center text-red-400">{fetchError}</p>
        )}

        {fetchStatus === "succeeded" && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.length > 0 ? (
                users.map((user) => (
                  <UserCard
                    key={user._id}
                    user={user}
                    onDelete={handleDelete}
                    onToggleStatus={handleToggleStatus}
                  />
                ))
              ) : (
                <p className="col-span-full text-center text-gray-400">
                  No users found
                </p>
              )}
            </div>

            <Pagination
              page={page}
              limit={limit}
              total={Number(meta?.total||0)}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
      {hasAddUser? <RegisterModal onClose={()=>setHasAddUser(false)} role={'admin'} />:''}
    </div>
  );
};

export default Users;
