import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../Provider/Authprovider";

export default function UsersPage() {
  const { role } = useContext(AuthContext); // admin | teacher | student
  const [users, setUsers] = useState([]);
  const auth = getAuth();

  // Fetch users (only admin)
  useEffect(() => {
    const fetchUsers = async () => {
      if (role !== "admin") return;

      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`http://localhost:5000/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to fetch users.", "error");
      }
    };

    fetchUsers();
  }, [role]);

  // Delete user
  const handleDelete = async (uid, email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Delete user ${email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`http://localhost:5000/users/${uid}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setUsers(users.filter(u => u.uid !== uid));
          Swal.fire("Deleted!", `${email} has been deleted.`, "success");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  if (role !== "admin") {
    return <p className="text-center text-red-500 mt-10">❌ You are not authorized to view this page.</p>;
  }

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">👥 Users Management</h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border-collapse border border-gray-300 text-sm md:text-base">
            <thead className="bg-gray-200">
              <tr className="text-center">
                <th className="border p-2">Photo</th>
                <th className="border p-2">NAME</th>
                <th className="border p-2">UID</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.uid} className="text-center hover:bg-gray-50">
                  <td className="border p-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mx-auto"
                      />
                    ) : (
                      <span>❌</span>
                    )}
                  </td>
                  <td className="border p-2 break-all">{user.name}</td>
                  <td className="border p-2 break-all">{user.uid}</td>
                  <td className="border p-2 break-all">{user.email}</td>
                  <td className="border p-2">{user.role || "user"}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(user.uid, user.email)}
                      className="bg-red-500 text-white px-2 md:px-3 py-1 rounded hover:bg-red-600 text-xs md:text-sm"
                    >
                      🗑 Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
