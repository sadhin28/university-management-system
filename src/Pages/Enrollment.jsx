import { useParams, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { toast } from "react-toastify";

export default function EnrollPage() {
  const {user}=useContext(AuthContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const studentEmail = user?.email

  const handleEnroll = () => {
    fetch(`${import.meta.env.VITE_API}/course/enrolled/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, studentName,studentEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message); // or use SweetAlert
        navigate("/courses"); // go back to course list
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <h2 className="text-2xl font-bold mb-2">Confirm Enrollment</h2>

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      />
     

      <button
        onClick={handleEnroll}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700"
      >
        Enroll Now
      </button>
    </div>
  );
}
