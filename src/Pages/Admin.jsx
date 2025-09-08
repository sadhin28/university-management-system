import { useState } from "react";
import { toast } from "react-toastify";
import { Link, } from "react-router-dom";
import { UserPlus, BookOpen, Users, UserCog } from "lucide-react";
import Swal from "sweetalert2";


export default function Admin() {
  const [uid, setUid] = useState("");
  const [role, setRole] = useState('')


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
  //=================Make user start======================
  const [form, setForm] = useState({
    email: "",
    password: "",
    displayName: "",
    role: "student",
  });
  const handleSubmit = (e) => {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const displayName = e.target.name.value
    setForm({
      email,
      password,
      displayName,
      role
    })
    fetch(`${import.meta.env.VITE_API}/create-user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {

        if (ok) {
          Swal.fire({
            icon: "success",
            title: "User Created 🎉",
            text: `User ${form.displayName} created with role: ${form.role}`,
            confirmButtonColor: "#3085d6",
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.error || "Something went wrong!",
            confirmButtonColor: "#d33",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  }

  return (
    <div className="md:flex grid gap-28 items-center justify-center px-4 py-12">
      <div className="flex-1 bg-gray-100/20 border-2  border-[#097C7DFF] hover:shadow-2xl rounded-2xl w-full max-w-8xl p-8">
        {/* Header */}
        <h1 className="md:text-3xl text-xl font-extrabold text-center text-gray-800 mb-8">
          🛠️ Admin Dashboard
        </h1>

        {/* Create Admin Form */}
        <div className="mb-10 ">
          <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
            <UserCog className="w-5 h-5 mr-2 text-blue-600" /> Set User Role By UID
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
              <option value="student">Student</option>
            </select>
            <button
              onClick={makeAdmin}
              className="hover:shadow-2xl w-full bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl "
            >
              Create
            </button>
          </div>
          <div>
            {/* Create user */}
            <h1 className="w-full my-3 border-2 border-black"></h1>
            <h1 className="text-lg font-semibold text-gray-700 mb-2 flex items-center"><UserCog className="w-5 h-5 mr-2 text-blue-600" />Create New User</h1>
            <form className="" onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block py-2 text-gray-700  text-sm font-medium"
              >
                Select User Role
              </label>
              <select className=" w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]" name="role" onChange={(e) => setRole(e.target.value)} onClick={handleSubmit}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              <div className="mb-2">
                <label
                  htmlFor="name"
                  className="block py-2 text-gray-700  text-sm font-medium"
                >
                  User name
                </label>
                <input
                  type="text"
                  id="text"

                  name='name'
                  className=" w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                  placeholder="Enter User Name"
                  required
                />
              </div>
              <div className="mb-2">
                <label
                  htmlFor="email"
                  className="block py-2 text-gray-700  text-sm font-medium"
                >
                  User Email
                </label>
                <input
                  type="email"
                  id="text"

                  name='email'
                  className=" w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                  placeholder="Enter your Email"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block py-2 text-gray-700  text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className=" w-full p-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
                  name='password'
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="hover:shadow-2xl w-full bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white p-3 rounded-lg  items-center gap-2 md:text-xl "
              >
                Create New User
              </button>
            </form>
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

