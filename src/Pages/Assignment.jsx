import React, { useState, useEffect, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/Authprovider";

const AssignmentPanel = () => {
  const { user, role } = useContext(AuthContext); // ✅ from AuthContext
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  // 🔹 Fetch Assignments
  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/assignment`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      const data = await res.json();
      setAssignments(data);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      Swal.fire("Error", "Failed to load assignments", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchAssignments();
  }, [user]);

  // 🔹 Add Assignment (Teacher only)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (role !== "teacher") {
      return Swal.fire("Access Denied", "Only teachers can add assignments!", "warning");
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/assignment`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to add assignment");

      Swal.fire("✅ Success!", "Assignment added successfully!", "success");
      setForm({ title: "", description: "", dueDate: "" });
      fetchAssignments();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while adding!", "error");
    }
  };

  // 🔹 Delete Assignment (Teacher only)
  const handleDelete = async (id) => {
    if (role !== "teacher") {
      return Swal.fire("Access Denied", "Only teachers can delete!", "warning");
    }

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${import.meta.env.VITE_API}/assignment/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete assignment");

      Swal.fire("Deleted!", "Assignment has been removed.", "success");
      setAssignments((prev) => prev.filter((a) => a._id !== id));
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong while deleting!", "error");
    }
  };

  return (
    <div className="p-6 max-w-8xl mx-auto ">
      <h2 className="text-2xl font-bold text-center mb-6">
        📚 Assignment Panel
      </h2>

      {/* 👨‍🏫 Teacher Add Form */}
      {role === "teacher" && (
        <form
          onSubmit={handleAdd}
          className="mb-6 border border-gray-200 p-4 rounded-xl bg-gray-200/20 hover:shadow-md "
        >
          <h3 className="font-semibold mb-3 text-gray-800">
            Create New Assignment
          </h3>

          <input
            type="text"
            placeholder="Assignment Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          <textarea
            placeholder="Assignment Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border w-full p-2 mb-3 rounded focus:outline-none focus:ring focus:ring-blue-200"
            rows="3"
          />

          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="border w-full p-2 mb-4 rounded focus:outline-none focus:ring focus:ring-blue-200"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Post Assignment
          </button>
        </form>
      )}

      {/* 🎓 Assignment List */}
      {loading ? (
        <p className="text-center text-gray-600">Loading assignments...</p>
      ) : assignments.length === 0 ? (
        <p className="text-center text-gray-500">No assignments found.</p>
      ) : (
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div
              key={assignment._id}
              className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 flex justify-between items-start"
            >
              <div>
                <h4 className="font-semibold text-lg text-gray-800">
                  {assignment.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {assignment.description || "No description provided"}
                </p>
                <p className="text-xs text-gray-500">
                  📅 Due:{" "}
                  {assignment.dueDate
                    ? assignment.dueDate.slice(0, 10)
                    : "Not set"}
                </p>
              </div>

              {role === "teacher" && (
                <button
                  onClick={() => handleDelete(assignment._id)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium"
                >
                  🗑️ Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssignmentPanel;
