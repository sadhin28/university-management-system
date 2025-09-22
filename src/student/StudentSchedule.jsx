import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/Authprovider";
import Swal from "sweetalert2";

export default function SchedulePage() {
  const { role } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  const [newSchedule, setNewSchedule] = useState({
    dept: "",
    semester: "",
    section: "",
    course: "",
    day: "",
    time: "",
    room: "",
  });
  
  // New states for search & filter
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterSemester, setFilterSemester] = useState("");
  const [filterSection, setFilterSection] = useState("");
   // Fetch all schedules
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/schedule`)
      .then((res) => res.json())
      .then((data) => setSchedules(data));
  }, []);
 
    // 🔹 Derived filtered schedules
  const filteredSchedules = schedules.filter((s) => {
    return (
      (searchTerm === "" || s.course.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterDept === "" || s.dept === filterDept) &&
      (filterSemester === "" || s.semester === filterSemester) &&
      (filterSection === "" || s.section === filterSection)
    );
  }); 
  const departments = ["CSE", "EEE", "BBA", "Civil", "Textile"];
  const semesters = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th"];
  const sections = ["A", "B", "C", "D"];
  const courses = [
    "DBMS", "Networking", "Software Engineering", "Mathematics", "Operating System",
    "Data Structures", "Algorithms", "Microprocessor", "Digital Logic Design"
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const times = ["8:30-10:00", "10:00-11:30", "11:30-1:00", "1:00-2:30", "2:30-4:00", "4:00-5:30"];
  const rooms = ["101", "102", "103", "201", "202", "203", "305", "401"];

  // Fetch all schedules
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API}/schedule`)
      .then((res) => res.json())
      .then((data) => setSchedules(data));
  }, []);

  // Toast Helper
  const showToast = (title, icon = "success") => {
    Swal.fire({
      toast: true,
      position: "top",
      icon,
      title,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  // Add schedule
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${import.meta.env.VITE_API}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSchedule),
      });
      const data = await res.json();
      if (data) {
        setSchedules([...schedules, { ...newSchedule, _id: data.insertedId }]);
        setNewSchedule({
          dept: "", semester: "", section: "", course: "", day: "", time: "", room: ""
        });
        showToast(`${newSchedule.course} added successfully.`);
      }
    } catch (err) {
      Swal.fire("Error!", "Something went wrong while adding.", "error");
    }
  };

  // Delete schedule
  const handleDelete = async (id, courseName) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete ${courseName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`${import.meta.env.VITE_API}/schedule/${id}`, { method: "DELETE" });
        setSchedules(schedules.filter((s) => s._id !== id));
        showToast(`${courseName} has been deleted.`);
      } catch (err) {
        Swal.fire("Error!", "Something went wrong while deleting.", "error");
      }
    }
  };

  // Update schedule
  const handleUpdate = async (schedule) => {
    const { value: formValues } = await Swal.fire({
      title: `Update Schedule: ${schedule.course}`,
      html:
        `<select id="dept" class="swal2-input">${departments.map(d => `<option value="${d}" ${d === schedule.dept ? 'selected' : ''}>${d}</option>`).join("")}</select>` +
        `<select id="semester" class="swal2-input">${semesters.map(s => `<option value="${s}" ${s === schedule.semester ? 'selected' : ''}>${s}</option>`).join("")}</select>` +
        `<select id="section" class="swal2-input">${sections.map(s => `<option value="${s}" ${s === schedule.section ? 'selected' : ''}>${s}</option>`).join("")}</select>` +
        `<select id="course" class="swal2-input">${courses.map(c => `<option value="${c}" ${c === schedule.course ? 'selected' : ''}>${c}</option>`).join("")}</select>` +
        `<select id="day" class="swal2-input">${days.map(d => `<option value="${d}" ${d === schedule.day ? 'selected' : ''}>${d}</option>`).join("")}</select>` +
        `<select id="time" class="swal2-input">${times.map(t => `<option value="${t}" ${t === schedule.time ? 'selected' : ''}>${t}</option>`).join("")}</select>` +
        `<select id="room" class="swal2-input">${rooms.map(r => `<option value="${r}" ${r === schedule.room ? 'selected' : ''}>${r}</option>`).join("")}</select>`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          dept: document.getElementById("dept").value,
          semester: document.getElementById("semester").value,
          section: document.getElementById("section").value,
          course: document.getElementById("course").value,
          day: document.getElementById("day").value,
          time: document.getElementById("time").value,
          room: document.getElementById("room").value,
        };
      },
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const res = await fetch(`${import.meta.env.VITE_API}/schedule/${schedule._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formValues),
        });
        const data = await res.json();
        if (data) {
          setSchedules(schedules.map(s => s._id === schedule._id ? { ...s, ...formValues } : s));
          showToast(`${formValues.course} updated successfully.`);
        }
      } catch (err) {
        Swal.fire("Error!", "Something went wrong while updating.", "error");
      }
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">📅 Student Schedule</h1>
          {/* 🔹 Search + Filter Controls */}
    
      {(role === "admin" || role === "teacher") && (
        <form onSubmit={handleAdd} className="grid gap-3 mb-6 p-4 border rounded-xl shadow">
          {[
            { label: "Department", key: "dept", options: departments },
            { label: "Semester", key: "semester", options: semesters },
            { label: "Section", key: "section", options: sections },
            { label: "Course", key: "course", options: courses },
            { label: "Day", key: "day", options: days },
            { label: "Time", key: "time", options: times },
            { label: "Room", key: "room", options: rooms },
          ].map(({ label, key, options }) => (
            <select
              key={key}
              value={newSchedule[key]}
              onChange={(e) => setNewSchedule({ ...newSchedule, [key]: e.target.value })}
              className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
              required
            >
              <option value="">{`Select ${label}`}</option>
              {options.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          ))}
          <button className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-4 py-2 rounded-lg w-full items-center gap-2 md:text-xl text-xs">➕ Add Schedule</button>
        </form>
      )}
       {/* Filter section */}
         <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <input
          type="text"
          placeholder="🔍 Search by course"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
        />
        <select value={filterDept} onChange={(e) => setFilterDept(e.target.value)}className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]">
          <option value="">All Departments</option>
          {departments.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterSemester} onChange={(e) => setFilterSemester(e.target.value)} className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]">
          <option value="">All Semesters</option>
          {semesters.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={filterSection} onChange={(e) => setFilterSection(e.target.value)} className="w-full p-2 mb-4 px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]">
          <option value="">All Sections</option>
          {sections.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </div>
      <div className="grid gap-4">

        {filteredSchedules.map(item => (
          <div key={item._id} className="bg-white rounded-xl shadow-md p-4 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{item.course}</h2>
              <p className="text-gray-600">{item.day} • {item.time}</p>
              <p className="text-gray-500 text-sm">📍 {item.room}</p>
              <p className="text-xs text-gray-400">{item.dept} • {item.semester} • Sec {item.section}</p>
            </div>
            {(role === "admin" || role === "teacher") && (
              <div className="flex gap-2">
                <button onClick={() => handleUpdate(item)} className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600">✏️ Update</button>
                <button onClick={() => handleDelete(item._id, item.course)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600">🗑 Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>

      {schedules.length === 0 && <p className="text-center text-gray-500 mt-8">No schedule available</p>}
    </div>
  );
}
