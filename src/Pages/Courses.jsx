import {  useContext, useState } from "react";
import { Search, Clock, Users } from "lucide-react";
import { Link, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Provider/Authprovider";
import Swal from "sweetalert2";
export default function Courses() {
  const {role}=useContext(AuthContext)
  const [searchQuery, setSearchQuery] = useState("");
    const Course = useLoaderData()
  const [sampleCourse,setsampleCourse]=useState(Course)

  const filteredCourses = sampleCourse.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

 const  DeleteCourse=(id)=>{
    Swal.fire({
                title: "Are you sure you want to Delete it?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Delete"
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`${import.meta.env.VITE_API}/course/${id}`, {
                        method: 'DELETE'
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.deletedCount > 0) {
                                setsampleCourse(apply => apply.filter(apply => apply._id !== id));
                                Swal.fire({
                                    title: "Successfully Deleted!",
                                    text: "Course has been deleted.",
                                    icon: "success"
                                });
                            }
                        })
    
                }
            });
 }

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-6  md:text-xl">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-gray-500">
               Students Can Enrolle The Course And Admin Manage the Course
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="rounded-xl shadow p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gradient-to-r from-[#D9E4E4FF] to-[#AAB9CDFF] to-[#E4F3F9FF]  focus:outline-none focus:ring-2 focus:ring-[#159799]  w-full pl-10 pr-3 py-2 border rounded-lg"
              />
            </div>
           
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="border-2 border-[#097C7DFF] bg-gray-100/20 rounded-xl shadow hover:shadow-2xl transition duration-300"
            >
              {/* Card Header */}
              <div className="flex items-start justify-between p-4 border-b">
                <div>
                  <h2 className="text-lg font-semibold">{course.name}</h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-1 text-xs border rounded-lg text-gray-600">
                      {course.code}
                    </span>
                    <span className="px-2 py-1 text-xs bg-gray-100 rounded-lg">
                      {course.credits}
                    </span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-lg ${
                    course.enrolled >= course.capacity * 0.9
                      ? "bg-red-100 text-red-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  {course.enrolled >= course.capacity * 0.9 ? "Full" : "Open"}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Instructor */}
                <div>
                  <p className="text-sm text-gray-500">Instructor</p>
                  <p className="font-medium">{course.instructor}</p>
                </div>

                {/* Schedule & Enrollment */}
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{course.schedule}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>
                      {course.enrolled} / {course.capacity} students
                    </span>
                  </div>
                </div>

                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Enrollment</span>
                    <span>
                      {Math.round((course.enrolled / course.capacity) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-indigo-500"
                      style={{
                        width: `${
                          (course.enrolled / course.capacity) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className=" flex gap-10 justify-between  ">
                 { <Link to={`/EnrolleCourse/${course._id}`}
                   className="font-bold border-2  p-3 bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white   rounded-lg text-center flex-1  items-center   text-xs">
                   Enrolle Course
                  </Link>}
                  {role === 'admin'&& <button onClick={()=>DeleteCourse(course._id)} className="font-bold border-2 p-3 bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white   rounded-lg text-center flex-1  items-center   text-xs">
                    Delete Course
                  </button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
