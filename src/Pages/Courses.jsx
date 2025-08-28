import { useEffect, useState } from "react";
import { Search, Plus, Filter, Clock, Users } from "lucide-react";
import  sampleCourses  from ".././../public/sampleCourse.json"; // keep your sample data
import { Link } from "react-router-dom";

export default function Courses() {
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(()=>{
    fetch('/sampleCourses')
    .then(res=>res.json()
    .then(data=>setSearchQuery(data))
)
  },[])
  const filteredCourses = sampleCourses.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen  p-6">
      <div className="max-w-8xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-xs md:text-xl">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-gray-500">
              Manage course catalog and schedules
            </p>
          </div>
          <Link to='/addCourse' className="bg-gradient-to-r from-[#1D5A5AFF] to-[#031226FF] to-[#0881B5FF] text-white px-6 py-2 rounded-lg flex items-center gap-2 md:text-xl text-xs">
            <Plus className="w-4 h-4" />
            Add Course
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow p-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>
           
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition duration-300"
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
                      {course.credits} credits
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
                <div className="flex gap-2 pt-2">
                  <Link to='/viewdetails' className="flex-1 text-center px-3 py-2 border rounded-lg text-sm hover:bg-gray-100 transition">
                    View Details
                  </Link>
                  <Link to='/manage' className="flex-1 text-center px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600 transition">
                    Manage
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
