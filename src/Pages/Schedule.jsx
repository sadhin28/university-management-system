import React, { useState } from "react";

export default function Schedule() {
  // Fake Data
  const [schedules, setSchedules] = useState([
    {
      id: 1,
      course: "Web Development",
      teacher: "Mr. Rahman",
      room: "Room 101",
      time: "10:00 AM - 11:30 AM",
    },
    {
      id: 2,
      course: "Data Structures",
      teacher: "Ms. Akter",
      room: "Room 202",
      time: "12:00 PM - 1:30 PM",
    },
  ]);

  const [form, setForm] = useState({
    course: "",
    teacher: "",
    room: "",
    time: "",
  });

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  // Handle Input Change
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Add or Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId) {
      setSchedules(
        schedules.map((s) =>
          s.id === editingId ? { ...s, ...form, id: editingId } : s
        )
      );
      setEditingId(null);
    } else {
      const newSchedule = { id: Date.now(), ...form };
      setSchedules([...schedules, newSchedule]);
    }

    setForm({ course: "", teacher: "", room: "", time: "" });
  };

  // Edit
  const handleEdit = (id) => {
    const schedule = schedules.find((s) => s.id === id);
    setForm(schedule);
    setEditingId(id);
  };

  // Delete
  const handleDelete = (id) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  // Search filter
  const filteredSchedules = schedules.filter(
    (s) =>
      s.course.toLowerCase().includes(search.toLowerCase()) ||
      s.teacher.toLowerCase().includes(search.toLowerCase()) ||
      s.room.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 max-w-8xl mx-auto">
      {/* Title */}
      <h2 className="text-2xl font-bold mb-4 text-center">
        University Class Schedule
      </h2>

      {/* Search */}
     <div className="p-4 shadow-lg rounded">
          <input
        type="text"
        placeholder="Search by course, teacher or room..."
        className="p-4 w-full  py-2  border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
     </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className=" shadow-lg rounded p-4 mb-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Course"
            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799] "
            required
          />
          <input
            name="teacher"
            value={form.teacher}
            onChange={handleChange}
            placeholder="Teacher"
            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
            required
          />
          <input
            name="room"
            value={form.room}
            onChange={handleChange}
            placeholder="Room"
            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
            required
          />
          <input
            name="time"
            value={form.time}
            onChange={handleChange}
            placeholder="Time (e.g., 10:00 AM - 11:30 AM)"
            className="px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg  items-center gap-2 md:text-xl w-full mt-3 text-xs"
        >
          {editingId ? "Update Schedule" : "Add Schedule"}
        </button>
      </form>

      {/* Schedule List */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full text-left border">
          <thead>
            <tr className="bg-indigo-100">
              <th className="px-4 py-2 border">Course</th>
              <th className="px-4 py-2 border">Teacher</th>
              <th className="px-4 py-2 border">Room</th>
              <th className="px-4 py-2 border">Time</th>
              <th className="px-4 py-2 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.length > 0 ? (
              filteredSchedules.map((s) => (
                <tr key={s.id} className="hover:bg-gray-50">
                  <td className="border px-4 py-2">{s.course}</td>
                  <td className="border px-4 py-2">{s.teacher}</td>
                  <td className="border px-4 py-2">{s.room}</td>
                  <td className="border px-4 py-2">{s.time}</td>
                  <td className="border px-4 py-2 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEdit(s.id)}
                      className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(s.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No schedule found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

