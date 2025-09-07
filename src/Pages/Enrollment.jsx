import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/Authprovider";
import { toast } from "react-toastify";

export default function EnrollPage() {
  const {user}=useContext(AuthContext)
  const { id } = useParams();
  const data = useLoaderData()
  console.log(data)
  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [instructor,setinstructon]=useState("")
  const [name,setCoursesname]=useState("")
  const paymentStatus ="due"
  useEffect(()=>{
    setinstructon(data.instructor)
    setCoursesname(data.name)
  },[])
  const studentEmail = user?.email
  
  console.log()
  const handleEnroll = () => {
    fetch(`${import.meta.env.VITE_API}/course/my-enrolled/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentId, studentName,studentEmail,instructor,name,paymentStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success(data.message); // or use SweetAlert
        navigate("/my-enrolled"); // go back to course list
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="p-2 flex  items-center justify-center min-h-screen">
      <div className="border-2 hover:shadow-2xl shadow-lg p-10 rounded-xl  space-y-10  lg:w-5/12 md:w-full w-full px-5  mx-auto flex    flex-col gap-3">
        <h2 className="md:text-2xl text-center font-bold mb-2">Confirm Enrollment</h2>

      <input
        type="text"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
      />

      <input
        type="text"
        placeholder="Student Name"
        value={studentName}
        onChange={(e) => setStudentName(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]"
      />
     

      <button
        onClick={handleEnroll}
        className="border-2 bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white   rounded-lg text-center p-2   items-center   text-xs"
      >
        Enroll Now
      </button>
      </div>
    </div>
  );
}
