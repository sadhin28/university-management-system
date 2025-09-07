import { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { UserPlus, BookOpen, Users, UserCog } from "lucide-react";
import AuthForm from "./AuthForm";

export default function Admin() {
  const [uid, setUid] = useState("");
  const [role,setRole]=useState('')
  console.log(role)
  // Create Admin API Call
  const makeAdmin = async () => {
    if (!uid) {
      toast.error("Please enter a UID or Email");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/make-${role}/${uid}`, {
        method: "POST",
      });
      const data = await res.json();
      toast.success(data.message || "Admin created successfully!");
      setUid("");
    } catch (err) {
      toast.error("Error making admin: " + err.message);
    }
  };

  return (
    <div className="md:flex grid gap-28 items-center justify-center px-4 py-12">
      <div className="flex-1">
        {
            <AuthForm/>
        }
      </div>
      <div className="flex-1 bg-gray-100/20 border-2  border-[#097C7DFF] hover:shadow-2xl rounded-2xl w-full max-w-3xl p-8">
        {/* Header */}
        <h1 className="md:text-3xl text-xl font-extrabold text-center text-gray-800 mb-8">
          🛠️ Admin Dashboard
        </h1>

        {/* Create Admin Form */}
        <div className="mb-10 ">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <UserCog className="w-5 h-5 mr-2 text-blue-600" /> Create New Admin & Teacher
          </h2>
          <div className="grid md:flex gap-3">
            <input
              type="text"
              placeholder="Enter UID or Email"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              className="w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
            />
            
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        >
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
            <button
              onClick={makeAdmin}
              className="w-full bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl "
            >
              Create
            </button>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <Link
            to="/addStudent"
            className="flex flex-col items-center bg-blue-50 border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <Users className="w-10 h-10 text-blue-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Add Student</h3>
            <p className="text-sm text-gray-500 text-center">
              Manage student records easily.
            </p>
          </Link>

          <Link
            to="/addCourse"
            className="flex flex-col items-center bg-green-50 border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <BookOpen className="w-10 h-10 text-green-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Add Course</h3>
            <p className="text-sm text-gray-500 text-center">
              Create and assign new courses.
            </p>
          </Link>

          <Link
            to="/addfaculty"
            className="flex flex-col items-center bg-purple-50 border rounded-xl p-6 shadow hover:shadow-lg transition"
          >
            <UserPlus className="w-10 h-10 text-purple-600 mb-3" />
            <h3 className="font-semibold text-gray-800">Add Faculty</h3>
            <p className="text-sm text-gray-500 text-center">
              Add and manage faculty members.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

