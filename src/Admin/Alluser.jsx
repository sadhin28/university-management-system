import { useEffect, useState, useContext } from "react";
import Swal from "sweetalert2";
import { getAuth } from "firebase/auth";
import { AuthContext } from "../Provider/Authprovider";
import { Link, useLoaderData } from "react-router-dom";

export default function UsersPage() {
  const studentsData = useLoaderData();
  const [students, setStudent] = useState();

  useEffect(() => {
    setStudent(studentsData);
  }, [studentsData]);

  const { role } = useContext(AuthContext); // admin | teacher | student
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const auth = getAuth();

  // Fetch users (only admin)
  useEffect(() => {
    const fetchUsers = async () => {
      if (role !== "admin") return;

      try {
        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API}/users`, {
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
    const data = students?.find((data) => data.uid === uid);

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
        if (data?.role === "student") {
          await fetch(`${import.meta.env.VITE_API}/student/${data._id}`, {
            method: "DELETE",
          });
        }

        const token = await auth.currentUser.getIdToken();
        const res = await fetch(`${import.meta.env.VITE_API}/users/${uid}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) {
          setUsers(users.filter((u) => u.uid !== uid));
          Swal.fire("Deleted!", `${email} has been deleted.`, "success");
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    }
  };

  if (role !== "admin") {
    return (
      <p className="text-center text-red-500 mt-10">
        ❌ You are not authorized to view this page.
      </p>
    );
  }

  // Filtered & searched users
  const filteredUsers = users.filter(
    (u) =>
      (filterRole === "" || u.role === filterRole) &&
      (search === "" ||
        u.uid.toLowerCase().includes(search.toLowerCase()) ||
        (u.email && u.email.toLowerCase().includes(search.toLowerCase())) ||
        (u.name && u.name.toLowerCase().includes(search.toLowerCase())))
  );

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl text-white md:text-3xl font-bold text-center mb-6">
        Manage User
      </h1>

      {/* Search & Filter */}
      <div className="flex flex-col md:flex-row gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="Search by name, UID, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#159799] w-full md:w-1/2"
        />

        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value)}
          className="px-4 py-2 border  rounded-lg focus:outline-none focus:ring-2 focus:ring-[#159799] w-full flex-1"
        >
          <option value="">All Roles</option>
          <option value="admin">Admin</option>
          <option value="teacher">Teacher</option>
          <option value="student">Student</option>
        </select>
      </div>

      {/* Users Table */}
      {filteredUsers.length === 0 ? (
        <p className="text-center text-gray-500">No users found.</p>
      ) : (
        <div className="hover:shadow-2xl overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full border-collapse border border-gray-400 text-sm md:text-base">
            <thead className="bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF]">
              <tr className="text-center">
                <th className="border p-2">Photo</th>
                <th className="border p-2">UID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.uid}
                  className="text-center hover:bg-gray-200/20 hover:border-l-4 hover:border-blue-500 duration-300 motion-reduce:transition-none"
                >
                  <td className="border p-2">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User"
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mx-auto"
                      />
                    ) : (
                      <img
                        alt="deom img"
                        src="https://www.w3schools.com/howto/img_avatar.png" 
                        className="w-8 h-8 md:w-10 md:h-10 rounded-full mx-auto"                    
                        />
                    )}
                  </td>
                  <td className="border p-2 break-all">{user.uid}</td>
                  <td className="border p-2">{user.name || "N/A"}</td>
                  <td className="border p-2 break-all">{user.email}</td>
                  <td className="border p-2">{user.role || "user"}</td>
                  <td
                    className={`border p-2 ${
                      user.role === "student" ? "grid gap-2 md:grid-cols-2" : ""
                    }`}
                  >
                    <button
                      onClick={() => handleDelete(user.uid, user.email)}
                      className={`hover:bg-red-700 bg-gradient-to-b from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF]  hover:bg-none text-white px-2 md:px-3 py-1 rounded  text-xs md:text-sm ${
                        user.role !== "student" ? "w-full" : ""
                      }`}
                    >
                      🗑 Delete
                    </button>

                    {user.role === "student" && (
                      <Link
                        to={`/addStudent/${user.uid}`}
                        className="bg-green-500 hover:text-white text-white hover:bg-green-700  px-2 md:px-3 py-1 rounded text-xs md:text-sm"
                      >
                        Conform Admission
                      </Link>
                    )}
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
